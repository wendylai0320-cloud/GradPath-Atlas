# Team Pilot Outcomes

> **Current status:** Frontend and additive migration source are prepared on a feature branch. Local build, TypeScript, targeted lint, and automated tests pass. SQL syntax was parsed, but the migration has not been run against PostgreSQL, authorized, or deployed. Keep the outcomes below unchecked until database-level and production acceptance is demonstrated.

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
- [ ] New tables have least-privilege grants and RLS; authenticated clients cannot directly read invitation token hashes or write memberships/consents outside validated database functions.
- [ ] Cross-organization, wrong-email, replay, expiry, pending-consent, revoked-consent, email-confirmation, and read-only cases are covered by database-level authorization checks.
- [ ] The reviewed migration is applied to the correct Supabase project only after approval and before the feature is described as operational; repository merge alone is not treated as a database deployment.
