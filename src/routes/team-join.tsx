import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { Badge, Button, Card } from "@/components/ui-kit";
import { supabase } from "@/integrations/supabase/client";
import { teamApi, type InvitePreview } from "@/lib/team-api";

const TOKEN_PATTERN = /^[0-9a-f]{64}$/;

export const Route = createFileRoute("/team-join")({
  validateSearch: (search: Record<string, unknown>): { token: string } => {
    const token = search["token"];
    return { token: typeof token === "string" && TOKEN_PATTERN.test(token) ? token : "" };
  },
  head: () => ({
    meta: [
      { title: "Team invitation — GradPath Atlas" },
      { name: "description", content: "Review and accept a GradPath Atlas team invitation." },
    ],
  }),
  component: TeamJoin,
});

function TeamJoin() {
  const { token } = Route.useSearch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [preview, setPreview] = useState<InvitePreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [acceptedType, setAcceptedType] = useState<"staff" | "student" | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!token) {
        setError("This invitation link is invalid.");
        setLoading(false);
        return;
      }
      const { data } = await supabase.auth.getUser();
      if (cancelled) return;
      if (!data.user) {
        setEmail("");
        setLoading(false);
        return;
      }
      setEmail(data.user.email ?? "");
      try {
        const details = await teamApi.previewInvite(token);
        if (!cancelled) setPreview(details);
      } catch (loadError) {
        if (!cancelled)
          setError(
            loadError instanceof Error ? loadError.message : "Could not verify this invitation.",
          );
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  async function accept() {
    if (!preview || !token) return;
    setBusy(true);
    setError("");
    try {
      const result = await teamApi.acceptInvite(
        token,
        preview.invite_type === "student" && consent,
      );
      setAcceptedType(result.invite_type);
      setAccepted(true);
    } catch (acceptError) {
      setError(
        acceptError instanceof Error ? acceptError.message : "Could not accept this invitation.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function switchAccount() {
    await supabase.auth.signOut();
    await navigate({ to: "/auth", search: { mode: "signin", teamInvite: token } });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-12">
      <div className="w-full max-w-xl">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <Card className="p-6 sm:p-8">
          {loading ? (
            <p className="text-sm text-muted-foreground">Checking invitation…</p>
          ) : accepted ? (
            <div className="space-y-4">
              <Badge tone="success">Invitation accepted</Badge>
              <h1 className="font-serif text-2xl">
                You’re connected to {preview?.organization_name}
              </h1>
              {acceptedType === "student" ? (
                <p className="text-sm text-muted-foreground">
                  Your read-only planning summary is now shared with this team. You can review or
                  revoke this access at any time in Settings.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  You joined the workspace as a {preview?.staff_role}. Open Team workspace to
                  continue.
                </p>
              )}
              {acceptedType === "student" ? (
                <Link
                  to="/settings"
                  className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
                >
                  Review sharing in Settings
                </Link>
              ) : (
                <Link
                  to="/teams"
                  className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
                >
                  Open Team workspace
                </Link>
              )}
            </div>
          ) : !token ? (
            <div className="space-y-4">
              <h1 className="font-serif text-2xl">Invitation link is invalid</h1>
              <p role="alert" className="text-sm text-destructive">
                This link is malformed. Ask the workspace owner to create a new invitation.
              </p>
              <Link
                to="/"
                className="inline-flex h-10 items-center rounded-md px-4 text-sm underline"
              >
                Return home
              </Link>
            </div>
          ) : !email ? (
            <div className="space-y-4">
              <h1 className="font-serif text-2xl">You’ve been invited to a GradPath Atlas team</h1>
              <p className="text-sm text-muted-foreground">
                Sign in or create an account using the exact email address the invitation was sent
                to. The link is single-use and expires after 7 days.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/auth"
                  search={{ mode: "signin", teamInvite: token }}
                  className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
                >
                  Sign in to continue
                </Link>
                <Link
                  to="/auth"
                  search={{ mode: "signup", teamInvite: token }}
                  className="inline-flex h-10 items-center rounded-md border border-input px-4 text-sm font-medium hover:bg-secondary"
                >
                  Create an account
                </Link>
              </div>
            </div>
          ) : preview ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="info">
                  {preview.organization_kind === "university" ? "University team" : "Adviser team"}
                </Badge>
                <Badge>
                  {preview.invite_type === "student"
                    ? "Student access"
                    : `${preview.staff_role} role`}
                </Badge>
              </div>
              <h1 className="font-serif text-2xl">Join {preview.organization_name}</h1>
              <p className="text-sm text-muted-foreground">
                Signed in as <strong className="text-foreground">{email}</strong>
              </p>
              {preview.invite_type === "student" ? (
                <div className="rounded-md border border-border bg-secondary/60 p-4">
                  <h2 className="font-medium">What will be shared</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{preview.consent_purpose}</p>
                  <label className="mt-4 flex items-start gap-3 text-sm">
                    <input
                      type="checkbox"
                      className="mt-1 accent-primary"
                      checked={consent}
                      onChange={(event) => setConsent(event.target.checked)}
                    />
                    <span>
                      I have read this and agree to share my planning summary with this team.
                    </span>
                  </label>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  This invitation gives you the {preview.staff_role} staff role. It does not grant
                  access to any student until that student separately accepts a data-sharing
                  request.
                </p>
              )}
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              <Button
                onClick={() => void accept()}
                disabled={busy || (preview.invite_type === "student" && !consent)}
              >
                {busy
                  ? "Accepting…"
                  : preview.invite_type === "student"
                    ? "Agree and share with team"
                    : "Accept staff invitation"}
              </Button>
              <p className="text-xs text-muted-foreground">
                Invitation expires {new Date(preview.expires_at).toLocaleString()}.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h1 className="font-serif text-2xl">Invitation could not be verified</h1>
              <p role="alert" className="text-sm text-destructive">
                {error || "This invitation may have expired or already been used."}
              </p>
              <p className="text-sm text-muted-foreground">
                Check that you are signed in with the invited email address, or ask the workspace
                owner to create a new link.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => void switchAccount()}>
                  Sign in with a different email
                </Button>
                <Link
                  to="/"
                  className="inline-flex h-10 items-center rounded-md px-4 text-sm underline"
                >
                  Return home
                </Link>
              </div>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
