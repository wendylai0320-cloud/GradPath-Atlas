import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useWorkspace, useRefresh, readiness, daysUntil, formatDate, label, STATUSES } from "@/lib/atlas";
import { AddProgramme, useProfile } from "@/components/AddProgramme";
import { Badge, Card, DeadlineBadge, Empty, PageHeader, Progress } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — GradPath Atlas" }, { name: "description", content: "Your application planning overview." }] }),
  component: Dashboard,
});

function Dashboard() {
  const { data: ws, isLoading, error } = useWorkspace();
  const profile = useProfile();
  const refresh = useRefresh();

  const view = useMemo(() => {
    if (!ws) return null;
    const apps = ws.applications.map((a) => ({ a, p: ws.programmes.find((p) => p.id === a.programme_id)!, r: readiness(ws, a) })).filter((x) => x.p);
    const ids = new Set(ws.applications.map((a) => a.programme_id));
    const upcoming = ws.deadlines.filter((d) => d.programme_id && ids.has(d.programme_id) && daysUntil(d.due_date) >= 0).slice(0, 6);
    const missing = apps.flatMap((x) => x.r.items.filter((i) => !i.ready).map((i) => ({ prog: x.p, app: x.a, req: i.requirement, doc: i.doc })));
    const openTasks = ws.tasks.filter((t) => !t.done);
    const overall = apps.length ? Math.round(apps.reduce((s, x) => s + x.r.pct, 0) / apps.length) : 0;
    return { apps, upcoming, missing, openTasks, overall };
  }, [ws]);

  if (isLoading) return <p className="text-muted-foreground">Loading your workspace…</p>;
  if (error || !ws || !view) return <p className="text-destructive">Could not load your workspace.</p>;

  return (
    <>
      <PageHeader
        title={`Hello${profile.data?.display_name ? `, ${profile.data.display_name}` : ""}`}
        description="Your application season at a glance. Figures are planning aids only — they do not predict admission outcomes."
        actions={<AddProgramme ws={ws} onDone={refresh} />}
      />

      <div className="grid grid-cols-4 gap-4">
        {[
          ["Programmes tracked", ws.applications.length],
          ["Overall readiness", `${view.overall}%`],
          ["Upcoming deadlines", view.upcoming.length],
          ["Open tasks", view.openTasks.length],
        ].map(([k, v]) => (
          <Card key={k} className="p-5">
            <p className="text-sm text-muted-foreground">{k}</p>
            <p className="mt-2 font-serif text-4xl">{v}</p>
          </Card>
        ))}
      </div>

      {ws.applications.length === 0 ? (
        <div className="mt-8"><Empty>No programmes yet. Use <strong>Add programme</strong> to track one from the fictional demo catalogue or enter your own.</Empty></div>
      ) : (
        <div className="mt-8 grid grid-cols-[1.6fr_1fr] gap-6">
          <Card>
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="text-xl">Application progress</h2>
              <Link to="/compare" className="text-sm underline">Compare all</Link>
            </div>
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted-foreground"><tr><th className="px-5 py-2 font-medium">Programme</th><th className="px-3 py-2 font-medium">Status</th><th className="w-48 px-5 py-2 font-medium">Documents ready</th></tr></thead>
              <tbody>
                {view.apps.map(({ a, p, r }) => (
                  <tr key={a.id} className="border-t border-border">
                    <td className="px-5 py-3">
                      <Link to="/programmes/$id" params={{ id: a.id }} className="font-medium hover:underline">{p.degree} {p.name}</Link>
                      <p className="text-xs text-muted-foreground">{p.universities?.name}</p>
                    </td>
                    <td className="px-3 py-3"><Badge tone={a.status === "offer" ? "success" : a.status === "submitted" ? "info" : "neutral"}>{label(STATUSES, a.status)}</Badge></td>
                    <td className="px-5 py-3"><Progress value={r.pct} label={`${p.name} readiness`} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <div className="space-y-6">
            <Card>
              <div className="flex items-center justify-between border-b border-border px-5 py-4"><h2 className="text-xl">Next deadlines</h2><Link to="/deadlines" className="text-sm underline">All</Link></div>
              <ul className="divide-y divide-border">
                {view.upcoming.length === 0 && <li className="px-5 py-4 text-sm text-muted-foreground">Nothing upcoming.</li>}
                {view.upcoming.map((d) => {
                  const p = ws.programmes.find((x) => x.id === d.programme_id);
                  return (
                    <li key={d.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
                      <div><p className="font-medium">{p?.name}</p><p className="text-xs text-muted-foreground">{d.label} · {formatDate(d.due_date)}</p></div>
                      <DeadlineBadge days={daysUntil(d.due_date)} />
                    </li>
                  );
                })}
              </ul>
            </Card>
            <Card>
              <div className="border-b border-border px-5 py-4"><h2 className="text-xl">Missing items</h2></div>
              <ul className="max-h-72 divide-y divide-border overflow-y-auto">
                {view.missing.length === 0 && <li className="px-5 py-4 text-sm text-muted-foreground">Every requirement has a ready document. </li>}
                {view.missing.slice(0, 12).map((m) => (
                  <li key={m.app.id + m.req.id} className="px-5 py-3 text-sm">
                    <Link to="/programmes/$id" params={{ id: m.app.id }} className="font-medium hover:underline">{m.req.label}</Link>
                    <p className="text-xs text-muted-foreground">{m.prog.name} · {m.doc ? `linked, ${m.doc.status.replace("_", " ")}` : "no document linked"}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
