# GradPath Atlas — Product Requirements Document

**Status:** Vercel-hosted prototype; assignment target architecture and production readiness remain subject to the decisions below
**Version:** 2.1
**Date:** 18 October 2026
**Codebase context:** `@codebase.md`, generated in this repository with `npx ai-digest`

## 0. Codebase Digest and Evidence Boundary

The digest was generated from the exact repository `wendylai0320-cloud/GradPath-Atlas`. It contains the project source and configuration (110 files included by `ai-digest`), including the TanStack routes, Supabase migrations, tests, design tokens, and product components. The digest is a source snapshot, not proof that every feature is production-ready. It excludes `.env` under the tool's default ignore rules.

### Observed implementation

The current repository is a **TanStack Start v1 / React 19 / Vite 8** app using TypeScript, Tailwind CSS v4, TanStack Router and React Query, Supabase Auth/PostgreSQL/Row-Level Security/private Storage, and a Lovable Cloud auth dependency. Its routes and source implement a public landing page and pricing page; email/password authentication and password reset; an authenticated dashboard; programme comparison and programme detail; tasks; deadlines with calendar/timeline and `.ics` export; document vault and application-document links; strategy summary; adviser view; settings; CSV exports; demo catalogue; and test-only plan switching. The Google sign-in button and handler have been removed from the Vercel auth page; this documents the UI change and does not claim that the backend Google provider was disabled. A Supabase migration defines UUID-backed entities and RLS policies. The codebase includes routing tests and a `npm run build`, `npm run lint`, and `npm test` script.

### Production spot check (18 October 2026)

The public Vercel deployment at `https://grad-path-atlas.vercel.app/` was checked on 18 October 2026. Its homepage presents the planning value proposition, pricing/sign-in/start-planning navigation, a fictional demo-programme comparison, four feature summaries (compare, track deadlines, reuse documents, share with an adviser), a four-step workflow, and an admissions-outcome disclaimer. The public `/auth?mode=signup` page presents name, email, and password fields; Google sign-in is no longer offered in the Vercel UI. This was a page-level spot check only, not a full end-to-end, security, accessibility, or uptime audit. Mark payment fulfillment, production data accuracy, WCAG conformance, and privacy operations as unverified unless separately tested.

### Architecture decision — required before implementation planning

The assignment's mandated target stack is **Next.js App Router, TypeScript, Tailwind CSS, Drizzle ORM, Neon PostgreSQL, Clerk Auth, Stripe Checkout, ImageKit, and Gemini API**. The existing repository does **not** currently use Next.js, Drizzle, Neon, or Clerk; it uses TanStack Start and Supabase. Therefore:

- This PRD records the current prototype accurately and specifies the assignment-mandated stack as the **target architecture**.
- Moving to the target stack is a re-platform/migration, not a small extension. It requires route/component migration, identity migration, schema/data migration, RLS redesign, storage migration, and regression testing.
- Before implementation begins, the product owner/professor must confirm whether to (A) migrate the prototype to the mandated target stack or (B) amend the stack constraint and continue with TanStack Start/Supabase. Unless amended, this PRD assumes **A** for production implementation.
- No statement below should be read as claiming that the target stack or real payment processing is already present in the repository.

## 1. Executive Summary

### Product and value proposition

GradPath Atlas helps final-year students compare master's programmes and track applications from initial shortlist to submission. It brings programme requirements, costs, deadlines, tasks, reusable documents, and application progress into one planning workspace. The product supports students directly and creates a path for adviser and university licensing.

> Compare master's programmes and manage every application deadline, requirement, and next action in one clear workspace.

GradPath Atlas is an organizational and planning product. It does not predict admission outcomes, guarantee acceptance, or replace official university information. Applicants must verify requirements and dates with the institution.

### Target personas

| Persona | Needs and expected value |
| --- | --- |
| Final-year master's applicant | Compare requirements and cost, shortlist programmes, manage application tasks and deadlines, and prepare reusable documents |
| Careers-service adviser | Review only explicitly shared student progress and provide timely guidance |
| Independent education adviser | Support one or more applicants with authorized visibility while preserving student ownership and privacy |
| University partner | License the service for applicant support and, later, provide verified programme information or cohort services |

### Revenue model

- **Applicant:** One-off application-season pass. It unlocks the paid features specified for one application season; the season duration, price, currency, tax treatment, and refund policy must be configured and approved before launch.
- **Advisers and universities:** Licences for adviser/university use. Phase 1 may describe the offer and capture an inquiry or contact request; multi-tenant accounts, seat provisioning, institution administration, and invoice workflows are deferred to Phase 2 unless explicitly selected for launch.
- The current prototype pricing page offers plan cards with currency selection, while plan switching is explicitly a test flow and takes no payment. Existing displayed prices are prototype data, not approved commercial terms.

### Success measures

Measure workspace activation, programmes added, application/deadline/task completion, document readiness, export use, season-pass checkout completion, and support incidents. Set targets, retention windows, analytics consent, and data minimization rules before instrumenting analytics. Do not infer admission success or use it as a product KPI.

## 2. Scope Isolation

### Phase 1 — Core MVP / working launch

The launch must provide the smallest reliable end-to-end application-planning service:

1. Public product and pricing pages that explain the value proposition, fictional demo-data status, plan limitations, and non-prediction disclaimer.
2. Secure account creation, sign-in, sign-out, and password recovery.
3. A private student workspace with programme shortlist, programme comparison, application status, programme requirements, deadlines, and tasks.
4. Editable programme/application records, including institution, programme, location, degree/subject, tuition and currency, key requirements, official source URL, and source-verification date where available.
5. Deadline timeline/calendar and user-managed task checklist with reliable date handling.
6. Document metadata and secure private document storage, with document type/status and links to one or more applications. File type, size, access, retention, and deletion must be enforced.
7. Basic adviser sharing only if it is already included in the accepted launch scope: the student explicitly authorizes a named adviser; the adviser receives least-privilege, read-only access and can revoke it. Two-way comment threads remain deferred.
8. One-off application-season pass payment through Stripe Checkout, if the paid pass is sold at launch. Create Checkout Sessions server-side and grant paid entitlement only from verified, idempotently processed Stripe webhooks. If checkout is not ready, clearly keep the product in test/no-payment mode and do not imply a completed purchase.
9. Applicant data export and account/data deletion request path.
10. Responsive accessible UI, error/empty/loading states, server-side validation and authorization, RLS, automated tests, build/lint/type checks, backups, and basic operational monitoring.

**Prototype features evidenced in the repository:** landing/pricing, auth, programme comparison and detail, catalogue-backed/custom programme entry, deadline timeline/calendar and `.ics` export, document vault, tasks, strategy summary, adviser view, settings, CSV export, and test-mode plan switching. Their presence in code is not a substitute for release QA or a real payment integration.

**Phase 1 exclusions:** AI admissions advice or admission prediction, automated email reminders, live foreign-exchange feeds, adviser comment threads, organization/team management, multi-tenant university dashboards, usage-credit analytics, advanced cohort analytics, and complex billing administration.

### Phase 2 — Post-launch expansion

Defer until Phase 1 usage, privacy, and support needs are validated:

- Adviser conversations and threaded comments; organization accounts, multiple team seats, role administration, and multi-tenant student portfolios.
- University licensing operations, institutional programme editing/verification, cohort analytics, and invoice/seat administration.
- Usage-credit analytics, team-level usage reporting, and advanced product analytics.
- Deadline email/push reminders and calendar synchronization beyond the current export.
- Live currency rates with source, timestamp, and clear indicative-only display.
- Gemini-assisted programme summaries or checklist drafting, only with user initiation, clear AI labeling, privacy review, and no admission prediction.
- ImageKit-managed public/media assets if needed. Private application documents remain behind private authorization and must not be exposed through public image URLs.
- Additional billing lifecycle features such as refunds, disputes, invoices, and customer self-service plan management.

## 3. Architecture and UI Layout

### Target architecture (assignment constraints)

- **Next.js App Router** with server-first rendering; client components only where interaction requires browser state.
- **TypeScript** in strict mode; **Tailwind CSS** for styling and design tokens.
- **Drizzle ORM** for typed schema and reviewed/versioned migrations.
- **Neon PostgreSQL** as the relational data store.
- **Clerk Auth** for authentication; map the verified Clerk subject to an internal user UUID on the server.
- **Stripe Checkout** for the one-off season pass; signed webhook processing is the entitlement source of truth.
- **ImageKit** for approved image/media delivery. It is not a public bucket for private student documents.
- **Gemini API** for deferred, opt-in assistance only. Keep API calls server-side and do not send personal documents or notes without a justified purpose and user-facing disclosure.

### Current prototype architecture (digest evidence)

The checked-in implementation instead uses TanStack Start/Router, React 19, Vite, TanStack Query, Supabase JS/Auth/PostgreSQL/RLS/Storage, and includes a Lovable Cloud auth dependency. The Vercel auth page currently exposes email/password authentication only; Google sign-in was removed from the UI because its OAuth handoff returned a 404 on Vercel. Tailwind v4 and custom components provide the visual system. This current architecture is the source of truth for existing implementation; the preceding target list is the requested future stack. Migration mapping must be planned after the architecture decision in Section 0.

### Route and page layout

The current prototype route paths below are derived from the TanStack route tree. The same user-facing paths should be preserved in Next.js App Router unless a usability or technical review approves a change.

| Route | Access | Purpose and key UI |
| --- | --- | --- |
| `/` | Public | Hero and planning value proposition, fictional programme-comparison preview, four feature summaries, four-step workflow, signup/pricing CTAs, and admissions disclaimer |
| `/pricing` | Public | Plan comparison, currency selector, price/feature summary, pass CTA, and clear note if checkout remains test-only |
| `/auth?mode=signup` | Public | Name/email/password account creation; email/password sign-in and duplicate-account handling. Google sign-in is not offered in the current Vercel UI. |
| `/reset-password` | Public | Password reset flow |
| `/dashboard` | Authenticated | Upcoming deadlines, readiness/progress, outstanding work, add-programme action |
| `/compare` | Authenticated | Responsive programme comparison matrix, filters/notes, currency display, CSV export |
| `/programmes/[id]` | Authenticated | Programme requirements, status/priority, readiness and applicant notes |
| `/deadlines` | Authenticated | Calendar/timeline, urgency cues, `.ics` export |
| `/documents` | Authenticated | Private document vault, type/status, application links, requirement checklist |
| `/tasks` | Authenticated | Application to-do list and due dates |
| `/summary` | Authenticated | Reach/Target/Safety planning summary; informational only, not an outcome predictor |
| `/adviser` | Authenticated / explicitly authorized | Student sharing controls or adviser read view, depending on role |
| `/settings` | Authenticated | Academic profile, GPA scale, intake, currency, privacy and plan status |
| `/api/stripe/checkout` | Server endpoint | Authenticated, server-validated one-off Checkout Session creation |
| `/api/webhooks/stripe` | Server endpoint | Signature verification, idempotent payment and entitlement updates |

In the target Next.js App Router implementation, route files live under `app/` (for example, `app/compare/page.tsx`, `app/api/stripe/checkout/route.ts`, and `app/api/webhooks/stripe/route.ts`). Private page authorization must happen on the server; hiding navigation items is not access control.

### Primary applicant journey

1. Discover the product and its limits on the landing page; review fictional/demo notice.
2. Create an account or sign in; confirm email if configured.
3. Add programmes from the catalogue or manually; verify institution requirements and deadlines against official sources.
4. Compare the shortlist and mark each application’s status, priority, and Reach/Target/Safety planning tier.
5. Track application deadlines, tasks, and required documents from the dashboard and detail pages.
6. Upload and securely link reusable documents where enabled; review readiness indicators.
7. Optionally share progress with a named adviser under explicit read-only permission.
8. Purchase the season pass through Stripe Checkout; access changes only after verified webhook confirmation.
9. Export data or request account deletion when needed.

### Key UI components

- **Hero:** concise promise, “Start planning” primary CTA, “See plans” secondary CTA, and “does not predict admission outcomes” disclaimer.
- **Comparison matrix:** accessible table, mobile card fallback, requirement and tuition comparison, original currency plus indicative conversion, source/verification details, and clear fictional demo labels.
- **Workspace dashboard:** next deadlines, application status, readiness, outstanding tasks, and empty-state onboarding.
- **Deadline hub:** timeline/calendar switch, readable status beyond color, download calendar action.
- **Document vault:** private upload entry, type/status selector, application/programme linking, and missing requirement checklist.
- **Pricing table:** one-off pass terms and clearly separated adviser/university licensing; do not imply test-mode plan changes are purchases.
- **Forms and system feedback:** associated labels/errors, pending/success/error states, confirmation before destructive changes, and keyboard operability.

## 4. Technical Stack Constraints and Migration Requirements

### Required target technologies

The production-target implementation must use Next.js App Router, TypeScript, Tailwind CSS, Drizzle ORM, Neon PostgreSQL, Clerk Auth, Stripe Checkout, ImageKit, and Gemini API, subject to the Phase 2 deferral for Gemini/ImageKit features. Stripe is required for a real paid pass. Tailwind is already present in the prototype but is currently integrated through Vite/TanStack configuration.

### Migration plan and guardrails

- Inventory the existing routes, UI components, Supabase auth flows, data access, storage paths, migrations, and RLS policies from `@codebase.md` before re-platforming.
- Preserve public route URLs and core user flows to limit regressions.
- Define and test a Clerk-user-to-internal-UUID mapping before importing user-owned records.
- Translate Supabase policies based on `auth.uid()` into explicit Neon PostgreSQL RLS policies using a server-verified, transaction-local user context; connection pooling must not leak identity.
- Migrate database schema and data with checksums/counts, referential integrity validation, rollback plan, and a test environment. Keep private document objects private during any storage migration.
- Never run production migrations or mass account/document changes without a backup, tested recovery path, and planned cutover.
- If the professor permits the current stack, record the exception and update the target-stack requirement rather than maintaining contradictory documentation.

## 5. Database and Authentication Schema

The target data model should preserve the prototype's entities while adding explicit privacy/consent, payment, and entitlement records. Use PostgreSQL `uuid` primary keys generated by `gen_random_uuid()` or the equivalent application UUID generator; `timestamptz` for instants; `date` for calendar deadlines; numeric types for money; foreign keys and indexes; and migration-controlled schema changes. `updated_at` is required where records are mutable.

### Core tables

| Table | Essential columns and relationships |
| --- | --- |
| `users` | `id uuid PK`; `clerk_user_id text UNIQUE NOT NULL`; `email text NOT NULL`; `created_at`, `updated_at timestamptz`. Internal user identity is distinct from Clerk's provider subject. |
| `profiles` | `id uuid PK/FK users.id ON DELETE CASCADE`; `display_name text`; `role text`; `plan text`; `gpa numeric NULL`; `gpa_scale text`; `target_intake text`; `currency char(3)`; timestamps. |
| `universities` | `id uuid PK`; `owner_id uuid NULL FK users.id ON DELETE CASCADE`; `name text`; `country text`; `city text`; `website text NULL`; timestamps. `owner_id IS NULL` identifies curated/shared catalogue rows. |
| `programmes` | `id uuid PK`; `university_id uuid FK universities.id ON DELETE CASCADE`; `owner_id uuid NULL FK users.id ON DELETE CASCADE`; `name`, `degree`, `intake`, `study_mode`, `english_test`, `summary text`; `duration_months int`; `tuition numeric(12,2)`; `currency char(3)`; `application_fee numeric(12,2)`; `min_gpa numeric NULL`; `references_required int`; `portfolio_required boolean`; `interview boolean`; timestamps. |
| `requirements` | `id uuid PK`; `programme_id uuid FK programmes.id ON DELETE CASCADE`; `owner_id uuid NULL FK users.id ON DELETE CASCADE`; `label`, `detail text`; `doc_type text NULL`; timestamps. |
| `deadlines` | `id uuid PK`; `programme_id uuid NULL FK programmes.id ON DELETE CASCADE`; `owner_id uuid FK users.id ON DELETE CASCADE`; `label text`; `due_date date`; timestamps. Null programme denotes personal milestone only where supported by the product. |
| `applications` | `id uuid PK`; `user_id uuid FK users.id ON DELETE CASCADE`; `programme_id uuid FK programmes.id ON DELETE CASCADE`; `status text`; `priority smallint`; `shortlisted boolean`; `tier text NULL` constrained to Reach/Target/Safety; `adviser_comment text` only if approved; timestamps. Unique (`user_id`, `programme_id`) in the current one-round model. |
| `status_records` | `id uuid PK`; `application_id uuid FK applications.id ON DELETE CASCADE`; `user_id uuid FK users.id ON DELETE CASCADE`; `status text`; `created_at timestamptz`. Append-only status history. |
| `documents` | `id uuid PK`; `user_id uuid FK users.id ON DELETE CASCADE`; `title`, `doc_type`, `status`, `file_name`, `storage_key text`; `notes text`; timestamps. Never store raw files in a public bucket or expose private keys. |
| `application_documents` | Composite PK (`application_id uuid FK applications.id ON DELETE CASCADE`, `document_id uuid FK documents.id ON DELETE CASCADE`); `user_id uuid FK users.id ON DELETE CASCADE`; `created_at timestamptz`. Verify both related records belong to the same user. |
| `tasks` | `id uuid PK`; `user_id uuid FK users.id ON DELETE CASCADE`; `application_id uuid NULL FK applications.id ON DELETE CASCADE`; `title text`; `due_date date NULL`; `done boolean`; timestamps. |
| `notes` | `id uuid PK`; `user_id uuid FK users.id ON DELETE CASCADE`; `application_id uuid FK applications.id ON DELETE CASCADE`; `body text`; `created_at timestamptz`. |
| `adviser_links` | `id uuid PK`; `student_id uuid FK users.id ON DELETE CASCADE`; `adviser_user_id uuid NULL FK users.id ON DELETE CASCADE` or verified invited email during invitation; `created_at timestamptz`; unique student/adviser relationship. Grant only explicit, revocable access. |
| `consent_records` | `id uuid PK`; `user_id uuid FK users.id ON DELETE CASCADE` subject to lawful audit-retention review; `purpose text`; `policy_version text`; `consented boolean`; `consented_at timestamptz NULL`; `withdrawn_at timestamptz NULL`; timestamps. |
| `billing_events` | `id uuid PK`; `user_id uuid FK users.id ON DELETE RESTRICT` or a legally reviewed minimized reference; `stripe_event_id text UNIQUE`; `checkout_session_id text UNIQUE NULL`; `event_type text`; `payment_status text`; `amount_total bigint NULL` in minor units; `currency char(3) NULL`; `processed_at timestamptz NULL`; `created_at timestamptz`. No card data. |
| `entitlements` | `id uuid PK`; `user_id uuid FK users.id ON DELETE CASCADE`; `billing_event_id uuid FK billing_events.id ON DELETE RESTRICT`; `entitlement_type text`; `starts_at`, `ends_at timestamptz`; `created_at timestamptz`. Grant only after verified successful payment. |

### Referential integrity and indexes

Use `ON DELETE CASCADE` for genuinely user-owned profile, programme, application, task, document, note, and join data where deletion is intended. Retain billing/audit evidence only where legally required and document the exception; do not blindly cascade-delete financial evidence. Programme deletion must not unexpectedly delete unrelated shared catalogue data. Add indexes on owner/user FKs, application/programme FKs, deadline/task dates, and status. Enforce enum/check constraints and ensure an application cannot reference another user's private programme. Where multiple application rounds are supported, add an explicit intake/round key and revise uniqueness.

### Authentication and Row-Level Security

Clerk authenticates the request; it does not by itself protect Neon rows. Resolve the verified Clerk subject to `users.id` on the server. All application queries and mutations must be owner-scoped. Enable PostgreSQL RLS on user-owned tables. A trusted server transaction may set a transaction-local `app.user_id` after Clerk verification; policies compare `user_id` with `current_setting('app.user_id', true)::uuid`, default-denying if missing or invalid. The `users`/`profiles` policies compare their own user UUID. Do not trust a client-supplied user ID.

Use a restricted application database role that is not superuser, table owner with RLS bypass, or `BYPASSRLS` role. Keep migration/admin credentials separate. Ensure `SET LOCAL` identity is scoped to one transaction when pooled connections are used. Shared catalogue rows may be readable to authenticated users, but writes remain owner/admin controlled. Adviser access must be mediated by a verified relationship and narrowly scoped `SELECT` policy; comment writes, if introduced later, must use a separate permission. Test isolation with two users, an adviser, anonymous access, and missing identity context.

The current Supabase policies use `auth.uid()` and `is_adviser_for()`; they are evidence of existing prototype behavior but are not directly portable to Neon. Re-implement and test their intended semantics during migration.

## 6. Third-Party APIs, Environment Keys, and Payment Boundaries

### Required target environment variables

Use `.env.example` with names and placeholder values only. The following are server-only unless explicitly named `NEXT_PUBLIC_`; never put secret values in source, screenshots, digest files, client bundles, logs, or Git history.

```dotenv
# Application and target database
NEXT_PUBLIC_APP_URL=
DATABASE_URL=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_SEASON_PASS=

# ImageKit — only if/when feature is enabled
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=

# Gemini — optional, server-side, deferred
GEMINI_API_KEY=
```

Validate required configuration at server startup or route entry. Fail safely without printing secret values. Use separate credentials per environment, TLS database connections, rotation procedures, and allowlisted checkout return origins. `NEXT_PUBLIC_*` variables are considered public and must never contain secrets.

The current prototype uses Supabase/Lovable configuration, including `VITE_SUPABASE_URL` and a publishable key. These are current-stack settings, not the target environment contract. The target migration must replace them with Clerk/Neon credentials only after the corresponding service setup and data migration are ready.

### Stripe Checkout and webhook flow

1. User must be signed in and select the server-configured one-time pass product.
2. The server validates Clerk identity and eligibility; it chooses `STRIPE_PRICE_SEASON_PASS`. Never accept amount, price ID, currency, user ownership, or entitlement duration from the browser.
3. Create a Stripe Checkout Session with server-controlled user metadata/client reference and allowlisted success/cancel URLs.
4. Redirect the browser to Stripe-hosted checkout. GradPath Atlas never receives or stores payment-card details.
5. Treat the success URL as a display redirect only. Grant no paid access from the redirect.
6. `/api/webhooks/stripe` verifies the signature against the raw request body using `STRIPE_WEBHOOK_SECRET` before processing.
7. Persist the unique Stripe event ID and update billing/entitlement state transactionally. Duplicate deliveries must be idempotent. Handle delayed payment status, expiration, refunds, disputes, and out-of-order events.
8. Grant an entitlement only after a verified successful payment event. Reconcile with Stripe if events fail or arrive out of order.
9. Do not represent the existing prototype's “Switch (test)” action as real checkout or successful payment.

### Other providers

- **Clerk:** Verify provider webhooks if used; minimize copied identity data.
- **Neon:** TLS, least privilege, pooled connection/RLS context safety, and tested backups.
- **ImageKit:** User uploads remain behind private authorization; use short-lived signed upload authorization if enabled. ImageKit should serve only approved media, not public application-document URLs.
- **Gemini:** Deferred by default; server-side only; user initiated, purpose limited, clearly labeled; do not send identifiable documents, grades, or private notes without explicit product/legal approval and data minimization. Never generate admissions predictions.

## 7. Compliance, Privacy, Accessibility, and Security

### WCAG 2.2 Level AA

- Normal body text contrast is at least **4.5:1**. Large text and UI/non-text contrast must meet the applicable WCAG 2.2 AA criteria.
- Keyboard focus is always visible. Focus treatment uses at least **`outline: 2px solid`** with sufficient contrast and is not removed without an equivalent.
- Provide semantic landmarks, heading order, form labels, programmatic error associations, accessible names, table captions/headers, and screen-reader status messages.
- All core flows work by keyboard and screen reader; no keyboard trap; logical focus order and focus return after dialogs.
- Do not encode status using color alone. Support zoom/reflow, reduced motion, responsive comparison views, and adequately sized touch targets.
- Acceptance requires automated scans plus manual keyboard and screen-reader review. The prototype's current visual styling is not evidence that AA conformance is complete.

### GDPR and Hong Kong PDPO

Obtain qualified privacy/legal review for launch regions, controller/processor roles, lawful bases, international transfers, retention periods, and applicable notices. This PRD is a product requirement, not legal advice.

- Provide an accessible **Privacy Information Collection Statement (PICS)** at or before collection, stating purpose, data classes, whether supply is voluntary/required and consequences, recipients, retention approach, and access/correction contact/process as applicable under Hong Kong PDPO.
- Provide GDPR transparency information where GDPR applies, including controller, purposes, lawful bases, recipients/processors, retention, rights, complaint route, transfer information, and relevant automated processing disclosures.
- Collect only data needed for programme comparison and application planning. Do not collect sensitive data without an approved necessity and lawful basis.
- Record consent purpose, policy version, and **consent timestamp** when consent is the basis or a choice is required. Optional analytics/marketing consent is separate, granular, withdrawable, and off by default where required; do not conflate service terms with optional consent.
- Provide access, correction, export, deletion, and consent withdrawal paths; define identity verification and response SLAs operationally.
- Define retention for application records, documents, consent evidence, security logs, and financial records. Account deletion should erase/anonymize data when permitted and explain any lawful retention exception.
- Disclose processors and cross-border transfers; execute required processor agreements and assess safeguards. Restrict administrative access and audit privileged access.
- Disclose that catalogue records in the prototype are fictional demonstration data; require official-source verification for real programme data. State the product does not predict admission outcomes.

### Security and secret handling

- **Zero hardcoded secret keys:** no service secret, password, private token, or credential in application source, tests, Markdown, `codebase.md`, client bundles, or logs.
- Keep `.env.local` and private environment files out of Git; commit only `.env.example` with placeholders. Audit repository history for accidentally committed secrets; rotate any actual secret that has been exposed. A publishable/client key is not a substitute for server-side authorization.
- Note for maintainers: the current public repository has a tracked `.env` containing Supabase URL/project and publishable-key variable names. The digest excluded `.env`, and this PRD does not reproduce its values. Confirm that the tracked values are public-only configuration; remove/ignore local environment files and rotate any value that is a secret.
- Enforce server-side auth/authorization on all private routes/actions and database operations; use Drizzle parameterized queries and runtime validation.
- Protect against XSS, injection, CSRF, open redirects, brute force, insecure direct object references, and unsafe file uploads. Use secure cookies, HTTPS, security headers, and rate limits.
- Verify webhook signatures, use idempotency controls, and keep Stripe secret keys server-only. Do not store card data.
- Use RLS, least-privilege roles, database constraints, secure backups, dependency scanning, and a reviewed migration/recovery plan.
- Avoid personal data and secrets in telemetry, URLs, and error messages. Log security-relevant events with minimized identifiers and a documented retention period.

## 8. Acceptance Criteria and Release Gates

Phase 1 is ready for production only when:

1. A student can authenticate, create a shortlist, compare programmes, track status/deadlines/tasks, and access linked documents without data loss on reload.
2. CRUD and ownership checks work across anonymous, student, and explicitly linked adviser contexts; cross-user access tests are denied.
3. Demo catalogue data is labeled fictional; real programme requirements provide a source/verification path or an explicit unverified state.
4. If charging for the pass, Stripe test-mode and production flows are distinct, webhook signature/idempotency tests pass, and verified successful payment alone grants access. Otherwise pricing clearly states there is no payment yet.
5. Build, type-check, lint, migration validation, and automated tests pass; direct route loads and refreshes work for all public and authenticated routes.
6. WCAG 2.2 AA review verifies the contrast threshold, visible 2px focus outline, keyboard operation, and screen-reader labeling.
7. PICS/privacy notices, consent timestamps where applicable, access/export/deletion processes, retention schedule, and processor/transfer review are complete for launch jurisdictions.
8. No secret is committed or exposed; production `.env.local` is not tracked; server secrets are managed outside the browser.
9. Application document access is private and authorized; signed URLs expire; file type/size and deletion behavior are tested.
10. The stack decision in Section 0 is resolved and the implementation documentation, migrations, and deployment config match the selected architecture.

## 9. Open Product and Architecture Decisions

- Approve migration to the required Next.js/Drizzle/Neon/Clerk target stack, or formally amend the constraint to retain the working TanStack/Supabase prototype.
- Confirm application-season pass duration, price per supported currency, tax display, refund policy, entitlement expiry, and launch timing.
- Confirm whether real Stripe checkout is required for launch or whether the product remains demonstrably test-only for the assignment.
- Confirm adviser/university licence terms, seats, pricing, sales/contact flow, and whether an adviser can ever comment or edit student data.
- Confirm programme catalogue governance, authoritative sources, verification intervals, and treatment of changing deadlines/currency rates.
- Confirm whether multiple rounds per programme are required in the initial schema.
- Confirm launch jurisdictions, minimum user age, data retention/deletion policy, and privacy counsel review.
- Confirm whether Gemini and ImageKit have an approved Phase 2 use case; neither is needed to launch the core planner.
