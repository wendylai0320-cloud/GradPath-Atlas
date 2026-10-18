import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicHeader } from "@/components/Logo";
import { PLANS, PLAN_CURRENCIES, planPrice, type PlanCurrency } from "@/lib/plans";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — GradPath Atlas" },
      {
        name: "description",
        content:
          "Free basic planning, a one-season application pass, and adviser or university licences. Prices shown in HKD, GBP or USD.",
      },
      { property: "og:title", content: "Pricing — GradPath Atlas" },
      {
        property: "og:description",
        content: "Free planning tier, Season Pass and adviser licences, priced in HKD.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Pricing,
});

function Pricing() {
  const [currency, setCurrency] = useState<PlanCurrency>("HKD");
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl">Plans for applicants and advising teams</h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Basic and Season Pass are student plans. Season Pass can be previewed in test mode
              with no payment. Adviser / University is a team-licence concept and is not available
              for self-service yet.
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            Show prices in
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as PlanCurrency)}
              className="rounded-md border border-input bg-background px-2 py-1.5 text-sm text-foreground"
              aria-label="Price currency"
            >
              {PLAN_CURRENCIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PLANS.map((p) => (
            <div
              key={p.id}
              className={`flex flex-col rounded-lg border bg-card p-6 ${p.featured ? "border-primary ring-1 ring-primary" : "border-border"}`}
            >
              <h2 className="text-2xl">{p.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
              <p className="mt-6 font-serif text-4xl">
                {planPrice(p, currency)}
                <span className="ml-1 font-sans text-sm text-muted-foreground">{p.period}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden className="text-success">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              {p.availability === "enquiry-only" ? (
                <button
                  type="button"
                  disabled
                  className="mt-8 cursor-not-allowed rounded-md border border-input px-4 py-2.5 text-center text-sm font-medium text-muted-foreground opacity-70"
                >
                  Team licence coming soon
                </button>
              ) : (
                <Link
                  to="/auth"
                  search={{ mode: "signup" }}
                  className={`mt-8 rounded-md px-4 py-2.5 text-center text-sm font-medium ${p.featured ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-input hover:bg-secondary"}`}
                >
                  {p.id === "free" ? "Create free account" : "Create account to preview"}
                </Link>
              )}
              {p.id === "season" && (
                <p className="mt-2 text-xs text-muted-foreground">
                  After signing in, choose Season Pass under Settings → Plan. This is a test
                  selection, not a purchase.
                </p>
              )}
              {p.id === "licence" && (
                <p className="mt-2 text-xs text-muted-foreground">
                  Team accounts, multi-student tools, onboarding, and invoice billing are not active
                  in this prototype.
                </p>
              )}
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Displayed prices are illustrative prototype values in {currency}; no checkout, payment, or
          team licence provisioning is currently available.
        </p>
      </main>
    </div>
  );
}
