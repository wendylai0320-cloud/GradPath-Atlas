# Team Pilot Outcomes

> **Deployment status (19 October 2026):** PR #3 is merged to `main` at `67b1f67f2eabe0d92164e119163222dc51bd7d46`. The additive migration has been applied to the intended Lovable Cloud database after approval. Read-only checks confirmed the five team tables have RLS, no direct client table grants, authenticated-only execution for the 16 team RPCs, and no client access to four private helper functions. Vercel checks succeeded and `/teams` and `/team-join` return HTTP 200. These are deployment/metadata checks, not proof that the invitation and consent journeys work end-to-end.
>
> **Acceptance rule:** Keep user-journey outcomes unchecked until tested with separate, email-confirmed adviser and student accounts. No production invitation or consent records were created during deployment verification.

## Organization workspaces and staff membership
- [ ] An authenticated, email-confirmed user can create an Adviser or University workspace; the creator becomes its owner.
- [ ] Each workspace has distinct owner, admin, and member roles. `profiles.role`, `profiles.plan`, email strings, and client-submitted IDs cannot grant organization permissions.
- [ ] Only workspace owners and admins can issue staff or student invitations. Staff invitations can assign only admin or member roles; they cannot create another owner.
- [ ] A user can see only workspaces and staff memberships in which their authenticated user ID has active membership.

## Secure invitations and student consent
- [ ] Staff and student invitations use a cryptographically strong, expiring, one-use link; only a token hash is stored in the database.
- [ ] An invitation can be accepted only by an authenticated account with a confirmed email matching the invitee; expired, invalid, revoked, already-used, and wrong-email invitations are rejected without revealing other users' data.
- [ ] Accepting a staff invitation creates only the specified staff membership. Creating a student invitation grants no student-data access; the student must affirmatively accept a clearly worded consent request.
- [ ] Consent purpose/version and timestamp are stored. A student can see active team access and revoke it; revocation prevents subsequent team reads but cannot recall information already viewed or copied. The team pilot does not grant file access.

## Read-only multi-student workspace and onboarding
- [ ] Onboarding lets an owner/admin name the workspace, invite colleagues, request student access, copy links, and see whether invitations are pending, accepted, expired, or revoked.
- [ ] Staff can see a multi-student summary only for students who accepted and have not revoked access; every detail RPC checks active membership and consent for the requested organization/student pair.
- [ ] Team review is read-only and returns only whitelisted planning data. It never returns document URLs/file paths or private notes, and staff cannot mutate student records through direct table access or team RPCs.
- [ ] Existing one-to-one student-to-adviser email sharing continues. New team access does not broaden that existing path or its write permissions.
- [ ] The broad existing adviser application UPDATE policy is replaced with a narrow feedback-only operation, so an adviser cannot change status, priority, shortlist, programme, owner, or other application fields through the feedback UI.
- [ ] Team invitation journeys survive sign-in/sign-up/email confirmation without allowing arbitrary redirect URLs.

## Billing request/demo flow
- [ ] An owner/admin can submit a billing or invoice inquiry for their workspace; the app stores contact and requested seat-count details with an uncharged demo status.
- [ ] The UI explicitly says the request is not sent to an accounting provider, no official invoice is issued, and no payment is charged.
- [ ] No browser-supplied amount, price, currency entitlement, payment status, or invoice status can grant paid access; real invoicing remains disabled until commercial terms and a provider are configured.

## Database authorization and delivery
- [x] The reviewed additive migration is applied to the correct Lovable Cloud project only after approval.
- [x] Read-only metadata confirms RLS on all five team tables, no direct client table grants, authenticated-only execution for the team RPCs, and no client access to private helper functions.
- [ ] Cross-organization, wrong-email, replay, expiry, pending-consent, revoked-consent, email-confirmation, and read-only cases are covered by functional/database authorization tests.
- [ ] Test and document the exact Vercel password-reset flow using a new email requested after the Lovable Auth allowlist was updated on 19 October 2026.
- [ ] The team pilot is described as operational only after the user-journey and negative authorization tests above pass; repository merge, route HTTP 200, and metadata checks alone are not sufficient.
