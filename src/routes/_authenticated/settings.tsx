import { createFileRoute, Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/components/AddProgramme";
import { PLANS, planOf, planPrice } from "@/lib/plans";
import { Badge, Button, Card, Field, Input, PageHeader, Select } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings — GradPath Atlas" }, { name: "description", content: "Academic profile defaults and plan." }] }),
  component: Settings,
});

type P = { display_name: string; gpa: string; gpa_scale: string; target_intake: string; currency: string };

function Settings() {
  const profile = useProfile();
  const qc = useQueryClient();
  const [f, setF] = useState<P>({ display_name: "", gpa: "", gpa_scale: "4.0", target_intake: "September 2027", currency: "GBP" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const d = profile.data as Partial<P> | undefined;
    if (d) setF({ display_name: d.display_name ?? "", gpa: d.gpa ?? "", gpa_scale: d.gpa_scale ?? "4.0", target_intake: d.target_intake ?? "September 2027", currency: d.currency ?? "GBP" });
  }, [profile.data]);

  if (!profile.data) return <p className="text-sm text-muted-foreground">Loading…</p>;
  const plan = planOf(profile.data.plan);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from("profiles").update(f).eq("id", profile.data!.id);
    setMsg(error ? error.message : "Saved.");
    qc.invalidateQueries({ queryKey: ["profile"] });
  }
  async function setPlan(id: string) {
    await supabase.from("profiles").update({ plan: id }).eq("id", profile.data!.id);
    qc.invalidateQueries({ queryKey: ["profile"] });
  }

  return (
    <>
      <PageHeader title="Settings" description={`Signed in as ${profile.data.email}`} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="mb-4 font-serif text-lg">Academic profile</h2>
          <form onSubmit={save} className="space-y-4">
            <Field label="Display name" htmlFor="dn"><Input id="dn" value={f.display_name} onChange={(e) => setF({ ...f, display_name: e.target.value })} /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Your GPA / grade" htmlFor="gpa"><Input id="gpa" value={f.gpa} onChange={(e) => setF({ ...f, gpa: e.target.value })} placeholder="e.g. 3.6" /></Field>
              <Field label="GPA scale" htmlFor="gs">
                <Select id="gs" value={f.gpa_scale} onChange={(e) => setF({ ...f, gpa_scale: e.target.value })}>
                  <option value="4.0">4.0 scale</option><option value="4.3">4.3 scale</option><option value="5.0">5.0 scale</option><option value="100">Percentage (100)</option><option value="uk">UK classification</option>
                </Select>
              </Field>
            </div>
            <Field label="Target intake" htmlFor="ti">
              <Select id="ti" value={f.target_intake} onChange={(e) => setF({ ...f, target_intake: e.target.value })}>
                {["January 2027", "September 2027", "January 2028", "September 2028"].map((x) => <option key={x}>{x}</option>)}
              </Select>
            </Field>
            <Field label="Preferred currency" htmlFor="cur" hint="Used as your default when adding custom programmes.">
              <Select id="cur" value={f.currency} onChange={(e) => setF({ ...f, currency: e.target.value })}>
                {["GBP", "EUR", "USD", "HKD", "AUD", "CAD", "SGD"].map((x) => <option key={x}>{x}</option>)}
              </Select>
            </Field>
            <div className="flex items-center gap-3"><Button type="submit">Save profile</Button>{msg && <span role="status" className="text-sm text-muted-foreground">{msg}</span>}</div>
          </form>
        </Card>

        <Card className="p-5">
          <h2 className="mb-1 font-serif text-lg">Plan</h2>
          <p className="mb-4 text-sm text-muted-foreground">Current plan: <Badge tone="info">{plan.name}</Badge> — test mode, no payment is taken. <Link to="/pricing" className="underline">Compare plans</Link></p>
          <ul className="space-y-2">
            {PLANS.map((p) => (
              <li key={p.id} className="flex items-center justify-between rounded-md border border-border p-3 text-sm">
                <span><span className="font-medium">{p.name}</span> · {planPrice(p, f.currency)} {p.period}</span>
                {p.id === plan.id ? <Badge tone="success">Active</Badge> : <Button size="sm" variant="outline" onClick={() => setPlan(p.id)}>Switch (test)</Button>}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
