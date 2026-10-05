import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace, useRefresh, daysUntil, formatDate, toCsv, downloadFile } from "@/lib/atlas";
import { Button, Card, DeadlineBadge, Empty, Field, Input, PageHeader, Select } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/deadlines")({
  head: () => ({ meta: [{ title: "Deadlines & timeline — GradPath Atlas" }, { name: "description", content: "Every application deadline in date order." }] }),
  component: Deadlines,
});

function ics(items: { label: string; date: string }[]) {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//GradPath Atlas//EN"];
  items.forEach((i, n) => {
    const d = i.date.replace(/-/g, "");
    lines.push("BEGIN:VEVENT", `UID:${d}-${n}@gradpath`, `DTSTART;VALUE=DATE:${d}`, `SUMMARY:${i.label.replace(/[,;]/g, " ")}`, "END:VEVENT");
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

function Deadlines() {
  const { data: ws, isLoading } = useWorkspace();
  const refresh = useRefresh();
  const [prog, setProg] = useState("all");
  const [showPast, setShowPast] = useState(false);
  const [f, setF] = useState({ label: "", date: "", programme: "" });
  const [err, setErr] = useState("");

  if (isLoading || !ws) return <p className="text-sm text-muted-foreground">Loading…</p>;
  const tracked = ws.applications.map((a) => ws.programmes.find((p) => p.id === a.programme_id)).filter(Boolean) as typeof ws.programmes;
  const ids = new Set(tracked.map((p) => p.id));
  const rows = ws.deadlines
    .filter((d) => (d.programme_id ? ids.has(d.programme_id) : d.owner_id === ws.userId))
    .filter((d) => prog === "all" || d.programme_id === prog)
    .map((d) => ({ d, days: daysUntil(d.due_date), p: tracked.find((p) => p.id === d.programme_id) }))
    .filter((x) => showPast || x.days >= 0)
    .sort((a, b) => a.d.due_date.localeCompare(b.d.due_date));

  const groups = new Map<string, typeof rows>();
  rows.forEach((r) => {
    const k = new Date(r.d.due_date + "T00:00:00").toLocaleDateString("en-GB", { month: "long", year: "numeric" });
    groups.set(k, [...(groups.get(k) ?? []), r]);
  });

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!f.label || !f.date) return setErr("Add a label and a date.");
    const { error } = await supabase.from("deadlines").insert({ label: f.label, due_date: f.date, programme_id: f.programme || null, owner_id: ws!.userId });
    if (error) return setErr(error.message);
    setF({ label: "", date: "", programme: "" });
    refresh();
  }
  async function remove(id: string) {
    await supabase.from("deadlines").delete().eq("id", id);
    refresh();
  }
  const exportItems = rows.map((r) => ({ label: `${r.p?.name ?? "Personal"} — ${r.d.label}`, date: r.d.due_date }));

  return (
    <>
      <PageHeader
        title="Deadlines & timeline"
        description="All deadlines for the programmes you track, soonest first."
        actions={<>
          <Button variant="outline" onClick={() => downloadFile("deadlines.csv", toCsv([["Programme", "Deadline", "Date", "Days left"], ...rows.map((r) => [r.p?.name ?? "Personal", r.d.label, r.d.due_date, r.days])]))}>Export CSV</Button>
          <Button variant="outline" onClick={() => downloadFile("deadlines.ics", ics(exportItems), "text/calendar")}>Add to calendar</Button>
        </>}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="pf" className="text-sm text-muted-foreground">Programme</label>
            <Select id="pf" className="w-64" value={prog} onChange={(e) => setProg(e.target.value)}>
              <option value="all">All programmes</option>
              {tracked.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </Select>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="size-4" checked={showPast} onChange={(e) => setShowPast(e.target.checked)} />Show passed</label>
          </div>
          {rows.length === 0 ? <Empty>No upcoming deadlines. Track a programme on the Compare page to see its dates.</Empty> : [...groups].map(([month, items]) => (
            <section key={month}>
              <h2 className="mb-2 font-serif text-lg">{month}</h2>
              <ol className="relative space-y-3 border-l border-border pl-5">
                {items.map(({ d, days, p }) => (
                  <li key={d.id} className="relative">
                    <span className={`absolute -left-[1.6rem] top-4 size-2.5 rounded-full ${days < 0 ? "bg-muted-foreground" : days <= 14 ? "bg-destructive" : "bg-primary"}`} aria-hidden />
                    <Card className="flex items-center justify-between gap-4 p-4">
                      <div>
                        <p className="font-medium">{d.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {p ? <Link to="/programmes/$id" params={{ id: p.id }} className="underline-offset-2 hover:underline">{p.name}</Link> : "Personal milestone"} · {formatDate(d.due_date)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <DeadlineBadge days={days} />
                        {d.owner_id === ws.userId && <Button size="sm" variant="danger" onClick={() => remove(d.id)}>Remove</Button>}
                      </div>
                    </Card>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
        <Card className="h-fit p-5">
          <h2 className="mb-3 font-serif text-lg">Add a milestone</h2>
          <form onSubmit={add} className="space-y-3">
            <Field label="What" htmlFor="dl"><Input id="dl" value={f.label} onChange={(e) => setF({ ...f, label: e.target.value })} placeholder="e.g. Ask referee for letter" /></Field>
            <Field label="Date" htmlFor="dd"><Input id="dd" type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} /></Field>
            <Field label="Programme (optional)" htmlFor="dp">
              <Select id="dp" value={f.programme} onChange={(e) => setF({ ...f, programme: e.target.value })}>
                <option value="">Personal</option>
                {tracked.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </Select>
            </Field>
            {err && <p role="alert" className="text-sm text-destructive">{err}</p>}
            <Button type="submit">Add milestone</Button>
          </form>
        </Card>
      </div>
    </>
  );
}
