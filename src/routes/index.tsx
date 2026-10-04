import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicHeader } from "@/components/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GradPath Atlas — Plan every master's application in one place" },
      { name: "description", content: "Compare programme requirements side by side, track deadlines and keep transcripts, statements and references ready." },
      { property: "og:title", content: "GradPath Atlas — Master's application planner" },
      { property: "og:description", content: "Compare programmes, track deadlines and organise reusable application documents." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Landing,
});

const rows = [
  ["Marketing Analytics", "Northbridge", "IELTS 7.0", "2 refs", "30 Nov", 75],
  ["Data Science for Society", "Harbourline", "TOEFL 95", "2 refs", "1 Dec", 50],
  ["Brand Management", "Aldermere", "IELTS 7.0", "Portfolio", "15 Nov", 100],
  ["Management (Sustainability)", "Lumen", "IELTS 7.0", "3 refs", "15 Dec", 25],
] as const;

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent-foreground">Master's application planning</p>
            <h1 className="text-5xl font-medium leading-[1.05] text-foreground lg:text-6xl">Every programme, deadline and document — on one clear map.</h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              GradPath Atlas helps final-year students compare requirements across universities, track what's due, and reuse transcripts, statements and references without losing track.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to="/auth" search={{ mode: "signup" }} className="rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">Create free workspace</Link>
              <Link to="/pricing" className="rounded-md border border-input bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary">See plans</Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">A planning tool — it does not predict admission outcomes.</p>
          </div>
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="border-b border-border bg-secondary px-4 py-2.5 text-xs font-medium text-muted-foreground">Programme comparison · demo data</div>
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted-foreground">
                <tr>{["Programme", "University", "English", "Extras", "Next deadline", "Ready"].map((h) => <th key={h} className="px-4 py-2.5 font-medium">{h}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r[0]} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{r[0]}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r[1]}</td>
                    <td className="px-4 py-3">{r[2]}</td>
                    <td className="px-4 py-3">{r[3]}</td>
                    <td className="px-4 py-3">{r[4]}</td>
                    <td className="px-4 py-3">
                      <div className="h-1.5 w-16 rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: `${r[5]}%` }} /></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="border-y border-border bg-card">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
            {[
              ["Compare", "See requirements, costs, tests and references side by side across every shortlisted programme."],
              ["Track deadlines", "Every round and scholarship date in one timeline, with clear warnings as dates approach."],
              ["Reuse documents", "Link one transcript or statement to many applications and see exactly what's missing."],
              ["Share with an adviser", "Give a careers adviser read access to review progress and leave comments."],
            ].map(([t, d], i) => (
              <div key={t}>
                <p className="font-serif text-3xl text-muted-foreground">0{i + 1}</p>
                <h2 className="mt-2 text-xl">{t}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl">From long list to final action plan</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {["Add target programmes", "Record their requirements", "Link documents and tasks", "Shortlist and export your plan"].map((s, i) => (
              <li key={s} className="rounded-lg border border-border bg-card p-5">
                <span className="text-xs font-medium text-muted-foreground">Step {i + 1}</span>
                <p className="mt-1 font-medium">{s}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        GradPath Atlas · All universities and programmes shown are fictional demo data.
      </footer>
    </div>
  );
}
