# Adviser / University Team Pilot — Implementation Plan

## Approved scope and constraints

Implement the safe first version in the existing TanStack Start + Supabase application while preserving the Vercel deployment target and current visual style. A workspace creator becomes `owner`; staff roles are `owner`, `admin`, and `member`. Staff and student invitations use email-bound, one-time links that expire after seven days. Students explicitly accept before any team access is granted and can revoke access later. Team review is read-only. Billing requests are stored for demo discussion only: no charge, email delivery, official invoice, or financial entitlement.

## Authorization and data model

Do not use `profiles.role`, `profiles.plan`, email strings, or client-submitted identifiers as authorization. Team permissions come from authenticated user IDs in membership rows and active student-consent rows. The current app permits broad profile updates, and its legacy adviser application-update policy is broader than the feedback UI requires; do not expand either behavior for teams.

The additive Supabase migration creates:

- organizations and owner/admin/member staff memberships;
- staff/student invitations with normalized invitee email, invite type, optional staff role, token hash only, expiry, acceptance, and revocation state;
- student/team consent records with stored purpose/version and accept/revoke timestamps;
- demo billing requests with contact, seat estimate, note, and fixed non-financial status.

Narrow authenticated RPCs create organizations, issue/list/revoke invitations, preview and accept invitations, remove permitted staff members, list teams/members, return consent-filtered student summaries, revoke student consent, and store/list demo billing inquiries. The database checks authenticated identity, confirmed email, email match, role, expiry, one-use state, organization membership, and current student consent. The client never receives token hashes or service-role credentials.

Team data is available only through authorization-checking RPCs requiring both active staff membership and active student consent. The allowlist includes display name, programme selections and shortlist/tier, application status, tasks, and deadlines; it excludes private notes, document links, and files. Revocation prevents future reads but cannot recall information already viewed or copied. The existing one-to-one student-to-adviser email-sharing path remains separate and unchanged by team membership. Its broad application update policy is replaced by a narrow feedback RPC used only for the feedback field.

## Frontend implementation

- `src/routes/_authenticated/teams.tsx`: create/select workspaces, list staff, create and revoke invitations, see invitation status, view accepted students’ read-only planning summaries, and record demo billing inquiries.
- `src/routes/team-join.tsx`: validate a one-time token, require an authenticated confirmed account with the invited email, display student-consent terms, and accept through the database RPC.
- `src/routes/auth.tsx`: preserve only a validated internal invitation token through sign-in, sign-up, and email confirmation; arbitrary redirect URLs are not accepted.
- `src/routes/_authenticated/settings.tsx`: show accepted team access and let the student revoke it.
- `src/routes/_authenticated/route.tsx`: add the Team workspace navigation item.
- `src/lib/team-api.ts`: typed client wrappers for the RPC contract; generated Supabase types remain untouched pending an authoritative schema refresh.
- `src/routes/pricing.tsx` and `src/lib/plans.ts`: describe the team pilot accurately and label prices/billing as illustrative and non-payment.
- `supabase/migrations/20261018183000_adviser_university_team_pilot.sql`: additive team schema, RPCs, least-privilege permissions, and feedback-policy hardening.

Invitations are shared manually; no email provider is assumed. Billing inquiries are stored in the app only and are not sent to an accounting provider.

## Validation and deployment constraints

Local verification: production build, TypeScript check, targeted ESLint, and automated tests. The SQL was syntax-parsed; it has not been executed against a PostgreSQL database. No authorized Supabase connector is currently enabled, and the migration has not been applied. Do not mutate the live database without explicit user approval. Before describing the feature as operational, apply the reviewed migration to the correct Lovable Cloud/Supabase project, verify its authorization behavior, and deploy the merged source through Vercel. Confirm Supabase’s allowed auth redirect URL includes the deployed `/auth` callback so invite sign-up survives email confirmation.
