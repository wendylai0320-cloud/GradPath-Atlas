# GradPath Atlas — Phase 1 Task List

**Execution plan:** Sequential, Phase 1 only
**Source:** `PRD.md` and `@codebase.md`
**Architecture assumption:** The assignment mandates Next.js App Router, TypeScript, Tailwind CSS, Drizzle ORM, Neon PostgreSQL, Clerk Auth, Stripe Checkout, ImageKit, and Gemini API. The current prototype uses TanStack Start and Supabase. This plan assumes the required-stack migration is approved; do not treat the prototype stack as the target.

> Complete modules in order. Do not start the next module until the current module’s verification gate passes. Run database commands only against a development database. Never print or commit secret values.

## Module 1: Environment & Secret Key Setup (.env.local)

### Repository and runtime
- [x] Confirm the working repository is `wendylai0320-cloud/GradPath-Atlas` (verified: Git origin and GitHub repository name match).
- [x] Create a migration branch for the Next.js and Neon implementation (verified: active branch is `migration/nextjs-neon`).
- [x] Confirm the supported Node.js version and record it in `.nvmrc` or the project’s runtime configuration (verified: `.nvmrc` pins Node.js `24.21.0`, an LTS release compatible with the documented Next.js minimum).
- [ ] Confirm the package manager and lockfile strategy.
- [ ] Scaffold or migrate the application to Next.js App Router.
- [ ] Confirm the application starts with `npm run dev` on port `3000`.
- [ ] Add or verify `.env.local` in `.gitignore`.
- [ ] Add `.env.example` containing variable names and placeholder values only.
- [ ] Do not copy secret values into `.env.example`, Markdown, tests, screenshots, or logs.
- [ ] Inspect tracked environment files locally without printing their values.
- [ ] Remove local environment files from Git tracking where appropriate.
- [ ] Rotate any actual secret discovered in Git history or an exposed environment file.

### Environment variable names
- [ ] Add `NEXT_PUBLIC_APP_URL` to `.env.example`.
- [ ] Add `DATABASE_URL` to `.env.example`.
- [ ] Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` to `.env.example`.
- [ ] Add `CLERK_SECRET_KEY` to `.env.example`.
- [ ] Add `CLERK_WEBHOOK_SECRET` to `.env.example`.
- [ ] Add `STRIPE_SECRET_KEY` to `.env.example`.
- [ ] Add `STRIPE_WEBHOOK_SECRET` to `.env.example`.
- [ ] Add `STRIPE_PRICE_SEASON_PASS` to `.env.example`.
- [ ] Add `NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT` to `.env.example`.
- [ ] Add `IMAGEKIT_PUBLIC_KEY` to `.env.example`.
- [ ] Add `IMAGEKIT_PRIVATE_KEY` to `.env.example`.
- [ ] Keep all server secrets out of variables prefixed with `NEXT_PUBLIC_`.
- [ ] Add server-side startup validation for required environment variables.
- [ ] Make missing-variable errors identify the variable name without revealing its value.

#### Verification Gate — Module 1
- [ ] Run `git check-ignore .env.local` and confirm the local environment file is ignored.
- [ ] Confirm `.env.example` contains placeholders only.
- [ ] Confirm no secret values are tracked by Git or included in source files.
- [ ] Run `npm run build` and confirm zero TypeScript or routing compilation errors.
- [ ] Run `npm run dev` and confirm the app renders at `http://localhost:3000`.
- [ ] Check the browser console and confirm there are no startup errors.

## Module 2: Database Schema & ORM Provisioning (Drizzle/PostgreSQL)

### Database and Drizzle setup
- [ ] Provision a Neon PostgreSQL development database.
- [ ] Store the development connection string in local `.env.local`.
- [ ] Install Drizzle ORM and Drizzle Kit.
- [ ] Add a Drizzle configuration file that reads `DATABASE_URL` server-side.
- [ ] Create a typed database client that is unavailable to browser bundles.
- [ ] Create a migrations directory and document how to generate migrations.
- [ ] Use PostgreSQL UUID primary keys for application entities.
- [ ] Use `timestamptz` for timestamps and `date` for calendar deadlines.
- [ ] Use `numeric` types for currency amounts rather than floating-point types.

### Phase 1 tables
- [ ] Define `users` with UUID primary key and unique Clerk subject.
- [ ] Define `profiles` with a cascading foreign key to `users`.
- [ ] Define `universities` with nullable owner ID for shared catalogue entries.
- [ ] Define `programmes` with institution, requirements, tuition, currency, and official source fields.
- [ ] Define `requirements` with a cascading programme foreign key.
- [ ] Define `deadlines` with a date field and optional programme relationship.
- [ ] Define `applications` with user, programme, status, priority, and shortlist fields.
- [ ] Add the application uniqueness constraint for the selected application-round model.
- [ ] Define `status_records` for application status history.
- [ ] Define `documents` with private storage key and document metadata only.
- [ ] Define `application_documents` as a user-owned application/document junction table.
- [ ] Define `tasks` with optional application link, due date, and completion state.
- [ ] Define `notes` with cascading application and user relationships.
- [ ] Define `adviser_links` with a unique student/adviser relationship.
- [ ] Define `consent_records` with purpose, policy version, consent state, and consent timestamp.
- [ ] Define `billing_events` with unique Stripe event ID and no card data.
- [ ] Define `entitlements` linked to the user and source billing event.
- [ ] Add foreign-key delete behavior according to the PRD.
- [ ] Add indexes for user ownership, foreign keys, and due-date queries.
- [ ] Add database constraints for allowed statuses and nonnegative amounts.
- [ ] Add a migration for Row-Level Security policies.
- [ ] Ensure shared catalogue rows are readable only as intended and writable only by authorized owners.
- [ ] Ensure private rows deny access when authenticated user context is missing.
- [ ] Ensure pooled database connections cannot leak one user’s transaction context to another.
- [ ] Add fictional demo catalogue seed data with explicit demo labeling.

#### Verification Gate — Module 2
- [ ] Run `npx drizzle-kit push` against the development database only.
- [ ] Confirm the expected tables and indexes exist in the development database.
- [ ] Inspect table names and representative rows using a database console or SQL client.
- [ ] Insert a development user-owned programme and confirm it persists after reconnecting.
- [ ] Insert an application, task, and document metadata row and confirm foreign keys behave as expected.
- [ ] Test cascade behavior on development-only records.
- [ ] Test RLS with two users and confirm each user is denied access to the other user’s private rows.
- [ ] Confirm shared catalogue read access does not permit unauthorized writes.
- [ ] Run `npm run build` and confirm zero TypeScript or routing compilation errors.
- [ ] Run `npm run dev` and confirm `http://localhost:3000` renders without browser console errors.

## Module 3: Authentication & Protected Route Middleware

### Clerk integration
- [ ] Create the Clerk development application.
- [ ] Configure the local Clerk publishable key.
- [ ] Configure the local Clerk secret key.
- [ ] Add Clerk’s Next.js provider to the App Router root layout.
- [ ] Add sign-up and sign-in routes.
- [ ] Add sign-out behavior.
- [ ] Add account recovery behavior.
- [ ] Add a Clerk webhook endpoint only if required for user synchronization.
- [ ] Verify Clerk webhook signatures before processing events.
- [ ] Map the verified Clerk subject to one internal `users.id`.
- [ ] Create or update the internal user record without trusting a browser-supplied user ID.
- [ ] Add server-side authentication middleware for protected routes.
- [ ] Protect dashboard, programme, application, task, document, adviser, and settings routes.
- [ ] Add server-side authorization checks to every private mutation.
- [ ] Set transaction-local database user context only after Clerk verification.
- [ ] Deny access when the Clerk session or database user mapping is missing.
- [ ] Add an unauthorized state and a redirect to sign-in for unauthenticated page requests.
- [ ] Add tests for expired sessions and invalid user IDs.
- [ ] Add cross-account tests for private record access.

#### Verification Gate — Module 3
- [ ] Create a development account and confirm the internal user record is created once.
- [ ] Sign in and sign out successfully.
- [ ] Confirm password recovery reaches the configured recovery route.
- [ ] Open a protected route while signed out and confirm access is denied or redirected.
- [ ] Attempt to access another user’s record and confirm the server denies the request.
- [ ] Run `npm run build` and confirm zero TypeScript or routing compilation errors.
- [ ] Run `npm run dev` and confirm public and protected pages render at `http://localhost:3000`.
- [ ] Check the browser console for authentication or routing errors.

## Module 4: Cloud Storage & Third-Party API Integrations

### Private application documents
- [ ] Select and document the private object-storage approach for student application documents.
- [ ] Confirm the selected storage provider supports private objects and short-lived authorized downloads.
- [ ] Do not expose private application documents through public ImageKit URLs.
- [ ] Define permitted document types and the maximum upload size.
- [ ] Implement server-authorized upload initiation.
- [ ] Associate each uploaded object with the authenticated user.
- [ ] Store only storage keys and document metadata in PostgreSQL.
- [ ] Implement short-lived signed download authorization.
- [ ] Implement document deletion and unlinking behavior.
- [ ] Enforce per-user access checks for upload, view, download, and deletion.
- [ ] Test invalid file type and oversized-file rejection.

### ImageKit and third-party boundaries
- [ ] Configure ImageKit for approved non-sensitive image/media delivery.
- [ ] Store ImageKit’s private key server-side only.
- [ ] Issue signed ImageKit operations from a server route only where required.
- [ ] Keep student documents outside public media delivery.
- [ ] Add request validation and safe error handling to third-party API routes.
- [ ] Avoid sending personal application data to third-party APIs without an approved purpose and user-facing disclosure.
- [ ] Keep Gemini API calls out of Phase 1 product flows.
- [ ] Ensure no third-party API secret is returned to the browser.

### Document vault behavior
- [ ] Build document metadata create, read, update, and delete operations.
- [ ] Add document type and readiness status fields.
- [ ] Link one document to one or more authorized applications.
- [ ] Display missing document requirements per application.
- [ ] Display empty, uploading, success, and error states.
- [ ] Confirm deleting a document does not leave invalid application-document links.

#### Verification Gate — Module 4
- [ ] Upload an allowed test document and confirm its metadata persists after reload.
- [ ] Attempt to retrieve the document as another user and confirm access is denied.
- [ ] Confirm a signed download URL expires according to the configured policy.
- [ ] Confirm unsupported file types and oversized uploads are rejected.
- [ ] Confirm no private document is publicly retrievable.
- [ ] Run `npm run build` and confirm zero TypeScript or routing compilation errors.
- [ ] Run `npm run dev` and confirm the document flow works at `http://localhost:3000`.
- [ ] Check the browser console and server logs for errors without logging secrets.

## Module 5: Core UI Workspace & Canvas Components

### Shared UI and public routes
- [ ] Port the current prototype’s design tokens into the Next.js Tailwind setup.
- [ ] Create the shared application shell and authenticated navigation.
- [ ] Build the public landing page with the product value proposition.
- [ ] Label fictional catalogue entries as demo data.
- [ ] Display the disclaimer that the app does not predict admission outcomes.
- [ ] Build the pricing page with the one-off season-pass offer.
- [ ] Separate applicant pricing from adviser/university licensing information.
- [ ] Add sign-up and sign-in links from public pages.
- [ ] Add accessible loading, empty, error, and confirmation components.

### Applicant workspace
- [ ] Build the dashboard with next deadlines, application status, and outstanding tasks.
- [ ] Build programme catalogue and custom programme entry.
- [ ] Build programme comparison table with essential requirements and costs.
- [ ] Add responsive comparison-table fallback for narrow screens.
- [ ] Build programme detail view with requirements, source link, and verification state.
- [ ] Build application status and priority controls.
- [ ] Build deadline timeline and calendar views.
- [ ] Build `.ics` calendar export.
- [ ] Build task creation, editing, completion, and deletion.
- [ ] Build document vault list and application-link controls.
- [ ] Build document readiness indicators from requirements and linked documents.
- [ ] Build Reach/Target/Safety planning summary as an organizational aid only.
- [ ] Build adviser-sharing UI for explicit, revocable read-only access.
- [ ] Build settings for academic profile, GPA scale, target intake, and display currency.
- [ ] Build CSV export for the applicant’s own data.
- [ ] Add destructive-action confirmation before deleting user data.

### Accessibility and responsive implementation
- [ ] Use semantic landmarks and heading hierarchy on every route.
- [ ] Associate form labels and validation messages programmatically.
- [ ] Add keyboard-operable navigation, tables, dialogs, menus, and forms.
- [ ] Add a visible focus treatment using at least `outline: 2px solid`.
- [ ] Verify normal text contrast is at least 4.5:1.
- [ ] Ensure status is not communicated by color alone.
- [ ] Add mobile-friendly table behavior without hiding required data.
- [ ] Respect reduced-motion preferences.
- [ ] Add accessible names to icon-only controls.
- [ ] Add screen-reader status announcements for save, upload, and error outcomes.

#### Verification Gate — Module 5
- [ ] Run `npm run build` and confirm zero TypeScript or routing compilation errors.
- [ ] Start the app with `npm run dev`.
- [ ] Confirm the landing page renders at `http://localhost:3000`.
- [ ] Confirm dashboard, compare, programme detail, deadlines, documents, tasks, summary, adviser, and settings routes render.
- [ ] Run Playwright or equivalent headless browser checks on the primary applicant journey.
- [ ] Check browser console output and confirm there are no uncaught errors.
- [ ] Capture or inspect the app at a **375px mobile viewport**.
- [ ] Capture or inspect the app at a **1440px desktop viewport**.
- [ ] Verify navigation, comparison, forms, and document views remain usable at both viewports.
- [ ] Run automated accessibility checks and record remaining issues.
- [ ] Manually test keyboard navigation and focus order.

## Module 6: Billing Integration, Webhooks, & Pre-Launch Audits

### Season-pass checkout
- [ ] Confirm season-pass price, currency, duration, tax display, and refund policy.
- [ ] Configure the approved Stripe Price ID in the server environment.
- [ ] Add a server-side checkout-session route requiring an authenticated user.
- [ ] Select the Stripe Price ID from server configuration rather than browser input.
- [ ] Validate success and cancel URLs against the configured application origin.
- [ ] Redirect the applicant to Stripe-hosted Checkout.
- [ ] Add a Stripe webhook route that verifies signatures against the raw request body.
- [ ] Persist Stripe event IDs with a uniqueness constraint.
- [ ] Make webhook processing idempotent.
- [ ] Grant season-pass entitlement only after verified successful payment.
- [ ] Handle duplicate, expired, failed, refunded, and out-of-order payment events.
- [ ] Display pending, success, cancellation, and failure states without treating a redirect as payment proof.
- [ ] Ensure no payment-card data is collected or stored by GradPath Atlas.
- [ ] Keep adviser/university licence fulfillment outside Phase 1 unless explicitly approved.

### Pre-launch quality and privacy
- [ ] Add automated tests for authentication and ownership boundaries.
- [ ] Add automated tests for programme, deadline, task, and document workflows.
- [ ] Add automated tests for webhook signature rejection and duplicate-event handling.
- [ ] Add direct-route and page-refresh tests for every Phase 1 route.
- [ ] Add an accessible privacy notice and applicable PICS before collecting personal data.
- [ ] Record consent purpose, policy version, and timestamp where consent is required.
- [ ] Add account data export and deletion-request handling.
- [ ] Define retention for application data, documents, consent records, and billing records.
- [ ] Audit the repository for secrets and remove private environment files from Git.
- [ ] Rotate any secret found in source control or history.
- [ ] Confirm demo data remains labeled fictional in product UI and exports.
- [ ] Confirm no admissions prediction or unsupported guarantee appears in UI copy.
- [ ] Document backup, restore, incident response, and production rollback procedures.
- [ ] Record known limitations and obtain approval for unresolved launch decisions.

#### Verification Gate — Module 6 / Release
- [ ] Run `npm run build` and confirm zero TypeScript or routing compilation errors.
- [ ] Run the project test suite and confirm all Phase 1 tests pass.
- [ ] Run lint and type checks and resolve all errors.
- [ ] Run `npx drizzle-kit push` against the development database and confirm the final schema is current.
- [ ] Inspect development database rows and confirm user-owned data persists after a fresh connection.
- [ ] Re-run two-user RLS tests and confirm cross-user reads and writes are denied.
- [ ] Start `npm run dev` and confirm the application renders at `http://localhost:3000`.
- [ ] Run the complete Playwright applicant journey and capture browser console output.
- [ ] Verify 375px mobile and 1440px desktop layouts.
- [ ] Verify WCAG contrast, visible focus outline, keyboard operation, and accessible form feedback.
- [ ] Complete Stripe test-mode checkout and confirm only a verified webhook grants the test entitlement.
- [ ] Confirm live payment mode is disabled until commercial terms and production secrets are approved.
- [ ] Confirm no secret values are committed or exposed in client bundles.
- [ ] Confirm the production release checklist and rollback plan are approved.

## Deferred — Phase 2 Only

Do not implement these items as part of Phase 1 unless scope is explicitly re-approved.

- [ ] Add adviser comment threads and two-way collaboration.
- [ ] Add multi-tenant adviser teams and team seats.
- [ ] Add university cohort dashboards and university licence administration.
- [ ] Add usage-credit analytics and team usage reporting.
- [ ] Add automated email or push deadline reminders.
- [ ] Replace fixed indicative currency rates with a live exchange-rate provider.
- [ ] Add advanced billing administration, invoices, and self-service refunds.
- [ ] Add Gemini-powered summaries or planning assistance after privacy review and explicit user-facing AI disclosures.
- [ ] Add advanced analytics only after defining purpose, consent, minimization, and retention.
- [ ] Add institutional programme management and verified catalogue workflows.
