import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useWorkspace, useRefresh, readiness, nextDeadline, formatDate, money, label, STATUSES, toCsv, downloadFile, daysUntil } from "@/lib/atlas";
import { AddProgramme } from "@/components/AddProgramme";
import { Badge, Button, Empty, Input, PageHeader, Progress, Select } from "@/components/ui-kit";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/compare")({
  head: () => ({ meta: [{ title: "Compare programmes — GradPath Atlas" }, { name: "description", content: "Side-by-side programme requirements." }] }),
  component: Compare,
});

type SortKey = "name" | "university" | "tuition" | "deadline" | "readiness" | "priority";

function Compare() {
  const { data: ws, isLoading } = useWorkspace();
  const refresh = useRefresh();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [country, setCountry] = useState("all");
  const [onlyShortlist, setOnlyShortlist] = useState(false);
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "deadline", dir: 1 });

  const rows = useMemo(() => {
    if (!ws) return [];
    return ws.applications
      .map((a) => {
        const p = ws.programmes.find((x) => x.id === a.programme_id)!;
        return p && { a, p, r: readiness(ws, a), d: nextDeadline(ws, p.id), reqs: ws.requirements.filter((r) => r.programme_id === p.id) };
      })
      .filter(Boolean)
      .filter((x) => {
        const s = `${x!.p.name} ${x!.p.universities?.name} ${x!.p.universities?.country}`.toLowerCase();
        return (!q || s.includes(q.toLowerCase())) && (status === "all" || x!.a.status === status) && (country === "all" || x!.p.universities?.country === country) && (!onlyShortlist || x!.a.shortlisted);
      })
      .sort((x, y) => {
        const v = (z: typeof x) => {
          switch (sort.key) {
            case "name": return z!.p.name;
            case "university": return z!.p.universities?.name ?? "";
            case "tuition": return z!.p.tuition;
            case "deadline": return z!.d?.due_date ?? "9999";
            case "readiness": return z!.r.pct;
            case "priority": return z!.a.priority;
          }
        };
        const A = v(x), B = v(y);
        return (A < B ? -1 : A > B ? 1 : 0) * sort.dir;
      }) as NonNullable<ReturnType<typeof Object>>[] as {
        a: import("@/lib/atlas").Application; p: import("@/lib/atlas").Programme; r: ReturnType<typeof readiness>;
        d: import("@/lib/atlas").Deadline | undefined; reqs: import("@/lib/atlas").Requirement[];
      }[];
  }, [ws, q, status, country, onlyShortlist, sort]);

  if (isLoading || !ws) return <p className="text-muted-foreground">Loading…</p>;
  const countries = Array.from(new Set(ws.applications.map((a) => ws.programmes.find((p) => p.id === a.programme_id)?.universities?.country).filter(Boolean))) as string[];

  async function removeProgramme(appId: string, name: string) {
    if (!window.confirm(`Remove "${name}" from your plan? This also deletes its notes and document links.`)) return;
    const { error } = await supabase.from("applications").delete().eq("id", appId);
    if (error) { toast.error(error.message); return; }
    toast.success(`Removed ${name}`);
    refresh();
  }

  function exportCsv() {
    downloadFile("gradpath-comparison.csv", toCsv([
      ["Programme", "Degree", "University", "Country", "Tuition", "Currency", "Duration (months)", "Intake", "Min GPA", "English", "References", "Portfolio", "Interview", "Next deadline", "Status", "Priority", "Shortlisted", "Readiness %"],
      ...rows.map(({ a, p, r, d }) => [p.name, p.degree, p.universities?.name ?? "", p.universities?.country ?? "", p.tuition, p.currency, p.duration_months, p.intake, p.min_gpa ?? "", p.english_test, p.references_required, p.portfolio_required ? "Yes" : "No", p.interview ? "Yes" : "No", d?.due_date ?? "", label(STATUSES, a.status), a.priority, a.shortlisted ? "Yes" : "No", r.pct]),
    ]));
  }

  const Th = ({ k, children, className = "" }: { k?: SortKey; children: React.ReactNode; className?: string }) => (
    <th scope="col" className={`whitespace-nowrap bg-secondary px-4 py-3 text-left text-xs font-medium text-muted-foreground ${className}`}
      aria-sort={k && sort.key === k ? (sort.dir === 1 ? "ascending" : "descending") : undefined}>
      {k ? (
        <button className="inline-flex items-center gap-1 hover:text-foreground" onClick={() => setSort((s) => ({ key: k, dir: s.key === k ? (s.dir === 1 ? -1 : 1) : 1 }))}>
          {children}<span aria-hidden>{sort.key === k ? (sort.dir === 1 ? "↑" : "↓") : "↕"}</span>
        </button>
      ) : children}
    </th>
  );

  return (
    <>
      <PageHeader title="Compare programmes" description="Requirements, costs and readiness side by side. Click a column heading to sort."
        actions={<><Button variant="outline" onClick={exportCsv} disabled={!rows.length}>Export CSV</Button><AddProgramme ws={ws} onDone={refresh} /></>} />

      <div className="mb-4 flex flex-wrap items-end gap-3">
        <div className="w-72"><label htmlFor="q" className="sr-only">Search</label><Input id="q" placeholder="Search programme, university, country…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div><label htmlFor="st" className="sr-only">Status</label><Select id="st" value={status} onChange={(e) => setStatus(e.target.value)} className="w-44"><option value="all">All statuses</option>{STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}</Select></div>
        <div><label htmlFor="co" className="sr-only">Country</label><Select id="co" value={country} onChange={(e) => setCountry(e.target.value)} className="w-44"><option value="all">All countries</option>{countries.map((c) => <option key={c}>{c}</option>)}</Select></div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={onlyShortlist} onChange={(e) => setOnlyShortlist(e.target.checked)} className="h-4 w-4 accent-primary" />Shortlisted only</label>
      </div>

      {ws.applications.length === 0 ? <Empty>Add programmes to start comparing.</Empty> : rows.length === 0 ? <Empty>No programmes match these filters.</Empty> : (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full min-w-[1200px] text-sm">
            <caption className="sr-only">Programme comparison</caption>
            <thead>
              <tr>
                <Th k="name" className="sticky left-0 z-10">Programme</Th>
                <Th k="university">University</Th>
                <Th k="tuition">Tuition</Th>
                <Th>Length · Intake</Th>
                <Th>Min GPA</Th>
                <Th>English</Th>
                <Th>Refs</Th>
                <Th>Extras</Th>
                <Th k="deadline">Next deadline</Th>
                <Th>Status</Th>
                <Th k="priority">Priority</Th>
                <Th k="readiness" className="w-44">Readiness</Th>
                <Th><span className="sr-only">Actions</span></Th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ a, p, r, d }) => (
                <tr key={a.id} className="border-t border-border align-top hover:bg-muted/50">
                  <th scope="row" className="sticky left-0 bg-card px-4 py-3 text-left font-normal">
                    <Link to="/programmes/$id" params={{ id: a.id }} className="font-medium hover:underline">{p.degree} {p.name}</Link>
                    {a.shortlisted && <span className="ml-2"><Badge tone="success">Shortlist</Badge></span>}
                  </th>
                  <td className="px-4 py-3">{p.universities?.name}<p className="text-xs text-muted-foreground">{p.universities?.country}</p></td>
                  <td className="px-4 py-3 tabular-nums">{money(p.tuition, p.currency)}<p className="text-xs text-muted-foreground">Fee {money(p.application_fee, p.currency)}</p></td>
                  <td className="px-4 py-3">{p.duration_months} mo<p className="text-xs text-muted-foreground">{p.intake}</p></td>
                  <td className="px-4 py-3 tabular-nums">{p.min_gpa ?? "—"}</td>
                  <td className="px-4 py-3">{p.english_test || "—"}</td>
                  <td className="px-4 py-3 tabular-nums">{p.references_required}</td>
                  <td className="px-4 py-3 space-x-1">{p.portfolio_required && <Badge>Portfolio</Badge>}{p.interview && <Badge>Interview</Badge>}{!p.portfolio_required && !p.interview && "—"}</td>
                  <td className="px-4 py-3">{d ? <>{formatDate(d.due_date)}<p className="text-xs text-muted-foreground">{d.label} · {daysUntil(d.due_date)}d</p></> : "—"}</td>
                  <td className="px-4 py-3">{label(STATUSES, a.status)}</td>
                  <td className="px-4 py-3">{["", "High", "Medium", "Low"][a.priority]}</td>
                  <td className="px-4 py-3"><Progress value={r.pct} label={`${p.name} readiness`} /><p className="mt-1 text-xs text-muted-foreground">{r.ready}/{r.total} items ready</p></td>
                  <td className="px-4 py-3">
                    <button type="button" onClick={() => removeProgramme(a.id, `${p.degree} ${p.name}`)}
                      aria-label={`Remove ${p.name}`} title="Remove from plan"
                      className="rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">Catalogue universities and programmes are fictional demo data.</p>
    </>
  );
}
