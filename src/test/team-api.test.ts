import { beforeEach, describe, expect, it, vi } from "vitest";

const { rpcMock } = vi.hoisted(() => ({ rpcMock: vi.fn() }));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: { rpc: rpcMock },
}));

import { teamApi } from "@/lib/team-api";

describe("teamApi", () => {
  beforeEach(() => rpcMock.mockReset());

  it("calls the team-list RPC without client-supplied identity", async () => {
    const rows = [
      {
        organization_id: "org-1",
        name: "Advisers",
        kind: "adviser",
        member_role: "owner",
        created_at: "2026-10-18T00:00:00Z",
      },
    ];
    rpcMock.mockResolvedValue({ data: rows, error: null });

    await expect(teamApi.listOrganizations()).resolves.toEqual(rows);
    expect(rpcMock).toHaveBeenCalledWith("list_my_team_organizations", {});
  });

  it("sends only the requested invite fields to the database function", async () => {
    const created = [
      { invite_id: "invite-1", raw_token: "a".repeat(64), expires_at: "2026-10-25T00:00:00Z" },
    ];
    rpcMock.mockResolvedValue({ data: created, error: null });

    await expect(
      teamApi.createInvite("org-1", "student@example.edu", "student", null),
    ).resolves.toEqual(created);
    expect(rpcMock).toHaveBeenCalledWith("create_team_invite", {
      p_organization_id: "org-1",
      p_invitee_email: "student@example.edu",
      p_invite_type: "student",
      p_staff_role: null,
    });
  });

  it("does not suppress database authorization errors", async () => {
    rpcMock.mockResolvedValue({
      data: null,
      error: { message: "You are not a member of this workspace." },
    });

    await expect(teamApi.listStudents("another-org")).rejects.toThrow(
      "You are not a member of this workspace.",
    );
  });
});
