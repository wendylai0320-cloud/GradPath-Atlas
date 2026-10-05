import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace, useRefresh, label, DOC_TYPES, DOC_STATUSES, type Doc } from "@/lib/atlas";
import { Badge, Button, Card, Empty, Field, Input, PageHeader, Select, Textarea } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/documents")({
  head: () => ({ meta: [{ title: "Document vault — GradPath Atlas" }, { name: "description", content: "Track CVs, statements, transcripts and references." }] }),
  component: Documents,
});

const blank = { title: "", doc_type: "cv", status: "not_started", link: "", notes: "" };

function Documents() {
  const { data: ws, isLoading } = useWorkspace();
  const refresh = useRefresh();
  const [f, setF] = useState(blank);
  const [editing, setEditing] = useState<string | null>(null);
  const [err, setErr] = useState("");
  const [filter, setFilter] = useState("all");

  if (isLoading || !ws) return <p className="text-sm text-muted-foreground">Loading…</p>;

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!f.title.trim()) return setErr("Please give the document a title.");
    const res = editing
      ? await supabase.from("documents").update(f).eq("id", editing)
      : await supabase.from("documents").insert({ ...f, user_id: ws!.userId });
    if (res.error) return setErr(res.error.message);
    setF(blank);
    setEditing(null);
    refresh();
  }
  async function setStatus(d: Doc, status: string) {
    await supabase.from("documents").update({ status }).eq("id", d.id);
    refresh();
  }
  async function remove(d: Doc) {
    if (!confirm(`Delete “${d.title}”?`)) return;
    await supabase.from("application_documents").delete().eq("document_id", d.id);
    await supabase.from("documents").delete().eq("id", d.id);
    refresh();
  }
  function usedBy(d: Doc) {
    return ws!.links
      .filter((l) => l.document_id === d.id)
      .map((l) => ws!.applications.find((a) => a.id === l.application_id))
      .map((a) => ws!.programmes.find((p) => p.id === a?.programme_id)?.name)
      .filter(Boolean);
  }
  const docs = ws.documents.filter((d) => filter === "all" || d.doc_type === filter);

  return (
    <>
      <PageHeader title="Document vault" description="Keep every application document in one place and see which programmes use it." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:order-2">
          <h2 className="mb-3 font-serif text-lg">{editing ? "Edit document" : "Add document"}</h2>
          <form onSubmit={save} className="space-y-3">
            <Field label="Title" htmlFor="t"><Input id="t" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="e.g. Personal statement v2" /></Field>
            <Field label="Type" htmlFor="ty">
              <Select id="ty" value={f.doc_type} onChange={(e) => setF({ ...f, doc_type: e.target.value })}>{DOC_TYPES.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}</Select>
            </Field>
            <Field label="Status" htmlFor="st">
              <Select id="st" value={f.status} onChange={(e) => setF({ ...f, status: e.target.value })}>{DOC_STATUSES.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}</Select>
            </Field>
            <Field label="Link (optional)" htmlFor="ln" hint="Paste a Google Drive or OneDrive link."><Input id="ln" type="url" value={f.link} onChange={(e) => setF({ ...f, link: e.target.value })} /></Field>
            <Field label="Notes" htmlFor="nt"><Textarea id="nt" rows={2} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} /></Field>
            {err && <p role="alert" className="text-sm text-destructive">{err}</p>}
            <div className="flex gap-2">
              <Button type="submit">{editing ? "Save changes" : "Add document"}</Button>
              {editing && <Button type="button" variant="ghost" onClick={() => { setEditing(null); setF(blank); }}>Cancel</Button>}
            </div>
          </form>
        </Card>

        <div className="space-y-3 lg:col-span-2">
          <div className="flex items-center gap-2">
            <label htmlFor="flt" className="text-sm text-muted-foreground">Show</label>
            <Select id="flt" className="w-48" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All types</option>
              {DOC_TYPES.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
            </Select>
          </div>
          {docs.length === 0 ? <Empty>No documents yet. Add your CV, statement, transcripts and references.</Empty> : docs.map((d) => (
            <Card key={d.id} className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{d.title} <span className="text-sm text-muted-foreground">· {label(DOC_TYPES, d.doc_type)}</span></p>
                  {d.notes && <p className="text-sm text-muted-foreground">{d.notes}</p>}
                  {d.link && <a href={d.link} target="_blank" rel="noreferrer" className="text-sm text-primary underline">Open file</a>}
                  <p className="mt-1 text-xs text-muted-foreground">Used for: {usedBy(d).join(", ") || "not linked yet — link it from a programme page"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={d.status === "ready" ? "success" : d.status === "review" ? "warning" : "neutral"}>{label(DOC_STATUSES, d.status)}</Badge>
                  <label className="sr-only" htmlFor={`s-${d.id}`}>Change status</label>
                  <Select id={`s-${d.id}`} className="h-8 w-32" value={d.status} onChange={(e) => setStatus(d, e.target.value)}>
                    {DOC_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </Select>
                  <Button size="sm" variant="ghost" onClick={() => { setEditing(d.id); setF({ title: d.title, doc_type: d.doc_type, status: d.status, link: d.link, notes: d.notes }); }}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => remove(d)}>Delete</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
