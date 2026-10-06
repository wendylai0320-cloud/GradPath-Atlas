import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace, useRefresh, readiness, nextDeadline, formatDate, money, label, STATUSES, TIERS, toCsv, downloadFile } from "@/lib/atlas";
import { Badge, Button, Card, Empty, PageHeader, Progress, Select } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/summary")({
  head: () => ({ meta: [{ title: "Shortlist & strategy — GradPath Atlas" }, { name: "description", content: "Reach, target and safety plan with a printable report." }] }),
  component: Summary,
});

const tierHelp: Record<string, string> = {
  reach: "Ambitious choices where entry is competitive.",
  target: "Good fit for your profile.",
  safety: "Strong likelihood of an offer.",
};

function Summary() {
  const { data: ws, isLoading } = useWorkspace();
  const refresh = useRefresh();
  if (isLoading || !ws) return <p className="text-sm text-muted-foreground">Loading…</p>;

  const rows = ws.applications
    .map((a) => ({ a, p: ws.programmes.find((p) => p.id === a.programme_id)!, r: readiness(ws, a), nd: nextDeadline(ws, a.programme_id) }))
    .filter((x) => x.p)
    .sort((x, y) => x.a.priority - y.a.priority);
  const shortlisted = rows.filter((x) => x.a.shortlisted);

  async function setTier(id: string, tier: string) {
    await supabase.from("applications").update({ tier }).eq("id", id);
    refresh();
  }
  async function toggleShort(id: string, v: boolean) {
    await supabase.from("applications").update({ shortlisted: v }).eq("id", id);
    refresh();
  }
  function exportCsv() {
    downloadFile("application-strategy.csv", toCsv([
      ["Programme", "University", "Category", "Shortlisted", "Status", "Readiness %", "Next deadline", "Tuition"],
      ...rows.map((x) => [x.p.name, x.p.universities?.name ?? "", label(TIERS, x.a.tier ?? "target"), x.a.shortlisted ? "Yes" : "No", label(STATUSES, x.a.status), x.r.pct, x.nd?.due_date ?? "", money(x.p.tuition, x.p.currency)]),
    ]));
  }

  return (
    <>
      <PageHeader
        title="Shortlist & strategy"
        description="Sort your programmes into Reach, Target and Safety, then print or export your plan."
        actions={<div className="flex gap-2 print:hidden">
          <Button variant="outline" onClick={() => { exportCsv(); toast.success("CSV downloaded"); }}>Export CSV</Button>
          <Button onClick={() => window.print()}>Print report</Button>
        </div>}
      />
      {rows.length === 0 ? <Empty>No programmes yet. Add some from <Link to="/compare" className="underline">Compare programmes</Link>.</Empty> : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            {TIERS.map((t) => {
              const items = rows.filter((x) => (x.a.tier ?? "target") === t.value);
              return (
                <Card key={t.value} className="p-4">
                  <h2 className="font-serif text-lg">{t.label} <span className="text-sm text-muted-foreground">({items.length})</span></h2>
                  <p className="mb-3 text-xs text-muted-foreground">{tierHelp[t.value]}</p>
                  {items.length === 0 ? <p className="text-sm text-muted-foreground">None yet.</p> : (
                    <ul className="space-y-3">
                      {items.map((x) => (
                        <li key={x.a.id} className="rounded-md border border-border p-3 text-sm">
                          <Link to="/programmes/$id" params={{ id: x.a.id }} className="font-medium hover:underline">{x.p.name}</Link>
                          <p className="text-xs text-muted-foreground">{x.p.universities?.name}</p>
                          <div className="my-2"><Progress value={x.r.pct} label={`${x.p.name} readiness`} /></div>
                          <div className="flex items-center justify-between gap-2 print:hidden">
                            <Select aria-label="Category" className="h-8 w-28" value={x.a.tier ?? "target"} onChange={(e) => setTier(x.a.id, e.target.value)}>
                              {TIERS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </Select>
                            <label className="flex items-center gap-1 text-xs"><input type="checkbox" checked={x.a.shortlisted} onChange={(e) => toggleShort(x.a.id, e.target.checked)} />Shortlist</label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              );
            })}
          </div>

          <Card className="mt-6 p-5">
            <h2 className="mb-1 font-serif text-lg">Application strategy report</h2>
            <p className="mb-4 text-xs text-muted-foreground">Generated {new Date().toLocaleDateString("en-GB")} · {shortlisted.length} shortlisted of {rows.length} tracked. Planning aid only — not an admissions prediction.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground">
                  <tr><th className="py-2 pr-3">Programme</th><th className="pr-3">Category</th><th className="pr-3">Status</th><th className="pr-3">Readiness</th><th className="pr-3">Next deadline</th><th className="pr-3">Tuition</th><th>Missing</th></tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.map((x) => (
                    <tr key={x.a.id}>
                      <td className="py-2 pr-3"><span className="font-medium">{x.p.name}</span>{x.a.shortlisted && <> <Badge tone="success">Shortlisted</Badge></>}<br /><span className="text-xs text-muted-foreground">{x.p.universities?.name}</span></td>
                      <td className="pr-3">{label(TIERS, x.a.tier ?? "target")}</td>
                      <td className="pr-3">{label(STATUSES, x.a.status)}</td>
                      <td className="pr-3">{x.r.ready}/{x.r.total}</td>
                      <td className="pr-3">{x.nd ? formatDate(x.nd.due_date) : "—"}</td>
                      <td className="pr-3">{money(x.p.tuition, x.p.currency)}</td>
                      <td className="text-xs">{x.r.items.filter((i) => !i.ready).map((i) => i.requirement.label).join(", ") || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
