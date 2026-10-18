import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useProfile } from "@/components/AddProgramme";
import {
  Badge,
  Button,
  Card,
  Empty,
  Field,
  Input,
  PageHeader,
  Select,
  Textarea,
} from "@/components/ui-kit";
import {
  teamApi,
  type TeamBillingRequest,
  type TeamInvite,
  type TeamMember,
  type TeamOrganization,
  type TeamStudent,
  type TeamStudentWorkspace,
} from "@/lib/team-api";

export const Route = createFileRoute("/_authenticated/teams")({
  head: () => ({
    meta: [
      { title: "Team workspace — GradPath Atlas" },
      {
        name: "description",
        content: "Manage team onboarding and student-consented application-plan reviews.",
      },
    ],
  }),
  component: Teams,
});

function Teams() {
  const profile = useProfile();
  const [organizations, setOrganizations] = useState<TeamOrganization[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invites, setInvites] = useState<TeamInvite[]>([]);
  const [students, setStudents] = useState<TeamStudent[]>([]);
  const [billingRequests, setBillingRequests] = useState<TeamBillingRequest[]>([]);
  const [studentId, setStudentId] = useState("");
  const [studentWorkspace, setStudentWorkspace] = useState<TeamStudentWorkspace | null>(null);
  const [studentError, setStudentError] = useState("");
  const [setupError, setSetupError] = useState("");
  const [actionError, setActionError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamKind, setTeamKind] = useState<"adviser" | "university">("adviser");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteType, setInviteType] = useState<"staff" | "student">("student");
  const [staffRole, setStaffRole] = useState<"admin" | "member">("member");
  const [newInviteUrl, setNewInviteUrl] = useState("");
  const [billingForm, setBillingForm] = useState({
    contactName: "",
    contactEmail: "",
    seatEstimate: "5",
    message: "",
  });

  const selectedOrganization =
    organizations.find((item) => item.organization_id === selectedId) ?? null;
  const canManage =
    selectedOrganization?.member_role === "owner" || selectedOrganization?.member_role === "admin";

  const loadOrganizations = useCallback(async () => {
    setLoading(true);
    setSetupError("");
    try {
      const rows = await teamApi.listOrganizations();
      setOrganizations(rows);
      setSelectedId((current) =>
        current && rows.some((row) => row.organization_id === current)
          ? current
          : (rows[0]?.organization_id ?? ""),
      );
    } catch (error) {
      setSetupError(error instanceof Error ? error.message : "Could not load team workspaces.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadOrganizations();
  }, [loadOrganizations]);

  const loadTeamData = useCallback(async () => {
    if (!selectedOrganization) return;
    setActionError("");
    try {
      const [memberRows, studentRows] = await Promise.all([
        teamApi.listMembers(selectedOrganization.organization_id),
        teamApi.listStudents(selectedOrganization.organization_id),
      ]);
      setMembers(memberRows);
      setStudents(studentRows);
      if (canManage) {
        const [inviteRows, requestRows] = await Promise.all([
          teamApi.listInvites(selectedOrganization.organization_id),
          teamApi.listBillingRequests(selectedOrganization.organization_id),
        ]);
        setInvites(inviteRows);
        setBillingRequests(requestRows);
      } else {
        setInvites([]);
        setBillingRequests([]);
      }
    } catch (error) {
      setMembers([]);
      setStudents([]);
      setInvites([]);
      setBillingRequests([]);
      setStudentId("");
      setStudentWorkspace(null);
      setActionError(error instanceof Error ? error.message : "Could not load workspace details.");
    }
  }, [canManage, selectedOrganization]);

  useEffect(() => {
    void loadTeamData();
  }, [loadTeamData]);

  useEffect(() => {
    if (!selectedOrganization || !studentId) {
      setStudentWorkspace(null);
      setStudentError("");
      return;
    }
    let cancelled = false;
    setStudentWorkspace(null);
    setStudentError("");
    teamApi
      .getStudentWorkspace(selectedOrganization.organization_id, studentId)
      .then((workspace) => {
        if (!cancelled) setStudentWorkspace(workspace);
      })
      .catch((error: unknown) => {
        if (!cancelled)
          setStudentError(
            error instanceof Error ? error.message : "Could not load the student plan.",
          );
      });
    return () => {
      cancelled = true;
    };
  }, [selectedOrganization, studentId]);

  async function createOrganization(event: React.FormEvent) {
    event.preventDefault();
    setActionError("");
    setNotice("");
    setBusy(true);
    try {
      const id = await teamApi.createOrganization(teamName, teamKind);
      setTeamName("");
      await loadOrganizations();
      setSelectedId(id);
      setNotice("Workspace created. You are its owner.");
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Could not create the workspace.");
    } finally {
      setBusy(false);
    }
  }

  async function createInvite(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedOrganization) return;
    setActionError("");
    setNotice("");
    setNewInviteUrl("");
    setBusy(true);
    try {
      const result = await teamApi.createInvite(
        selectedOrganization.organization_id,
        inviteEmail,
        inviteType,
        inviteType === "staff" ? staffRole : null,
      );
      const created = result[0];
      if (!created) throw new Error("The invitation was created without a link. Please try again.");
      const url = new URL("/team-join", window.location.origin);
      url.searchParams.set("token", created.raw_token);
      setNewInviteUrl(url.toString());
      setInviteEmail("");
      await loadTeamData();
      setNotice(
        `Invitation link created. It expires ${new Date(created.expires_at).toLocaleString()}. Share it only with the invited email address.`,
      );
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Could not create the invitation.");
    } finally {
      setBusy(false);
    }
  }

  async function revokeInvite(invite: TeamInvite) {
    if (!selectedOrganization) return;
    setBusy(true);
    setActionError("");
    try {
      await teamApi.revokeInvite(selectedOrganization.organization_id, invite.invite_id);
      await loadTeamData();
      setNotice("Invitation revoked.");
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Could not revoke the invitation.");
    } finally {
      setBusy(false);
    }
  }

  async function removeMember(member: TeamMember) {
    if (!selectedOrganization) return;
    setBusy(true);
    setActionError("");
    try {
      const removed = await teamApi.removeMember(
        selectedOrganization.organization_id,
        member.user_id,
      );
      if (!removed)
        throw new Error(
          "This member cannot be removed. The workspace owner must remain in the team.",
        );
      await loadTeamData();
      setNotice(`${member.email} was removed from the workspace.`);
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Could not remove the member.");
    } finally {
      setBusy(false);
    }
  }

  async function createBillingRequest(event: React.FormEvent) {
    event.preventDefault();
    if (!selectedOrganization) return;
    setBusy(true);
    setActionError("");
    setNotice("");
    try {
      await teamApi.createBillingRequest(
        selectedOrganization.organization_id,
        billingForm.contactName,
        billingForm.contactEmail || profile.data?.email || "",
        Number(billingForm.seatEstimate),
        billingForm.message,
      );
      setBillingForm((current) => ({ ...current, message: "" }));
      await loadTeamData();
      setNotice(
        "Demo billing inquiry saved. It was not emailed, paid, or converted into an official invoice.",
      );
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Could not save the billing inquiry.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Team workspace"
        description="Set up an Adviser or University team, invite people by secure link, and review only the plans students have chosen to share."
      />
      {setupError ? (
        <Card className="p-5">
          <h2 className="font-serif text-lg">Team workspace setup is not ready</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            The team database functions may not yet be installed in the connected Supabase project.
            Apply the team-pilot migration before using this page. Details: {setupError}
          </p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => void loadOrganizations()}
            disabled={loading}
          >
            Retry
          </Button>
        </Card>
      ) : loading ? (
        <p className="text-sm text-muted-foreground">Loading workspaces…</p>
      ) : (
        <div className="space-y-6">
          {actionError && (
            <p role="alert" className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {actionError}
            </p>
          )}
          {notice && (
            <p role="status" className="rounded-md bg-secondary p-3 text-sm">
              {notice}
            </p>
          )}

          <Card className="p-5">
            <h2 className="font-serif text-lg">Create a team workspace</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The account that creates a workspace becomes its owner. You can invite colleagues as
              admins or members.
            </p>
            <form
              onSubmit={createOrganization}
              className="mt-4 grid gap-4 md:grid-cols-[1fr_12rem_auto] md:items-end"
            >
              <Field label="Organization name" htmlFor="team-name">
                <Input
                  id="team-name"
                  required
                  minLength={2}
                  maxLength={120}
                  value={teamName}
                  onChange={(event) => setTeamName(event.target.value)}
                  placeholder="e.g. North Campus Careers Office"
                />
              </Field>
              <Field label="Workspace type" htmlFor="team-kind">
                <Select
                  id="team-kind"
                  value={teamKind}
                  onChange={(event) => setTeamKind(event.target.value as "adviser" | "university")}
                >
                  <option value="adviser">Adviser team</option>
                  <option value="university">University team</option>
                </Select>
              </Field>
              <Button type="submit" disabled={busy}>
                {busy ? "Creating…" : "Create workspace"}
              </Button>
            </form>
          </Card>

          {organizations.length === 0 ? (
            <Empty>
              No team workspace yet. Create one above or ask an owner to invite you. Students can
              manage any team access they accepted in Settings.
            </Empty>
          ) : (
            <>
              <div className="flex flex-wrap items-end gap-3">
                <Field label="Workspace" htmlFor="team-select">
                  <Select
                    id="team-select"
                    value={selectedId}
                    onChange={(event) => {
                      setSelectedId(event.target.value);
                      setMembers([]);
                      setStudents([]);
                      setInvites([]);
                      setBillingRequests([]);
                      setStudentId("");
                      setStudentWorkspace(null);
                    }}
                  >
                    {organizations.map((organization) => (
                      <option
                        key={organization.organization_id}
                        value={organization.organization_id}
                      >
                        {organization.name} · {organization.member_role}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Badge tone="info">
                  {selectedOrganization?.kind === "university" ? "University" : "Adviser"} workspace
                </Badge>
              </div>

              {selectedOrganization && (
                <>
                  <div className="grid gap-6 xl:grid-cols-2">
                    <Card className="p-5">
                      <h2 className="font-serif text-lg">Team members</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Role: {selectedOrganization.member_role}. Only owners and admins can invite
                        people.
                      </p>
                      {members.length === 0 ? (
                        <p className="mt-4 text-sm text-muted-foreground">
                          No team members have joined yet.
                        </p>
                      ) : (
                        <ul className="mt-4 divide-y divide-border">
                          {members.map((member) => {
                            const mayRemove =
                              canManage &&
                              member.member_role !== "owner" &&
                              (selectedOrganization.member_role === "owner" ||
                                member.member_role === "member");
                            return (
                              <li
                                key={member.user_id}
                                className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"
                              >
                                <span>
                                  <strong>{member.display_name || member.email}</strong>
                                  <span className="block text-muted-foreground">
                                    {member.email}
                                  </span>
                                </span>
                                <span className="flex items-center gap-2">
                                  <Badge>{member.member_role}</Badge>
                                  {mayRemove && (
                                    <Button
                                      size="sm"
                                      variant="danger"
                                      disabled={busy}
                                      onClick={() => void removeMember(member)}
                                    >
                                      Remove
                                    </Button>
                                  )}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </Card>

                    <Card className="p-5">
                      <h2 className="font-serif text-lg">Invite staff or request student access</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Links expire after 7 days and work only for the invited email. Student
                        access starts only after the student reviews and accepts the request.
                      </p>
                      {canManage ? (
                        <form onSubmit={createInvite} className="mt-4 space-y-4">
                          <Field label="Invitee email" htmlFor="invite-email">
                            <Input
                              id="invite-email"
                              type="email"
                              required
                              value={inviteEmail}
                              onChange={(event) => setInviteEmail(event.target.value)}
                              placeholder="name@example.edu"
                            />
                          </Field>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Invite type" htmlFor="invite-type">
                              <Select
                                id="invite-type"
                                value={inviteType}
                                onChange={(event) =>
                                  setInviteType(event.target.value as "staff" | "student")
                                }
                              >
                                <option value="student">Student (consent required)</option>
                                <option value="staff">Staff member</option>
                              </Select>
                            </Field>
                            {inviteType === "staff" && (
                              <Field label="Staff role" htmlFor="staff-role">
                                <Select
                                  id="staff-role"
                                  value={staffRole}
                                  onChange={(event) =>
                                    setStaffRole(event.target.value as "admin" | "member")
                                  }
                                >
                                  <option value="member">Member</option>
                                  <option value="admin">Admin</option>
                                </Select>
                              </Field>
                            )}
                          </div>
                          <Button type="submit" disabled={busy}>
                            {busy ? "Creating link…" : "Create invitation link"}
                          </Button>
                        </form>
                      ) : (
                        <p className="mt-4 text-sm text-muted-foreground">
                          Ask a workspace owner or admin to send invitations.
                        </p>
                      )}
                      {newInviteUrl && (
                        <div className="mt-4 space-y-2 rounded-md bg-secondary p-3">
                          <label htmlFor="invite-link" className="text-sm font-medium">
                            One-time invitation link
                          </label>
                          <Input
                            id="invite-link"
                            readOnly
                            value={newInviteUrl}
                            onFocus={(event) => event.currentTarget.select()}
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={async () => {
                              try {
                                await navigator.clipboard.writeText(newInviteUrl);
                                setNotice("Invitation link copied.");
                              } catch {
                                setNotice("Select and copy the invitation link above.");
                              }
                            }}
                          >
                            Copy link
                          </Button>
                        </div>
                      )}
                    </Card>
                  </div>

                  {canManage && (
                    <Card className="p-5">
                      <h2 className="font-serif text-lg">Invitation status</h2>
                      {invites.length === 0 ? (
                        <p className="mt-2 text-sm text-muted-foreground">No invitations yet.</p>
                      ) : (
                        <div className="mt-3 overflow-x-auto">
                          <table className="w-full text-left text-sm">
                            <thead>
                              <tr className="border-b border-border text-muted-foreground">
                                <th className="py-2 pr-4">Email</th>
                                <th className="py-2 pr-4">Type / role</th>
                                <th className="py-2 pr-4">Status</th>
                                <th className="py-2 pr-4">Expires</th>
                                <th className="py-2">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {invites.map((invite) => (
                                <tr key={invite.invite_id} className="border-b border-border/70">
                                  <td className="py-2 pr-4">{invite.invitee_email}</td>
                                  <td className="py-2 pr-4">
                                    {invite.invite_type === "student"
                                      ? "Student consent"
                                      : `Staff · ${invite.staff_role}`}
                                  </td>
                                  <td className="py-2 pr-4">
                                    <Badge
                                      tone={
                                        invite.invite_status === "accepted"
                                          ? "success"
                                          : invite.invite_status === "pending"
                                            ? "warning"
                                            : "neutral"
                                      }
                                    >
                                      {invite.invite_status}
                                    </Badge>
                                  </td>
                                  <td className="py-2 pr-4">
                                    {new Date(invite.expires_at).toLocaleDateString()}
                                  </td>
                                  <td className="py-2">
                                    {invite.invite_status === "pending" && (
                                      <Button
                                        size="sm"
                                        variant="danger"
                                        disabled={busy}
                                        onClick={() => void revokeInvite(invite)}
                                      >
                                        Revoke
                                      </Button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </Card>
                  )}

                  <Card className="p-5">
                    <h2 className="font-serif text-lg">Students sharing with this team</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Read-only summary of programmes, statuses, tasks, and deadlines. Private
                      notes, document links, and files are excluded.
                    </p>
                    {students.length === 0 ? (
                      <div className="mt-4">
                        <Empty>
                          Students appear here only after they accept a student-access invitation.
                        </Empty>
                      </div>
                    ) : (
                      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {students.map((student) => (
                          <Card
                            key={student.student_id}
                            className={`p-4 ${studentId === student.student_id ? "border-primary" : ""}`}
                          >
                            <h3 className="font-medium">{student.display_name}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {student.programme_count} programmes · {student.open_task_count} open
                              tasks
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Next deadline:{" "}
                              {student.next_deadline
                                ? new Date(`${student.next_deadline}T00:00:00`).toLocaleDateString()
                                : "None recorded"}
                            </p>
                            <Button
                              className="mt-3"
                              size="sm"
                              variant="outline"
                              onClick={() => setStudentId(student.student_id)}
                            >
                              View shared summary
                            </Button>
                          </Card>
                        ))}
                      </div>
                    )}
                    {studentError && (
                      <p role="alert" className="mt-4 text-sm text-destructive">
                        {studentError}
                      </p>
                    )}
                    {studentId && !studentWorkspace && !studentError && (
                      <p className="mt-4 text-sm text-muted-foreground">Loading shared summary…</p>
                    )}
                    {studentWorkspace && (
                      <div className="mt-6 space-y-5 border-t border-border pt-5">
                        <h3 className="text-lg font-medium">
                          {studentWorkspace.display_name} · shared plan
                        </h3>
                        <section>
                          <h4 className="font-medium">Programmes</h4>
                          {studentWorkspace.applications.length === 0 ? (
                            <p className="mt-2 text-sm text-muted-foreground">
                              No programmes are being tracked.
                            </p>
                          ) : (
                            <ul className="mt-2 grid gap-3 md:grid-cols-2">
                              {studentWorkspace.applications.map((application, index) => (
                                <li
                                  key={`${application.programme_name}-${application.university_name}-${index}`}
                                  className="rounded-md border border-border p-3"
                                >
                                  <div className="flex flex-wrap items-start justify-between gap-2">
                                    <p className="font-medium">
                                      {application.degree}{" "}
                                      {application.programme_name || "Programme"}
                                    </p>
                                    <Badge tone="info">{application.status}</Badge>
                                  </div>
                                  <p className="mt-1 text-sm text-muted-foreground">
                                    {application.university_name || "University not recorded"}
                                    {application.country ? ` · ${application.country}` : ""}
                                  </p>
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    {application.intake || "Intake not recorded"} ·{" "}
                                    {application.tier} ·{" "}
                                    {application.shortlisted ? "Shortlisted" : "Not shortlisted"}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          )}
                        </section>
                        <div className="grid gap-5 md:grid-cols-2">
                          <section>
                            <h4 className="font-medium">Open tasks</h4>
                            {studentWorkspace.open_tasks.length === 0 ? (
                              <p className="mt-2 text-sm text-muted-foreground">No open tasks.</p>
                            ) : (
                              <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                                {studentWorkspace.open_tasks.map((task, index) => (
                                  <li key={`${task.title}-${index}`}>
                                    {task.title}
                                    {task.due_date
                                      ? ` · ${new Date(`${task.due_date}T00:00:00`).toLocaleDateString()}`
                                      : ""}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </section>
                          <section>
                            <h4 className="font-medium">Upcoming deadlines</h4>
                            {studentWorkspace.upcoming_deadlines.length === 0 ? (
                              <p className="mt-2 text-sm text-muted-foreground">
                                No upcoming deadlines.
                              </p>
                            ) : (
                              <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                                {studentWorkspace.upcoming_deadlines.map((deadline, index) => (
                                  <li key={`${deadline.label}-${deadline.due_date}-${index}`}>
                                    {deadline.label} ·{" "}
                                    {new Date(`${deadline.due_date}T00:00:00`).toLocaleDateString()}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </section>
                        </div>
                      </div>
                    )}
                  </Card>

                  {canManage && (
                    <div className="grid gap-6 xl:grid-cols-2">
                      <Card className="p-5">
                        <h2 className="font-serif text-lg">Billing / invoice discussion</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Demo request only. No payment is charged, no email is sent, and no
                          official invoice is created.
                        </p>
                        <form onSubmit={createBillingRequest} className="mt-4 space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Contact name" htmlFor="billing-name">
                              <Input
                                id="billing-name"
                                required
                                maxLength={120}
                                value={billingForm.contactName}
                                onChange={(event) =>
                                  setBillingForm({
                                    ...billingForm,
                                    contactName: event.target.value,
                                  })
                                }
                              />
                            </Field>
                            <Field label="Contact email" htmlFor="billing-email">
                              <Input
                                id="billing-email"
                                type="email"
                                required
                                value={billingForm.contactEmail || profile.data?.email || ""}
                                onChange={(event) =>
                                  setBillingForm({
                                    ...billingForm,
                                    contactEmail: event.target.value,
                                  })
                                }
                              />
                            </Field>
                          </div>
                          <Field
                            label="Estimated student seats"
                            htmlFor="seat-estimate"
                            hint="Planning estimate only; not a price or commitment."
                          >
                            <Input
                              id="seat-estimate"
                              type="number"
                              min={1}
                              max={500}
                              required
                              value={billingForm.seatEstimate}
                              onChange={(event) =>
                                setBillingForm({ ...billingForm, seatEstimate: event.target.value })
                              }
                            />
                          </Field>
                          <Field label="What would you like to discuss?" htmlFor="billing-message">
                            <Textarea
                              id="billing-message"
                              rows={3}
                              maxLength={2000}
                              value={billingForm.message}
                              onChange={(event) =>
                                setBillingForm({ ...billingForm, message: event.target.value })
                              }
                            />
                          </Field>
                          <Button type="submit" disabled={busy}>
                            {busy ? "Saving…" : "Save demo inquiry"}
                          </Button>
                        </form>
                      </Card>
                      <Card className="p-5">
                        <h2 className="font-serif text-lg">Saved demo inquiries</h2>
                        {billingRequests.length === 0 ? (
                          <p className="mt-2 text-sm text-muted-foreground">
                            No demo inquiries saved.
                          </p>
                        ) : (
                          <ul className="mt-3 space-y-3">
                            {billingRequests.map((request) => (
                              <li
                                key={request.request_id}
                                className="rounded-md border border-border p-3 text-sm"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <strong>{request.contact_name}</strong>
                                  <Badge>{request.request_status.replaceAll("_", " ")}</Badge>
                                </div>
                                <p className="mt-1 text-muted-foreground">
                                  {request.contact_email} · {request.seat_estimate} estimated seats
                                </p>
                                {request.message && <p className="mt-2">{request.message}</p>}
                                <p className="mt-2 text-xs text-muted-foreground">
                                  Saved {new Date(request.created_at).toLocaleDateString()} · not
                                  emailed or invoiced
                                </p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </Card>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
