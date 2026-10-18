import { supabase } from "@/integrations/supabase/client";

type RpcError = { message: string; code?: string };
type RpcInvoker = {
  rpc: (
    name: string,
    args?: Record<string, unknown>,
  ) => Promise<{ data: unknown; error: RpcError | null }>;
};

async function invoke<T>(name: string, args: Record<string, unknown> = {}): Promise<T> {
  const client = supabase as unknown as RpcInvoker;
  const { data, error } = await client.rpc(name, args);
  if (error) throw new Error(error.message);
  return data as T;
}

export type TeamKind = "adviser" | "university";
export type TeamRole = "owner" | "admin" | "member";
export type InviteType = "staff" | "student";

export type TeamOrganization = {
  organization_id: string;
  name: string;
  kind: TeamKind;
  member_role: TeamRole;
  created_at: string;
};

export type TeamMember = {
  user_id: string;
  email: string;
  display_name: string | null;
  member_role: TeamRole;
  joined_at: string;
};

export type TeamInvite = {
  invite_id: string;
  invitee_email: string;
  invite_type: InviteType;
  staff_role: "admin" | "member" | null;
  invite_status: "pending" | "accepted" | "expired" | "revoked";
  expires_at: string;
  accepted_at: string | null;
  created_at: string;
};

export type CreatedInvite = { invite_id: string; raw_token: string; expires_at: string };

export type InvitePreview = {
  organization_id: string;
  organization_name: string;
  organization_kind: TeamKind;
  invite_type: InviteType;
  staff_role: "admin" | "member" | null;
  invited_email: string;
  expires_at: string;
  consent_version: string | null;
  consent_purpose: string | null;
};

export type TeamStudent = {
  student_id: string;
  display_name: string;
  consent_at: string;
  programme_count: number;
  open_task_count: number;
  next_deadline: string | null;
};

export type TeamStudentWorkspace = {
  student_id: string;
  display_name: string;
  applications: {
    status: string;
    shortlisted: boolean;
    tier: string;
    programme_name: string | null;
    degree: string | null;
    university_name: string | null;
    country: string | null;
    intake: string | null;
  }[];
  open_tasks: { title: string; due_date: string | null }[];
  upcoming_deadlines: { label: string; due_date: string }[];
};

export type StudentTeamConsent = {
  access_id: string;
  organization_id: string;
  organization_name: string;
  organization_kind: TeamKind;
  consent_purpose: string;
  consent_at: string;
  revoked_at: string | null;
};

export type TeamBillingRequest = {
  request_id: string;
  contact_name: string;
  contact_email: string;
  seat_estimate: number;
  message: string;
  request_status: "demo_request_received";
  created_at: string;
};

export const teamApi = {
  listOrganizations: () => invoke<TeamOrganization[]>("list_my_team_organizations"),
  createOrganization: (name: string, kind: TeamKind) =>
    invoke<string>("create_team_organization", { p_name: name, p_kind: kind }),
  listMembers: (organizationId: string) =>
    invoke<TeamMember[]>("list_team_members", { p_organization_id: organizationId }),
  listInvites: (organizationId: string) =>
    invoke<TeamInvite[]>("list_team_invites", { p_organization_id: organizationId }),
  createInvite: (
    organizationId: string,
    email: string,
    type: InviteType,
    role: "admin" | "member" | null,
  ) =>
    invoke<CreatedInvite[]>("create_team_invite", {
      p_organization_id: organizationId,
      p_invitee_email: email,
      p_invite_type: type,
      p_staff_role: role,
    }),
  previewInvite: (token: string) =>
    invoke<InvitePreview>("preview_team_invite", { p_token: token }),
  acceptInvite: (token: string, studentConsent: boolean) =>
    invoke<{ organization_id: string; invite_type: InviteType; staff_role: string | null }>(
      "accept_team_invite",
      { p_token: token, p_student_consent: studentConsent },
    ),
  revokeInvite: (organizationId: string, inviteId: string) =>
    invoke<boolean>("revoke_team_invite", {
      p_organization_id: organizationId,
      p_invite_id: inviteId,
    }),
  removeMember: (organizationId: string, userId: string) =>
    invoke<boolean>("remove_team_member", { p_organization_id: organizationId, p_user_id: userId }),
  listStudents: (organizationId: string) =>
    invoke<TeamStudent[]>("list_team_students", { p_organization_id: organizationId }),
  getStudentWorkspace: (organizationId: string, studentId: string) =>
    invoke<TeamStudentWorkspace>("get_team_student_workspace", {
      p_organization_id: organizationId,
      p_student_id: studentId,
    }),
  listMyConsents: () => invoke<StudentTeamConsent[]>("list_my_team_consents"),
  revokeMyAccess: (accessId: string) =>
    invoke<boolean>("revoke_my_team_access", { p_access_id: accessId }),
  createBillingRequest: (
    organizationId: string,
    contactName: string,
    contactEmail: string,
    seatEstimate: number,
    message: string,
  ) =>
    invoke<string>("create_team_billing_request", {
      p_organization_id: organizationId,
      p_contact_name: contactName,
      p_contact_email: contactEmail,
      p_seat_estimate: seatEstimate,
      p_message: message,
    }),
  listBillingRequests: (organizationId: string) =>
    invoke<TeamBillingRequest[]>("list_team_billing_requests", {
      p_organization_id: organizationId,
    }),
  saveAdviserFeedback: (applicationId: string, comment: string) =>
    invoke<boolean>("save_adviser_feedback", {
      p_application_id: applicationId,
      p_comment: comment,
    }),
};
