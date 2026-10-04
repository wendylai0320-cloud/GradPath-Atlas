import { createFileRoute, Link, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    return { user: data.user };
  },
  component: Shell,
});

const NAV = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/compare", label: "Compare programmes" },
  { to: "/deadlines", label: "Deadlines" },
  { to: "/tasks", label: "Tasks" },
  { to: "/documents", label: "Documents" },
  { to: "/summary", label: "Shortlist & plan" },
  { to: "/adviser", label: "Adviser review" },
  { to: "/settings", label: "Settings" },
] as const;

function Shell() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-4 py-6 print:hidden">
        <div className="px-2"><Logo /></div>
        <nav aria-label="Main" className="mt-8 flex flex-1 flex-col gap-0.5">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent"
              activeProps={{ className: "bg-sidebar-accent font-medium !text-sidebar-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-sidebar-border px-2 pt-4 text-xs text-muted-foreground">
          <p className="truncate" title={user.email ?? ""}>{user.email}</p>
          <button
            className="mt-2 text-foreground underline"
            onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/" }); }}
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-10 py-10">
        <div className="mx-auto max-w-[1400px]"><Outlet /></div>
      </main>
    </div>
  );
}
