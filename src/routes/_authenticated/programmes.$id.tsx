import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace, useRefresh, readiness, formatDate, money, daysUntil, label, STATUSES, DOC_TYPES, DOC_STATUSES, TIERS, type Note } from "@/lib/atlas";
import { Badge, Button, Card, DeadlineBadge, Empty, Field, PageHeader, Progress, Select, Textarea } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/programmes/$id")({
  head: () => ({ meta: [{ title: "Programme detail — GradPath Atlas" }, { name: "description", content: "Requirements, notes, documents and status for one programme." }] }),
  component: ProgrammeDetail,
});

function ProgrammeDetail() {
  const { id } = Route.useParams();
  const { data: ws, isLoading } = useWorkspace();
  const refresh = useRefresh();
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");

  const app = ws?.applications.find((a) => a.id === id || a.programme_id === id);
  const notes = useQuery({
    queryKey: ["notes", app?.id],
    enabled: !!app,
    queryFn: async () => {
      const { data, error } = await supabase.from("notes").select("*").eq("application_id", app!.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data as Note[];
    },
  });

  if (isLoading || !ws) return <p className="text-sm text-muted-foreground">Loading…</p>;
  const prog = ws.programmes.find((p) => p.id === (app?.programme_id ?? id));
  if (!prog) return <Empty>Programme not found. <Link to="/compare" className="underline">Back to compare</Link></Empty>;
  if (!app) return <Empty>You are not tracking this programme yet. Add it from <Link to="/compare" className="underline">Compare programmes</Link>.</Empty>;

  const r = readiness(ws, app);
  const deadlines = ws.deadlines.filter((d) => d.programme_id === prog.id);
  const linkedIds = new Set(ws.links.filter((l) => l.application_id === app.id).map((l) => l.document_id));

  async function update(patch: Record<string, unknown>) {
    setErr("");
    const { error } = await supabase.from("applications").update(patch).eq("id", app!.id);
    if (error) setErr(error.message);
    refresh();
  }
  async function toggleDoc(docId: string) {
    if (linkedIds.has(docId)) await supabase.from("application_documents").delete().eq("application_id", app!.id).eq("document_id", docId);
    else await supabase.from("application_documents").insert({ application_id: app!.id, document_id: docId, user_id: ws!.userId });
    refresh();
  }
  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!note.trim()) return;
    const { error } = await supabase.from("notes").insert({ application_id: app!.id, user_id: ws!.userId, body: note.trim() });
    if (error) return setErr(error.message);
    setNote("");
    notes.refetch();
  }
  async function delNote(nid: string) {
    await supabase.from("notes").delete().eq("id", nid);
    notes.refetch();
  }
  async function untrack() {
    if (!confirm("Stop tracking this programme? Notes and links for it will be removed.")) return;
    await supabase.from("notes").delete().eq("application_id", app!.id);
    await supabase.from("application_documents").delete().eq("application_id", app!.id);
    await supabase.from("tasks").update({ application_id: null }).eq("application_id", app!.id);
    await supabase.from("status_records").select("id").limit(0);
    const { error } = await supabase.from("applications").delete().eq("id", app!.id);
    if (error) return setErr("Could not remove: " + error.message);
    refresh();
    history.back();
  }

  return (
    <>
      <PageHeader
        title={prog.name}
        description={`${prog.degree} · ${prog.universities?.name ?? ""}${prog.universities?.country ? ", " + prog.universities.country : ""}`}
        actions={<Link to="/compare"><Button variant="outline">Back to compare</Button></Link>}
      />
      {err && <p role="alert" className="mb-4 text-sm text-destructive">{err}</p>}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-5">
            <h2 className="mb-3 font-serif text-lg">Key facts</h2>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:grid-cols-3">
              {[
                ["Tuition", money(prog.tuition, prog.currency)],
                ["Duration", `${prog.duration_months} months`],
                ["Intake", prog.intake],
                ["Mode", prog.study_mode],
                ["Min. GPA", prog.min_gpa ?? "—"],
                ["English", prog.english_test || "—"],
                ["References", prog.references_required],
                ["Portfolio", prog.portfolio_required ? "Required" : "No"],
                ["Interview", prog.interview ? "Yes" : "No"],
              ].map(([k, v]) => (
                <div key={String(k)}><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></div>
              ))}
            </dl>
            {prog.summary && <p className="mt-4 text-sm text-muted-foreground">{prog.summary}</p>}
          </Card>

          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 className="font-serif text-lg">Requirements checklist</h2>
              <div className="w-48"><Progress value={r.pct} label="Readiness" /></div>
            </div>
            {r.items.length === 0 ? <p className="text-sm text-muted-foreground">No requirements listed.</p> : (
              <ul className="divide-y divide-border">
                {r.items.map((i) => (
                  <li key={i.requirement.id} className="flex items-start justify-between gap-4 py-3 text-sm">
                    <div>
                      <p className="font-medium">{i.requirement.label}</p>
                      {i.requirement.detail && <p className="text-muted-foreground">{i.requirement.detail}</p>}
                      <p className="text-xs text-muted-foreground">
                        {i.doc ? `Linked: ${i.doc.title}` : i.requirement.doc_type ? `Needs a ${label(DOC_TYPES, i.requirement.doc_type)} document` : "No document needed"}
                      </p>
                    </div>
                    {i.ready ? <Badge tone="success">Ready</Badge> : i.doc ? <Badge tone="warning">{label(DOC_STATUSES, i.doc.status)}</Badge> : <Badge tone="danger">Missing</Badge>}
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="p-5">
            <h2 className="mb-1 font-serif text-lg">Document attachments</h2>
            <p className="mb-3 text-sm text-muted-foreground">Tick the documents you will use for this programme. Documents marked “Ready” count towards readiness.</p>
            {ws.documents.length === 0 ? (
              <p className="text-sm">No documents yet. <Link to="/documents" className="underline">Add documents</Link></p>
            ) : (
              <ul className="space-y-2">
                {ws.documents.map((d) => (
                  <li key={d.id}>
                    <label className="flex items-center gap-3 text-sm">
                      <input type="checkbox" className="size-4" checked={linkedIds.has(d.id)} onChange={() => toggleDoc(d.id)} />
                      <span className="flex-1">{d.title} <span className="text-muted-foreground">· {label(DOC_TYPES, d.doc_type)}</span></span>
                      <Badge tone={d.status === "ready" ? "success" : "neutral"}>{label(DOC_STATUSES, d.status)}</Badge>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 font-serif text-lg">Personal notes</h2>
            <form onSubmit={addNote} className="mb-4 space-y-2">
              <label htmlFor="note" className="sr-only">New note</label>
              <Textarea id="note" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Ask about scholarship deadlines at open day" />
              <Button type="submit" size="sm">Add note</Button>
            </form>
            {notes.data?.length ? (
              <ul className="space-y-3">
                {notes.data.map((n) => (
                  <li key={n.id} className="rounded-md bg-secondary/60 p-3 text-sm">
                    <p className="whitespace-pre-wrap">{n.body}</p>
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>{new Date(n.created_at).toLocaleString("en-GB")}</span>
                      <button className="hover:text-destructive" onClick={() => delNote(n.id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-muted-foreground">No notes yet.</p>}
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="space-y-4 p-5">
            <h2 className="font-serif text-lg">Application status</h2>
            <Field label="Status" htmlFor="status">
              <Select id="status" value={app.status} onChange={(e) => update({ status: e.target.value })}>
                {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </Select>
            </Field>
            <Field label="Category" htmlFor="tier">
              <Select id="tier" value={app.tier ?? "target"} onChange={(e) => update({ tier: e.target.value })}>
                {TIERS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </Select>
            </Field>
            <Field label="Priority" htmlFor="priority">
              <Select id="priority" value={app.priority} onChange={(e) => update({ priority: Number(e.target.value) })}>
                <option value={1}>High</option><option value={2}>Medium</option><option value={3}>Low</option>
              </Select>
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="size-4" checked={app.shortlisted} onChange={(e) => update({ shortlisted: e.target.checked })} />
              On my shortlist
            </label>
            <Button variant="danger" size="sm" onClick={untrack}>Stop tracking</Button>
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 font-serif text-lg">Deadlines</h2>
            {deadlines.length === 0 ? <p className="text-sm text-muted-foreground">None listed.</p> : (
              <ul className="space-y-2 text-sm">
                {deadlines.map((d) => (
                  <li key={d.id} className="flex items-center justify-between gap-2">
                    <span>{d.label}<br /><span className="text-xs text-muted-foreground">{formatDate(d.due_date)}</span></span>
                    <DeadlineBadge days={daysUntil(d.due_date)} />
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {app.adviser_comment && (
            <Card className="p-5">
              <h2 className="mb-2 font-serif text-lg">Adviser feedback</h2>
              <p className="whitespace-pre-wrap text-sm">{app.adviser_comment}</p>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
