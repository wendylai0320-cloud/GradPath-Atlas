import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { loadWorkspace, readiness, label, STATUSES, TIERS, useRefresh } from "@/lib/atlas";
import { useProfile } from "@/components/AddProgramme";
import { Badge, Button, Card, Empty, Input, PageHeader, Progress, Textarea } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/adviser")({
  head: () => ({ meta: [{ title: "Adviser review — GradPath Atlas" }, { name: "description", content: "Share your plan with an adviser and read their feedback." }] }),
  component: Adviser,
});

function Adviser() {
  const profile = useProfile();
  const refresh = useRefresh();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const uid = profile.data?.id;
  const myEmail = (profile.data?.email ?? "").toLowerCase();

  const myAdvisers = useQuery({
    queryKey: ["advisers", uid],
    enabled: !!uid,
    queryFn: async () => (await supabase.from("adviser_links").select("*").eq("student_id", uid!)).data ?? [],
  });
  const students = useQuery({
    queryKey: ["students", myEmail],
    enabled: !!myEmail,
    queryFn: async () => {
      const { data } = await supabase.from("adviser_links").select("*").ilike("adviser_email", myEmail);
      const links = (data ?? []).filter((l) => l.student_id !== uid);
      return Promise.all(links.map(async (l) => ({ id: l.student_id, ws: await loadWorkspace(l.student_id) })));
    },
  });

  async function invite(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const v = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(v)) return setErr("Enter a valid email address.");
    const { error } = await supabase.from("adviser_links").insert({ student_id: uid!, adviser_email: v });
    if (error) return setErr(error.message.includes("duplicate") ? "Already shared with this adviser." : error.message);
    setEmail("");
    myAdvisers.refetch();
  }
  async function revoke(id: string) {
    await supabase.from("adviser_links").delete().eq("id", id);
    myAdvisers.refetch();
  }

  return (
    <>
      <PageHeader title="Adviser review" description="Share read-only access with a mentor or careers adviser. They sign in with the email you add and can leave feedback." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="h-fit p-5">
          <h2 className="mb-3 font-serif text-lg">Share my plan</h2>
          <form onSubmit={invite} className="space-y-2">
            <label htmlFor="ae" className="text-sm font-medium">Adviser email</label>
            <Input id="ae" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="adviser@university.ac.uk" />
            {err && <p role="alert" className="text-sm text-destructive">{err}</p>}
            <Button type="submit">Share access</Button>
          </form>
          <ul className="mt-4 space-y-2 text-sm">
            {(myAdvisers.data ?? []).map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-2"><span>{a.adviser_email}</span><Button size="sm" variant="danger" onClick={() => revoke(a.id)}>Remove</Button></li>
            ))}
            {myAdvisers.data?.length === 0 && <li className="text-muted-foreground">Not shared with anyone yet.</li>}
          </ul>
        </Card>

        <div className="space-y-4 lg:col-span-2">
          <h2 className="font-serif text-lg">Students sharing with me</h2>
          {students.isLoading ? <p className="text-sm text-muted-foreground">Loading…</p> :
            !students.data?.length ? <Empty>No students have shared their plan with {myEmail || "you"} yet.</Empty> :
            students.data.map((s) => <StudentCard key={s.id} ws={s.ws} onSaved={() => { students.refetch(); refresh(); }} />)}
        </div>
      </div>
    </>
  );
}

function StudentCard({ ws, onSaved }: { ws: Awaited<ReturnType<typeof loadWorkspace>>; onSaved: () => void }) {
  return (
    <Card className="p-5">
      <p className="mb-3 text-sm text-muted-foreground">Student · {ws.applications.length} programmes · {ws.documents.filter((d) => d.status === "ready").length}/{ws.documents.length} documents ready · {ws.tasks.filter((t) => !t.done).length} open tasks</p>
      <ul className="space-y-4">
        {ws.applications.map((a) => {
          const p = ws.programmes.find((x) => x.id === a.programme_id);
          const r = readiness(ws, a);
          return <AppReview key={a.id} id={a.id} name={p?.name ?? "Custom programme"} uni={p?.universities?.name ?? ""} status={label(STATUSES, a.status)} tier={label(TIERS, a.tier ?? "target")} pct={r.pct} missing={r.items.filter((i) => !i.ready).map((i) => i.requirement.label)} comment={a.adviser_comment} onSaved={onSaved} />;
        })}
      </ul>
    </Card>
  );
}

function AppReview(p: { id: string; name: string; uni: string; status: string; tier: string; pct: number; missing: string[]; comment: string; onSaved: () => void }) {
  const [c, setC] = useState(p.comment);
  const [saved, setSaved] = useState(false);
  async function save() {
    await supabase.from("applications").update({ adviser_comment: c }).eq("id", p.id);
    setSaved(true);
    p.onSaved();
  }
  return (
    <li className="rounded-md border border-border p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-medium">{p.name} <span className="text-sm text-muted-foreground">{p.uni}</span></p>
        <div className="flex gap-1"><Badge tone="info">{p.status}</Badge><Badge>{p.tier}</Badge></div>
      </div>
      <div className="my-2 max-w-xs"><Progress value={p.pct} label={`${p.name} readiness`} /></div>
      {p.missing.length > 0 && <p className="text-xs text-muted-foreground">Missing: {p.missing.join(", ")}</p>}
      <label htmlFor={`c-${p.id}`} className="mt-2 block text-sm font-medium">Feedback</label>
      <Textarea id={`c-${p.id}`} rows={2} value={c} onChange={(e) => { setC(e.target.value); setSaved(false); }} />
      <div className="mt-2 flex items-center gap-2"><Button size="sm" onClick={save}>Save feedback</Button>{saved && <span className="text-xs text-muted-foreground">Saved</span>}</div>
    </li>
  );
}
