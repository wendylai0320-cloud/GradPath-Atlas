import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace, useRefresh, daysUntil, formatDate, type Task } from "@/lib/atlas";
import { Button, Card, DeadlineBadge, Empty, Input, PageHeader, Select } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/tasks")({
  head: () => ({ meta: [{ title: "Task board — GradPath Atlas" }, { name: "description", content: "Your application to-do list, grouped by programme." }] }),
  component: Tasks,
});

function Tasks() {
  const { data: ws, isLoading } = useWorkspace();
  const refresh = useRefresh();
  const [f, setF] = useState({ title: "", due: "", app: "" });
  const [show, setShow] = useState<"open" | "done" | "all">("open");
  const [group, setGroup] = useState<"programme" | "due">("programme");
  const [err, setErr] = useState("");

  if (isLoading || !ws) return <p className="text-sm text-muted-foreground">Loading…</p>;
  const appName = (id: string | null) => {
    const a = ws.applications.find((x) => x.id === id);
    const p = ws.programmes.find((x) => x.id === a?.programme_id);
    return p ? `${p.name} — ${p.universities?.name ?? ""}` : "General";
  };
  const tasks = ws.tasks.filter((t) => show === "all" || (show === "done" ? t.done : !t.done));

  const groups = new Map<string, Task[]>();
  tasks.forEach((t) => {
    let k: string;
    if (group === "programme") k = appName(t.application_id);
    else if (!t.due_date) k = "No due date";
    else {
      const d = daysUntil(t.due_date);
      k = d < 0 ? "Overdue" : d <= 7 ? "This week" : d <= 30 ? "This month" : "Later";
    }
    groups.set(k, [...(groups.get(k) ?? []), t]);
  });
  const order = ["Overdue", "This week", "This month", "Later", "No due date"];
  const entries = [...groups].sort((a, b) => group === "due" ? order.indexOf(a[0]) - order.indexOf(b[0]) : a[0].localeCompare(b[0]));

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!f.title.trim()) return setErr("Write a task first.");
    const { error } = await supabase.from("tasks").insert({ title: f.title.trim(), due_date: f.due || null, application_id: f.app || null, user_id: ws!.userId });
    if (error) return setErr(error.message);
    setF({ title: "", due: "", app: f.app });
    refresh();
  }
  async function toggle(t: Task) {
    await supabase.from("tasks").update({ done: !t.done }).eq("id", t.id);
    refresh();
  }
  async function remove(t: Task) {
    await supabase.from("tasks").delete().eq("id", t.id);
    refresh();
  }

  return (
    <>
      <PageHeader title="Task board" description={`${ws.tasks.filter((t) => !t.done).length} open · ${ws.tasks.filter((t) => t.done).length} done`} />
      <Card className="mb-6 p-4">
        <form onSubmit={add} className="flex flex-wrap items-end gap-3">
          <div className="min-w-64 flex-1"><label htmlFor="tt" className="mb-1 block text-sm font-medium">New task</label><Input id="tt" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="e.g. Email referee with CV" /></div>
          <div><label htmlFor="td" className="mb-1 block text-sm font-medium">Due</label><Input id="td" type="date" value={f.due} onChange={(e) => setF({ ...f, due: e.target.value })} /></div>
          <div className="w-64"><label htmlFor="ta" className="mb-1 block text-sm font-medium">Programme</label>
            <Select id="ta" value={f.app} onChange={(e) => setF({ ...f, app: e.target.value })}>
              <option value="">General</option>
              {ws.applications.map((a) => <option key={a.id} value={a.id}>{appName(a.id)}</option>)}
            </Select>
          </div>
          <Button type="submit">Add task</Button>
        </form>
        {err && <p role="alert" className="mt-2 text-sm text-destructive">{err}</p>}
      </Card>

      <div className="mb-4 flex flex-wrap gap-3">
        <Select aria-label="Show tasks" className="w-40" value={show} onChange={(e) => setShow(e.target.value as typeof show)}>
          <option value="open">Open</option><option value="done">Completed</option><option value="all">All</option>
        </Select>
        <Select aria-label="Group by" className="w-48" value={group} onChange={(e) => setGroup(e.target.value as typeof group)}>
          <option value="programme">Group by programme</option><option value="due">Group by due date</option>
        </Select>
      </div>

      {entries.length === 0 ? <Empty>No tasks here.</Empty> : (
        <div className="grid gap-4 md:grid-cols-2">
          {entries.map(([k, items]) => (
            <Card key={k} className="p-4">
              <h2 className="mb-2 font-serif text-base">{k} <span className="text-sm text-muted-foreground">({items.length})</span></h2>
              <ul className="divide-y divide-border">
                {items.map((t) => (
                  <li key={t.id} className="flex items-center gap-3 py-2 text-sm">
                    <input type="checkbox" className="size-4" checked={t.done} onChange={() => toggle(t)} aria-label={`Mark “${t.title}” ${t.done ? "not done" : "done"}`} />
                    <span className={`flex-1 ${t.done ? "text-muted-foreground line-through" : ""}`}>
                      {t.title}
                      {group === "due" && <span className="block text-xs text-muted-foreground">{appName(t.application_id)}</span>}
                    </span>
                    {t.due_date && (t.done ? <span className="text-xs text-muted-foreground">{formatDate(t.due_date)}</span> : <DeadlineBadge days={daysUntil(t.due_date)} />)}
                    <button onClick={() => remove(t)} className="text-xs text-muted-foreground hover:text-destructive">Delete</button>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
