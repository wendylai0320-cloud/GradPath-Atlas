import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button, Field, Input, Select } from "@/components/ui-kit";
import { type Workspace, money } from "@/lib/atlas";
import { planOf } from "@/lib/plans";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const { data } = await supabase.from("profiles").select("*").eq("id", u.user!.id).maybeSingle();
      return { ...(data ?? { display_name: "", role: "student", plan: "free" }), email: u.user?.email ?? "", id: u.user!.id };
    },
  });
}

export function AddProgramme({ ws, onDone }: { ws: Workspace; onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"catalogue" | "custom">("catalogue");
  const [err, setErr] = useState("");
  const profile = useProfile();
  const plan = planOf(profile.data?.plan);
  const atLimit = ws.applications.length >= plan.maxProgrammes;
  const tracked = new Set(ws.applications.map((a) => a.programme_id));
  const available = ws.programmes.filter((p) => !tracked.has(p.id));
  const [f, setF] = useState({ university: "", country: "", name: "", degree: "MSc", tuition: "", currency: "GBP", english: "", deadline: "" });

  async function track(programmeId: string) {
    setErr("");
    const { error } = await supabase.from("applications").insert({ user_id: ws.userId, programme_id: programmeId });
    if (error) return setErr(error.message);
    onDone();
  }

  async function createCustom(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const { data: uni, error: e1 } = await supabase.from("universities").insert({ owner_id: ws.userId, name: f.university, country: f.country }).select().single();
    if (e1) return setErr(e1.message);
    const { data: prog, error: e2 } = await supabase.from("programmes").insert({
      owner_id: ws.userId, university_id: uni.id, name: f.name, degree: f.degree,
      tuition: Number(f.tuition) || 0, currency: f.currency, english_test: f.english,
    }).select().single();
    if (e2) return setErr(e2.message);
    if (f.deadline) await supabase.from("deadlines").insert({ owner_id: ws.userId, programme_id: prog.id, label: "Application deadline", due_date: f.deadline });
    await track(prog.id);
    setF({ university: "", country: "", name: "", degree: "MSc", tuition: "", currency: "GBP", english: "", deadline: "" });
    setOpen(false);
  }

  if (!open) return <Button onClick={() => setOpen(true)}>Add programme</Button>;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="add-title" className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-6">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 id="add-title" className="text-2xl">Add a target programme</h2>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)} aria-label="Close">✕</Button>
        </div>
        {atLimit ? (
          <div className="mt-6 rounded-md bg-secondary p-4 text-sm">
            The Basic plan tracks up to {plan.maxProgrammes} programmes. <Link to="/settings" className="font-medium underline">Upgrade (test flow)</Link> to add more.
          </div>
        ) : (
          <>
            <div className="mt-4 flex gap-1 border-b border-border" role="tablist">
              {(["catalogue", "custom"] as const).map((t) => (
                <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
                  className={`-mb-px border-b-2 px-3 py-2 text-sm ${tab === t ? "border-primary font-medium" : "border-transparent text-muted-foreground"}`}>
                  {t === "catalogue" ? "Demo catalogue" : "Enter my own"}
                </button>
              ))}
            </div>
            {tab === "catalogue" ? (
              <ul className="mt-4 divide-y divide-border">
                {available.length === 0 && <li className="py-6 text-sm text-muted-foreground">You're tracking every catalogue programme.</li>}
                {available.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-4 py-3">
                    <div>
                      <p className="font-medium">{p.degree} {p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.universities?.name} · {p.universities?.country} · {money(p.tuition, p.currency)}</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => track(p.id)}>Track</Button>
                  </li>
                ))}
              </ul>
            ) : (
              <form onSubmit={createCustom} className="mt-4 grid grid-cols-2 gap-4">
                <Field label="University" htmlFor="u"><Input id="u" required value={f.university} onChange={(e) => setF({ ...f, university: e.target.value })} /></Field>
                <Field label="Country" htmlFor="c"><Input id="c" value={f.country} onChange={(e) => setF({ ...f, country: e.target.value })} /></Field>
                <Field label="Programme name" htmlFor="n"><Input id="n" required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
                <Field label="Degree" htmlFor="d"><Select id="d" value={f.degree} onChange={(e) => setF({ ...f, degree: e.target.value })}>{["MSc", "MA", "MBA", "MRes", "Master", "LLM"].map((d) => <option key={d}>{d}</option>)}</Select></Field>
                <Field label="Tuition" htmlFor="t"><Input id="t" type="number" min={0} value={f.tuition} onChange={(e) => setF({ ...f, tuition: e.target.value })} /></Field>
                <Field label="Currency" htmlFor="cur"><Select id="cur" value={f.currency} onChange={(e) => setF({ ...f, currency: e.target.value })}>{["GBP", "EUR", "USD", "AUD", "CAD", "HKD", "SGD"].map((d) => <option key={d}>{d}</option>)}</Select></Field>
                <Field label="English requirement" htmlFor="en"><Input id="en" placeholder="e.g. IELTS 6.5" value={f.english} onChange={(e) => setF({ ...f, english: e.target.value })} /></Field>
                <Field label="Application deadline" htmlFor="dl"><Input id="dl" type="date" value={f.deadline} onChange={(e) => setF({ ...f, deadline: e.target.value })} /></Field>
                <div className="col-span-2 flex justify-end"><Button type="submit">Save and track</Button></div>
              </form>
            )}
          </>
        )}
        {err && <p role="alert" className="mt-4 text-sm text-destructive">{err}</p>}
      </div>
    </div>
  );
}
