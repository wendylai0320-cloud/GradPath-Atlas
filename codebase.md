# .gitignore

```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
.output
.vinxi
.tanstack/**
.nitro
*.local

# Wrangler / Cloudflare
.wrangler/
.dev.vars

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

# .lovable/project.json

```json
{
  "schemaVersion": 1,
  "template": "tanstack_start_ts_current",
  "revision": "tanstack_start_ts_current-8af2b0f6890a"
}

```

# .prettierignore

```
node_modules
dist
.output
.vinxi
pnpm-lock.yaml
package-lock.json
bun.lock
routeTree.gen.ts

```

# .prettierrc

```
{
  "printWidth": 100,
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all"
}

```

# AGENTS.md

```md
<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

```

# bunfig.toml

```toml
[install]
saveTextLockfile = true
# 24h supply-chain guard: skip package versions published less than a day ago.
minimumReleaseAge = 86400
# Each entry bypasses the 24h guard for one package — confirm with the user
# before adding any.
minimumReleaseAgeExcludes = ["@lovable.dev/vite-tanstack-config", "@lovable.dev/mcp-js", "@lovable.dev/email-js", "@lovable.dev/webhooks-js"]

```

# components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "css": "src/styles.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}

```

# eslint.config.js

```js
import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", ".output", ".vinxi"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "server-only",
              message:
                "TanStack Start does not use the Next.js `server-only` package. Rename the module to `*.server.ts` or mark it with `@tanstack/react-start/server-only`.",
            },
          ],
        },
      ],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  eslintPluginPrettier,
);

```

# package.json

```json
{
  "name": "tanstack_start_ts",
  "private": true,
  "sideEffects": false,
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier --write .",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "overrides": {
    "rolldown": "1.2.1"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@lovable.dev/cloud-auth-js": "^1.1.2",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-aspect-ratio": "^1.1.8",
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-collapsible": "^1.1.12",
    "@radix-ui/react-context-menu": "^2.2.16",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-hover-card": "^1.1.15",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-menubar": "^1.1.16",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.8",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-toggle": "^1.1.10",
    "@radix-ui/react-toggle-group": "^1.1.11",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@supabase/supabase-js": "^2.117.2",
    "@tailwindcss/vite": "^4.2.1",
    "@tanstack/react-query": "^5.101.1",
    "@tanstack/react-router": "1.170.41",
    "@tanstack/react-start": "1.168.60",
    "@tanstack/router-plugin": "1.168.42",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.6.0",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.575.0",
    "react": "^19.2.0",
    "react-day-picker": "^9.14.0",
    "react-dom": "^19.2.0",
    "react-hook-form": "^7.71.2",
    "react-resizable-panels": "^4.6.5",
    "recharts": "^2.15.4",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.5.0",
    "tailwindcss": "^4.2.1",
    "tw-animate-css": "^1.3.4",
    "vaul": "^1.1.2",
    "vite-tsconfig-paths": "^6.0.2",
    "zod": "^3.25.76"
  },
  "devDependencies": {
    "@eslint/js": "^9.32.0",
    "@lovable.dev/vite-tanstack-config": "2.25.3",
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.0.0",
    "@types/node": "^22.16.5",
    "@types/react": "^19.2.0",
    "@types/react-dom": "^19.2.0",
    "@vitejs/plugin-react": "^5.2.0",
    "eslint": "^9.32.0",
    "eslint-config-prettier": "^10.1.1",
    "eslint-plugin-prettier": "^5.2.6",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^15.15.0",
    "jsdom": "^20.0.3",
    "nitro": "3.0.260603-beta",
    "prettier": "^3.7.3",
    "typescript": "^5.8.3",
    "typescript-eslint": "^8.56.1",
    "vite": "8.1.5",
    "vitest": "^4.1.10"
  }
}

```

# PRD.md

```md
# GradPath Atlas — Product Requirements Document

**Status:** Assignment-ready specification; architecture migration decision recorded below
**Version:** 2.0
**Date:** 12 October 2026
**Codebase context:** `@codebase.md`, generated in this repository with `npx ai-digest`

## 0. Codebase Digest and Evidence Boundary

The digest was generated from the exact repository `wendylai0320-cloud/GradPath-Atlas`. It contains the project source and configuration (110 files included by `ai-digest`), including the TanStack routes, Supabase migrations, tests, design tokens, and product components. The digest is a source snapshot, not proof that every feature is production-ready. It excludes `.env` under the tool's default ignore rules.

### Observed implementation

The current repository is a **TanStack Start v1 / React 19 / Vite 8** app using TypeScript, Tailwind CSS v4, TanStack Router and React Query, Supabase Auth/PostgreSQL/Row-Level Security/private Storage, and Lovable Cloud OAuth integration. Its routes and source implement a public landing page and pricing page; email/password and Google authentication and password reset; an authenticated dashboard; programme comparison and programme detail; tasks; deadlines with calendar/timeline and `.ics` export; document vault and application-document links; strategy summary; adviser view; settings; CSV exports; demo catalogue; and test-only plan switching. A Supabase migration defines UUID-backed entities and RLS policies. The codebase includes routing tests and a `npm run build`, `npm run lint`, and `npm test` script.

These observations are based on source files and migrations, not a fresh production deployment audit. Mark a feature as “implemented in prototype” only where there is corresponding source/migration evidence; mark payment fulfillment, production data accuracy, WCAG conformance, and privacy operations as unverified unless separately tested.

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

The checked-in implementation instead uses TanStack Start/Router, React 19, Vite, TanStack Query, Supabase JS/Auth/PostgreSQL/RLS/Storage, and Lovable OAuth. Tailwind v4 and custom components provide the visual system. This current architecture is the source of truth for existing implementation; the preceding target list is the requested future stack. Migration mapping must be planned after the architecture decision in Section 0.

### Route and page layout

The current prototype route paths below are derived from the TanStack route tree. The same user-facing paths should be preserved in Next.js App Router unless a usability or technical review approves a change.

| Route | Access | Purpose and key UI |
| --- | --- | --- |
| `/` | Public | Hero, value proposition, fictional programme preview, feature summary, workflow steps, signup/pricing CTAs, and admissions disclaimer |
| `/pricing` | Public | Plan comparison, currency selector, price/feature summary, pass CTA, and clear note if checkout remains test-only |
| `/auth?mode=signup` | Public | Email/password and Google sign-in/sign-up, duplicate-account handling |
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

\`\`\`dotenv
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
\`\`\`

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

```

# public/favicon.ico

This is a binary file of the type: Binary

# public/robots.txt

```txt
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

```

# README.md

```md
# GradPath Atlas

A desktop-first workspace for planning master's applications. See [PRD.md](PRD.md) and [TASK_LIST.md](TASK_LIST.md).

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6d85d5bd-ff4f-5dff-871b-ec320485bbc2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

\`\`\`sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
\`\`\`

```

# src/components/AddProgramme.tsx

```tsx
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button, Field, Input, Select } from "@/components/ui-kit";
import { type Workspace, money } from "@/lib/atlas";
import { planOf } from "@/lib/plans";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { searchPresets, type Preset } from "@/lib/programme-presets";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: u } = await supabase.auth.getUser();
      const { data } = await supabase.from("profiles").select("*").eq("id", u.user!.id).maybeSingle();
      return { ...(data ?? { display_name: "", role: "student", plan: "free" }), email: u.user?.email ?? "", id: u.user!.id };
    },
  });
}

export function AddProgramme({ ws, onDone }: { ws: Workspace; onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"catalogue" | "custom">("catalogue");
  const [err, setErr] = useState("");
  const profile = useProfile();
  const plan = planOf(profile.data?.plan);
  const atLimit = ws.applications.length >= plan.maxProgrammes;
  const tracked = new Set(ws.applications.map((a) => a.programme_id));
  const available = ws.programmes.filter((p) => !tracked.has(p.id));
  const [f, setF] = useState({ university: "", country: "", name: "", degree: "MSc", tuition: "", currency: "GBP", english: "", deadline: "" });
  const [q, setQ] = useState("");
  const [filled, setFilled] = useState("");
  const [intake, setIntake] = useState("");
  const results = searchPresets(q);
  function applyPreset(p: Preset) {
    setF({ university: p.university, country: p.country, name: p.name, degree: p.degree, tuition: String(p.tuition), currency: p.currency, english: p.english, deadline: p.deadline });
    setFilled(`${p.acronym} ${p.degree} ${p.name}`);
    setIntake(p.intake);
    setQ("");
  }

  async function track(programmeId: string) {
    setErr("");
    const { error } = await supabase.from("applications").insert({ user_id: ws.userId, programme_id: programmeId });
    if (error) return setErr(error.message);
    onDone();
  }

  async function createCustom(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const { data: uni, error: e1 } = await supabase.from("universities").insert({ owner_id: ws.userId, name: f.university, country: f.country }).select().single();
    if (e1) return setErr(e1.message);
    const { data: prog, error: e2 } = await supabase.from("programmes").insert({
      owner_id: ws.userId, university_id: uni.id, name: f.name, degree: f.degree,
      tuition: Number(f.tuition) || 0, currency: f.currency, english_test: f.english,
    }).select().single();
    if (e2) return setErr(e2.message);
    if (f.deadline) await supabase.from("deadlines").insert({ owner_id: ws.userId, programme_id: prog.id, label: "Application deadline", due_date: f.deadline });
    await track(prog.id);
    setF({ university: "", country: "", name: "", degree: "MSc", tuition: "", currency: "GBP", english: "", deadline: "" });
    setOpen(false);
  }

  if (!open) return <Button onClick={() => setOpen(true)}>Add programme</Button>;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="add-title" className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-6">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 id="add-title" className="text-2xl">Add a target programme</h2>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)} aria-label="Close">✕</Button>
        </div>
        {atLimit ? (
          <div className="mt-6 rounded-md bg-secondary p-4 text-sm">
            The Basic plan tracks up to {plan.maxProgrammes} programmes. <Link to="/settings" className="font-medium underline">Upgrade (test flow)</Link> to add more.
          </div>
        ) : (
          <>
            <div className="mt-4 flex gap-1 border-b border-border" role="tablist">
              {(["catalogue", "custom"] as const).map((t) => (
                <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
                  className={`-mb-px border-b-2 px-3 py-2 text-sm ${tab === t ? "border-primary font-medium" : "border-transparent text-muted-foreground"}`}>
                  {t === "catalogue" ? "Demo catalogue" : "Enter my own"}
                </button>
              ))}
            </div>
            {tab === "catalogue" ? (
              <ul className="mt-4 divide-y divide-border">
                {available.length === 0 && <li className="py-6 text-sm text-muted-foreground">You're tracking every catalogue programme.</li>}
                {available.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-4 py-3">
                    <div>
                      <p className="font-medium">{p.degree} {p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.universities?.name} · {p.universities?.country} · {money(p.tuition, p.currency)}</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => track(p.id)}>Track</Button>
                  </li>
                ))}
              </ul>
            ) : (
              <>
              <div className="relative mt-4">
                <label htmlFor="psearch" className="text-sm font-medium">Search programmes to auto-fill</label>
                <Input id="psearch" autoComplete="off" placeholder='e.g. "CUHK Business Analytics", "HKU Finance", "LSE Data Science"'
                  value={q} onChange={(e) => setQ(e.target.value)} className="mt-1" />
                {q && (
                  <ul role="listbox" className="absolute z-10 mt-1 max-h-64 w-full overflow-y-auto rounded-md border border-border bg-card shadow-lg">
                    {results.length === 0 && <li className="p-3 text-sm text-muted-foreground">No match — fill in the form below manually.</li>}
                    {results.map((p) => (
                      <li key={p.acronym + p.name}>
                        <button type="button" role="option" aria-selected={false} onClick={() => applyPreset(p)}
                          className="w-full px-3 py-2 text-left hover:bg-secondary">
                          <span className="font-medium">{p.acronym} · {p.degree} {p.name}</span>
                          <span className="block text-xs text-muted-foreground">{p.university} · {money(p.tuition, p.currency)} · {p.intake} · deadline {p.deadline}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {filled && <p className="mt-3 rounded-md bg-secondary p-2 text-sm">Auto-filled from {filled} ({intake}) — you can edit any field below.</p>}
              <form onSubmit={createCustom} className="mt-4 grid grid-cols-2 gap-4">
                <Field label="University" htmlFor="u"><Input id="u" required value={f.university} onChange={(e) => setF({ ...f, university: e.target.value })} /></Field>
                <Field label="Country" htmlFor="c"><Input id="c" value={f.country} onChange={(e) => setF({ ...f, country: e.target.value })} /></Field>
                <Field label="Programme name" htmlFor="n"><Input id="n" required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
                <Field label="Degree" htmlFor="d"><Select id="d" value={f.degree} onChange={(e) => setF({ ...f, degree: e.target.value })}>{["MSc", "MA", "MBA", "MRes", "Master", "LLM"].map((d) => <option key={d}>{d}</option>)}</Select></Field>
                <Field label="Tuition" htmlFor="t"><Input id="t" type="number" min={0} value={f.tuition} onChange={(e) => setF({ ...f, tuition: e.target.value })} /></Field>
                <Field label="Currency" htmlFor="cur"><Select id="cur" value={f.currency} onChange={(e) => setF({ ...f, currency: e.target.value })}>{["GBP", "EUR", "USD", "AUD", "CAD", "HKD", "SGD"].map((d) => <option key={d}>{d}</option>)}</Select></Field>
                <Field label="English requirement" htmlFor="en"><Input id="en" placeholder="e.g. IELTS 6.5" value={f.english} onChange={(e) => setF({ ...f, english: e.target.value })} /></Field>
                <Field label="Application deadline" htmlFor="dl"><Input id="dl" type="date" value={f.deadline} onChange={(e) => setF({ ...f, deadline: e.target.value })} /></Field>
                <div className="col-span-2 flex justify-end"><Button type="submit">Save and track</Button></div>
              </form>
              </>
            )}
          </>
        )}
        {err && <p role="alert" className="mt-4 text-sm text-destructive">{err}</p>}
      </div>
    </div>
  );
}

```

# src/components/Logo.tsx

```tsx
import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-foreground">
      <span aria-hidden className="grid h-8 w-8 place-items-center rounded-md bg-primary font-serif text-lg text-primary-foreground">G</span>
      <span className="font-serif text-xl">GradPath Atlas</span>
    </Link>
  );
}

export function PublicHeader() {
  return (
    <header className="border-b border-border bg-background/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link>
          <Link to="/auth" className="text-muted-foreground hover:text-foreground">Sign in</Link>
          <Link to="/auth" search={{ mode: "signup" }} className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90">Start planning</Link>
        </nav>
      </div>
    </header>
  );
}

```

# src/components/ui-kit.tsx

```tsx
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "ghost" | "danger"; size?: "sm" | "md" };
export function Button({ variant = "primary", size = "md", className, ...p }: BtnProps) {
  return (
    <button
      {...p}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50",
        size === "sm" ? "h-8 px-3 text-sm" : "h-10 px-4 text-sm",
        variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "outline" && "border border-input bg-card text-foreground hover:bg-secondary",
        variant === "ghost" && "text-foreground hover:bg-secondary",
        variant === "danger" && "text-destructive hover:bg-destructive/10",
        className,
      )}
    />
  );
}

const field = "w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
export const Input = ({ className, ...p }: InputHTMLAttributes<HTMLInputElement>) => <input {...p} className={cn(field, "h-10", className)} />;
export const Select = ({ className, ...p }: SelectHTMLAttributes<HTMLSelectElement>) => <select {...p} className={cn(field, "h-10", className)} />;
export const Textarea = ({ className, ...p }: TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...p} className={cn(field, className)} />;

export function Field({ label, htmlFor, children, hint }: { label: string; htmlFor: string; children: ReactNode; hint?: string | undefined }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground">{label}</label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-lg border border-border bg-card", className)}>{children}</div>;
}

export function Badge({ tone = "neutral", children }: { tone?: "neutral" | "success" | "warning" | "danger" | "info"; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        tone === "neutral" && "bg-secondary text-secondary-foreground",
        tone === "success" && "bg-accent text-accent-foreground",
        tone === "warning" && "bg-warning/25 text-warning-foreground",
        tone === "danger" && "bg-destructive/10 text-destructive",
        tone === "info" && "bg-primary/10 text-primary",
      )}
    >
      {children}
    </span>
  );
}

export function Progress({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-center gap-2" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className="h-1.5 w-full min-w-16 overflow-hidden rounded-full bg-secondary">
        <div className={cn("h-full rounded-full", value === 100 ? "bg-success" : "bg-primary")} style={{ width: `${value}%` }} />
      </div>
      <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">{value}%</span>
    </div>
  );
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
      <div>
        <h1 className="text-3xl font-medium text-foreground">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">{children}</div>;
}

export function DeadlineBadge({ days }: { days: number }) {
  if (days < 0) return <Badge tone="neutral">Passed</Badge>;
  if (days <= 14) return <Badge tone="danger">{days} days left</Badge>;
  if (days <= 45) return <Badge tone="warning">{days} days left</Badge>;
  return <Badge tone="info">{days} days left</Badge>;
}

```

# src/components/ui/accordion.tsx

```tsx
import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

```

# src/components/ui/alert-dialog.tsx

```tsx
import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};

```

# src/components/ui/alert.tsx

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };

```

# src/components/ui/aspect-ratio.tsx

```tsx
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };

```

# src/components/ui/avatar.tsx

```tsx
"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };

```

# src/components/ui/badge.tsx

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

```

# src/components/ui/breadcrumb.tsx

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
        className,
      )}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = "BreadcrumbList";

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  ),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  ),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};

```

# src/components/ui/button.tsx

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

```

# src/components/ui/calendar.tsx

```tsx
"use client";

import * as React from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-(--cell-size) w-(--cell-size) select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn("bg-popover absolute inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label,
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday,
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number,
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day,
        ),
        range_start: cn("bg-accent rounded-l-md", defaultClassNames.range_start),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today,
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside,
        ),
        disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return <ChevronLeftIcon className={cn("size-4", className)} {...props} />;
          }

          if (orientation === "right") {
            return <ChevronRightIcon className={cn("size-4", className)} {...props} />;
          }

          return <ChevronDownIcon className={cn("size-4", className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers["focused"]) ref.current?.focus();
  }, [modifiers]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers["selected"] &&
        !modifiers["range_start"] &&
        !modifiers["range_end"] &&
        !modifiers["range_middle"]
      }
      data-range-start={modifiers["range_start"]}
      data-range-end={modifiers["range_end"]}
      data-range-middle={modifiers["range_middle"]}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-(--cell-size) flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };

```

# src/components/ui/card.tsx

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

```

# src/components/ui/carousel.tsx

```tsx
import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins,
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) {
      return;
    }

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  React.useEffect(() => {
    if (!api || !setApi) {
      return;
    }

    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
});
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className,
        )}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute  h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};

```

# src/components/ui/chart.tsx

```tsx
import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "line" | "dot" | "dashed";
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart();

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>
        );
      }

      if (!value) {
        return null;
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className,
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload
            .filter((item) => item.type !== "none")
            .map((item, index) => {
              const key = `${nameKey || item.name || item.dataKey || "value"}`;
              const itemConfig = getPayloadConfigFromPayload(config, item, key);
              const indicatorColor = color || item.payload.fill || item.color;

              return (
                <div
                  key={item.dataKey}
                  className={cn(
                    "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                    indicator === "dot" && "items-center",
                  )}
                >
                  {formatter && item?.value !== undefined && item.name ? (
                    formatter(item.value, item.name, item, index, item.payload)
                  ) : (
                    <>
                      {itemConfig?.icon ? (
                        <itemConfig.icon />
                      ) : (
                        !hideIndicator && (
                          <div
                            className={cn(
                              "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                              {
                                "h-2.5 w-2.5": indicator === "dot",
                                "w-1": indicator === "line",
                                "w-0 border-[1.5px] border-dashed bg-transparent":
                                  indicator === "dashed",
                                "my-0.5": nestLabel && indicator === "dashed",
                              },
                            )}
                            style={
                              {
                                "--color-bg": indicatorColor,
                                "--color-border": indicatorColor,
                              } as React.CSSProperties
                            }
                          />
                        )
                      )}
                      <div
                        className={cn(
                          "flex flex-1 justify-between leading-none",
                          nestLabel ? "items-end" : "items-center",
                        )}
                      >
                        <div className="grid gap-1.5">
                          {nestLabel ? tooltipLabel : null}
                          <span className="text-muted-foreground">
                            {itemConfig?.label || item.name}
                          </span>
                        </div>
                        {item.value && (
                          <span className="font-mono font-medium tabular-nums text-foreground">
                            {item.value.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground",
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegend";

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};

```

# src/components/ui/checkbox.tsx

```tsx
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("grid place-content-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

```

# src/components/ui/collapsible.tsx

```tsx
"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

```

# src/components/ui/command.tsx

```tsx
"use client";

import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-6 text-center text-sm" {...props} />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  );
};
CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};

```

# src/components/ui/context-menu.tsx

```tsx
import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuTrigger = ContextMenuPrimitive.Trigger;

const ContextMenuGroup = ContextMenuPrimitive.Group;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

const ContextMenuSub = ContextMenuPrimitive.Sub;

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-context-menu-content-transform-origin)",
      className,
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 max-h-(--radix-context-menu-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-context-menu-content-transform-origin)",
        className,
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-4 w-4 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold text-foreground", inset && "pl-8", className)}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  );
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};

```

# src/components/ui/dialog.tsx

```tsx
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};

```

# src/components/ui/drawer.tsx

```tsx
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className,
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};

```

# src/components/ui/dropdown-menu.tsx

```tsx
"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className,
    )}
    {...props}
  />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};

```

# src/components/ui/form.tsx

```tsx
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue | null>(null);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};

```

# src/components/ui/hover-card.tsx

```tsx
import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-hover-card-content-transform-origin)",
      className,
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };

```

# src/components/ui/input-otp.tsx

```tsx
import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName,
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index] ?? {
    char: null,
    hasFakeCaret: false,
    isActive: false,
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Minus />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };

```

# src/components/ui/input.tsx

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

```

# src/components/ui/label.tsx

```tsx
"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

```

# src/components/ui/menubar.tsx

```tsx
import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

function MenubarMenu({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />;
}

function MenubarGroup({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />;
}

function MenubarPortal({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal {...props} />;
}

function MenubarRadioGroup({ ...props }: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />;
}

function MenubarSub({ ...props }: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
}

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
      className,
    )}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className,
    )}
    {...props}
  />
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-menubar-content-transform-origin)",
      className,
    )}
    {...props}
  />
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  <MenubarPrimitive.Portal>
    <MenubarPrimitive.Content
      ref={ref}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-menubar-content-transform-origin)",
        className,
      )}
      {...props}
    />
  </MenubarPrimitive.Portal>
));
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-4 w-4 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  />
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  );
};
MenubarShortcut.displayname = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};

```

# src/components/ui/navigation-menu.tsx

```tsx
import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn("group flex flex-1 list-none items-center justify-center space-x-1", className)}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent",
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className,
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};

```

# src/components/ui/pagination.tsx

```tsx
import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-row items-center gap-1", className)} {...props} />
  ),
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />,
);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};

```

# src/components/ui/popover.tsx

```tsx
import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };

```

# src/components/ui/progress.tsx

```tsx
"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };

```

# src/components/ui/radio-group.tsx

```tsx
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3.5 w-3.5 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };

```

# src/components/ui/resizable.tsx

```tsx
import { GripVertical } from "lucide-react";
import { Group, Panel, Separator } from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({ className, ...props }: React.ComponentProps<typeof Group>) => (
  <Group
    className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
    {...props}
  />
);

const ResizablePanel = Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof Separator> & {
  withHandle?: boolean;
}) => (
  <Separator
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </Separator>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };

```

# src/components/ui/scroll-area.tsx

```tsx
import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };

```

# src/components/ui/select.tsx

```tsx
"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};

```

# src/components/ui/separator.tsx

```tsx
import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className,
    )}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };

```

# src/components/ui/sheet.tsx

```tsx
"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

interface SheetContentProps
  extends
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};

```

# src/components/ui/sidebar.tsx

```tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open],
    );

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContextProps>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className,
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  },
);
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>Displays the mobile sidebar.</SheetDescription>
            </SheetHeader>
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <div
        ref={ref}
        className="group peer hidden text-sidebar-foreground md:block"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=right]:rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
          )}
        />
        <div
          className={cn(
            "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
            side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
            className,
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();

    return (
      <button
        ref={ref}
        data-sidebar="rail"
        aria-label="Toggle Sidebar"
        tabIndex={-1}
        onClick={toggleSidebar}
        title="Toggle Sidebar"
        className={cn(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
          "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
          "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">>(
  ({ className, ...props }, ref) => {
    return (
      <main
        ref={ref}
        className={cn(
          "relative flex w-full flex-1 flex-col bg-background",
          "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarInset.displayName = "SidebarInset";

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className,
      )}
      {...props}
    />
  );
});
SidebarInput.displayName = "SidebarInput";

const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="header"
        className={cn("flex flex-col gap-2 p-2", className)}
        {...props}
      />
    );
  },
);
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="footer"
        className={cn("flex flex-col gap-2 p-2", className)}
        {...props}
      />
    );
  },
);
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  );
});
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="content"
        className={cn(
          "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-sidebar="group"
        className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
        {...props}
      />
    );
  },
);
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  ),
);
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  ),
);
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  ),
);
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring cursor-pointer transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      };
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    );
  },
);
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="menu-badge"
      className={cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  ),
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean;
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-sidebar="menu-sub"
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  ),
);
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ ...props }, ref) => <li ref={ref} {...props} />,
);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};

```

# src/components/ui/skeleton.tsx

```tsx
import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-primary/10", className)} {...props} />;
}

export { Skeleton };

```

# src/components/ui/slider.tsx

```tsx
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

```

# src/components/ui/sonner.tsx

```tsx
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };

```

# src/components/ui/switch.tsx

```tsx
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

```

# src/components/ui/table.tsx

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
));
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };

```

# src/components/ui/tabs.tsx

```tsx
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };

```

# src/components/ui/textarea.tsx

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };

```

# src/components/ui/toggle-group.tsx

```tsx
"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };

```

# src/components/ui/toggle.tsx

```tsx
import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium cursor-pointer transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };

```

# src/components/ui/tooltip.tsx

```tsx
"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)",
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

```

# src/hooks/use-mobile.tsx

```tsx
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}

```

# src/integrations/lovable/index.ts

```ts
// This file is auto-generated by Lovable. Do not modify it.

import { createLovableAuth } from "@lovable.dev/cloud-auth-js";
import type { OAuthProvider } from "@lovable.dev/cloud-auth-js";
import { supabase } from "../supabase/client";
const lovableAuth = createLovableAuth();

type SignInOptions = {
  redirect_uri?: string;
  extraParams?: Record<string, string>;
};

export const lovable = {
  auth: {
    signInWithOAuth: async (provider: OAuthProvider, opts?: SignInOptions) => {
      const result = await lovableAuth.signInWithOAuth(provider, {
        ...opts,
        extraParams: {
          ...opts?.extraParams,
        },
      });

      if (result.redirected) {
        return result;
      }

      if (result.error) {
        return result;
      }

      try {
        await supabase.auth.setSession(result.tokens);
      } catch (e) {
        return { error: e instanceof Error ? e : new Error(String(e)) };
      }
      return result;
    },
  },
};

```

# src/integrations/supabase/auth-attacher.ts

```ts
// This file is automatically generated. Do not edit it directly.
import { createMiddleware } from '@tanstack/react-start'
import { supabase } from './client'

// Must be registered as a global `functionMiddleware` in `src/start.ts`; otherwise
// the browser never attaches the bearer token to serverFn RPCs.
export const attachSupabaseAuth = createMiddleware({ type: 'function' }).client(
  async ({ next }) => {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token
    return next({
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
  },
)

```

# src/integrations/supabase/auth-middleware.ts

```ts
// This file is automatically generated. Do not edit it directly.
import { createMiddleware } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'




function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith('sb_publishable_') || value.startsWith('sb_secret_');
}

function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== 'undefined' && input instanceof Request ? input.headers : undefined,
    );

    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }

    // New Supabase API keys are opaque strings, not bearer JWTs.
    if (isNewSupabaseApiKey(supabaseKey) && headers.get('Authorization') === `Bearer ${supabaseKey}`) {
      headers.delete('Authorization');
    }

    headers.set('apikey', supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

export const requireSupabaseAuth = createMiddleware({ type: 'function' }).server(
  async ({ next }) => {
    
    const SUPABASE_URL = process.env['SUPABASE_URL'];
    const SUPABASE_PUBLISHABLE_KEY = process.env['SUPABASE_PUBLISHABLE_KEY'];

    if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
      const missing = [
        ...(!SUPABASE_URL ? ['SUPABASE_URL'] : []),
        ...(!SUPABASE_PUBLISHABLE_KEY ? ['SUPABASE_PUBLISHABLE_KEY'] : []),
      ];
      const message = `Missing Supabase environment variable(s): ${missing.join(', ')}. Connect Supabase in Lovable Cloud.`;
      console.error(`[Supabase] ${message}`);
      throw new Error(message);
    }
    
    const request = getRequest();

    if (!request?.headers) {
      throw new Error('Unauthorized: No request headers available');
    }


    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      throw new Error('Unauthorized: No authorization header provided');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new Error('Unauthorized: Only Bearer tokens are supported');
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      throw new Error('Unauthorized: No token provided');
    }

    if (token.split('.').length !== 3) {
      throw new Error('Unauthorized: Invalid token');
    }

    const supabase = createClient<Database>(
      SUPABASE_URL!,
      SUPABASE_PUBLISHABLE_KEY!,
      {
        global: {
          fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY!),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        auth: {
          storage: undefined,
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    const { data, error } = await supabase.auth.getClaims(token);
    if (error || !data?.claims) {
      throw new Error('Unauthorized: Invalid token');
    }

    if (!data.claims.sub) {
      throw new Error('Unauthorized: No user ID found in token');
    }

    return next({
      context: {
        supabase,
        userId: data.claims.sub,
        claims: data.claims,
      },
    });
  },
);

```

# src/integrations/supabase/client.server.ts

```ts
// This file is automatically generated. Do not edit it directly.
// Server-side Supabase client with service role key - bypasses RLS.
// Use this for admin operations in server functions and server routes only.
// For user-authenticated queries (with RLS), use the auth middleware instead.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith('sb_publishable_') || value.startsWith('sb_secret_');
}

function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== 'undefined' && input instanceof Request ? input.headers : undefined,
    );

    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }

    // New Supabase API keys are opaque strings, not bearer JWTs.
    if (isNewSupabaseApiKey(supabaseKey) && headers.get('Authorization') === `Bearer ${supabaseKey}`) {
      headers.delete('Authorization');
    }

    headers.set('apikey', supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

function createSupabaseAdminClient() {
  const SUPABASE_URL = process.env['SUPABASE_URL'];
  const SUPABASE_SERVICE_ROLE_KEY = process.env['SUPABASE_SERVICE_ROLE_KEY'];

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const missing = [
      ...(!SUPABASE_URL ? ['SUPABASE_URL'] : []),
      ...(!SUPABASE_SERVICE_ROLE_KEY ? ['SUPABASE_SERVICE_ROLE_KEY'] : []),
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(', ')}. Connect Supabase in Lovable Cloud.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    global: {
      fetch: createSupabaseFetch(SUPABASE_SERVICE_ROLE_KEY),
    },
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    }
  });
}

let _supabaseAdmin: ReturnType<typeof createSupabaseAdminClient> | undefined;

// Server-side Supabase client with service role - bypasses RLS
// SECURITY: Only use this for trusted server-side operations, never expose to client code
// Load inside server handlers: const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
// Top-level import is safe only in other .server.ts modules - route files and *.functions.ts ship to the client bundle.
export const supabaseAdmin = new Proxy({} as ReturnType<typeof createSupabaseAdminClient>, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  },
});

```

# src/integrations/supabase/client.ts

```ts
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { brokeredPreviewStorage } from './previewAuthStorage';

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith('sb_publishable_') || value.startsWith('sb_secret_');
}

function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== 'undefined' && input instanceof Request ? input.headers : undefined,
    );

    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }

    // New Supabase API keys are opaque strings, not bearer JWTs.
    if (isNewSupabaseApiKey(supabaseKey) && headers.get('Authorization') === `Bearer ${supabaseKey}`) {
      headers.delete('Authorization');
    }

    headers.set('apikey', supabaseKey);
    return fetch(input, { ...init, headers });
  };
}


function createSupabaseClient() {
  // Use import.meta.env for client-side (Vite build-time replacement)
  // Fall back to process.env for SSR (server-side rendering)
  const SUPABASE_URL = import.meta.env['VITE_SUPABASE_URL'] || process.env['SUPABASE_URL'];
  const SUPABASE_PUBLISHABLE_KEY = import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'] || process.env['SUPABASE_PUBLISHABLE_KEY'];

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    const missing = [
      ...(!SUPABASE_URL ? ['SUPABASE_URL'] : []),
      ...(!SUPABASE_PUBLISHABLE_KEY ? ['SUPABASE_PUBLISHABLE_KEY'] : []),
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(', ')}. Connect Supabase in Lovable Cloud.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: {
      fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY),
    },
    auth: {
      storage: brokeredPreviewStorage(),
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

let _supabase: ReturnType<typeof createSupabaseClient> | undefined;

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";
export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  },
});


```

# src/integrations/supabase/cron-auth.ts

```ts
// This file is automatically generated. Do not edit it directly.
export async function authenticateCronRequest(
  request: Request,
): Promise<Response | null> {
  const currentSecret = process.env['LOVABLE_CRON_SECRET']
  const previousSecret = process.env['LOVABLE_CRON_SECRET_PREVIOUS']

  if (!currentSecret) {
    return new Response('Server configuration error', { status: 500 })
  }

  const match = /^Bearer ([^\s,]+)$/.exec(
    request.headers.get('authorization') ?? '',
  )
  const token = match?.[1]
  if (!token) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { createHash, timingSafeEqual } = await import('node:crypto')
  const digest = (value: string) =>
    createHash('sha256').update(value, 'utf8').digest()
  const providedDigest = digest(token)
  const currentMatches = timingSafeEqual(providedDigest, digest(currentSecret))
  const previousMatches = timingSafeEqual(
    providedDigest,
    digest(previousSecret ?? currentSecret),
  )

  if (!currentMatches && !previousMatches) {
    return new Response('Unauthorized', { status: 401 })
  }

  return null
}

```

# src/integrations/supabase/previewAuthStorage.ts

```ts
// This file is automatically generated. Do not edit it directly.

// On a Lovable preview surface, broker the auth session to the editor over
// postMessage so the project's preview surfaces share one login; else localStorage.
export function brokeredPreviewStorage() {
  if (typeof window === 'undefined') return undefined;
  const host = location.hostname;
  const PREVIEW_ZONES = ['lovableproject.com', 'lovableproject-dev.com', 'lovable.app', 'gpt-eng.com', 'gptengineer.run'];
  const onPreviewZone = PREVIEW_ZONES.some((z) => host === z || host.endsWith('.' + z));
  // Read the id only from non-user-controlled host positions, so a user-named
  // preview--<name> host can't smuggle another project's id.
  const UUID = '[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}';
  const projectId = onPreviewZone
    ? (host.match(new RegExp('^(?:id-preview(?:-[a-z0-9]+)?|project)--(' + UUID + ')(?:-dev)?(?=\\.|$)', 'i'))?.[1]
        ?? host.match(new RegExp('^(' + UUID + ')(?=[.-])', 'i'))?.[1])
    : undefined;
  const framed = window.parent && window.parent !== window;
  if (!projectId || !framed) return localStorage;

  // Post only to the real editor ancestor, validated as a Lovable origin, so the
  // session token can never reach an untrusted embedder.
  const dev = host.endsWith('.lovableproject-dev.com') || host.endsWith('.gpt-eng.com');
  const EDITOR = dev
    ? /^https:\/\/([a-z0-9-]+\.)*(lovable\.dev|gptengineer\.app)$|^http:\/\/localhost:3000$/
    : /^https:\/\/([a-z0-9-]+\.)*(lovable\.dev|gptengineer\.app)$/;
  const ancestor = (location.ancestorOrigins && location.ancestorOrigins[0]) || (document.referrer ? new URL(document.referrer).origin : '');
  const editorOrigins = ancestor && EDITOR.test(ancestor)
    ? [ancestor]
    : (dev ? ['https://lovable.dev', 'http://localhost:3000'] : ['https://lovable.dev']);
  const RESULT = 'lovable-preview-auth:result';
  const TIMEOUT = 2000;
  const newId = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

  const request = (type: string, key: string, value?: string): Promise<{ ok: boolean; value?: string | null } | null> =>
    new Promise((resolve) => {
      const requestId = newId();
      let done = false;
      let timer: ReturnType<typeof setTimeout>;
      const finish = (r: { ok: boolean; value?: string | null } | null) => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        window.removeEventListener('message', onMessage);
        resolve(r);
      };
      const onMessage = (e: MessageEvent) => {
        if (editorOrigins.indexOf(e.origin) < 0) return;
        const d = e.data;
        if (d && d.type === RESULT && d.requestId === requestId) finish(d);
      };
      window.addEventListener('message', onMessage);
      const msg: Record<string, unknown> = { type, requestId, projectId, key };
      if (value !== undefined) msg['value'] = value;
      // targetOrigin per trusted editor origin, so a session token never reaches an arbitrary embedder.
      for (const origin of editorOrigins) window.parent.postMessage(msg, origin);
      timer = setTimeout(() => finish(null), TIMEOUT);
    });

  // The editor may not be listening yet at the first getItem, so retry once.
  let firstGet = true;
  const RETRY_DELAY = 250;

  return {
    getItem: async (key: string) => {
      let res = await request('lovable-preview-auth:get', key);
      if (!res && firstGet) {
        await new Promise((r) => setTimeout(r, RETRY_DELAY));
        res = await request('lovable-preview-auth:get', key);
      }
      firstGet = false;
      // '' is the logout tombstone: clear the local copy too so it can't resurrect if
      // the broker later goes silent. A null reply means never-synced -> keep local.
      if (res && res.ok && typeof res.value === 'string') {
        if (res.value === '') { localStorage.removeItem(key); return null; }
        return res.value;
      }
      return localStorage.getItem(key);
    },
    setItem: (key: string, value: string) => {
      localStorage.setItem(key, value);
      return request('lovable-preview-auth:set', key, value).then((res) => {
        if (res && res.ok && typeof res.value === 'string' && localStorage.getItem(key) === value) {
          if (res.value === '') localStorage.removeItem(key);
          else localStorage.setItem(key, res.value);
        }
      });
    },
    removeItem: (key: string) => {
      localStorage.removeItem(key);
      return request('lovable-preview-auth:remove', key).then(() => undefined);
    },
  };
}

```

# src/integrations/supabase/types.ts

```ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      adviser_links: {
        Row: {
          adviser_email: string
          created_at: string
          id: string
          student_id: string
        }
        Insert: {
          adviser_email: string
          created_at?: string
          id?: string
          student_id: string
        }
        Update: {
          adviser_email?: string
          created_at?: string
          id?: string
          student_id?: string
        }
        Relationships: []
      }
      application_documents: {
        Row: {
          application_id: string
          document_id: string
          user_id: string
        }
        Insert: {
          application_id: string
          document_id: string
          user_id: string
        }
        Update: {
          application_id?: string
          document_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          adviser_comment: string
          created_at: string
          id: string
          priority: number
          programme_id: string
          shortlisted: boolean
          status: string
          tier: string
          updated_at: string
          user_id: string
        }
        Insert: {
          adviser_comment?: string
          created_at?: string
          id?: string
          priority?: number
          programme_id: string
          shortlisted?: boolean
          status?: string
          tier?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          adviser_comment?: string
          created_at?: string
          id?: string
          priority?: number
          programme_id?: string
          shortlisted?: boolean
          status?: string
          tier?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_programme_id_fkey"
            columns: ["programme_id"]
            isOneToOne: false
            referencedRelation: "programmes"
            referencedColumns: ["id"]
          },
        ]
      }
      deadlines: {
        Row: {
          created_at: string
          due_date: string
          id: string
          label: string
          owner_id: string | null
          programme_id: string | null
        }
        Insert: {
          created_at?: string
          due_date: string
          id?: string
          label: string
          owner_id?: string | null
          programme_id?: string | null
        }
        Update: {
          created_at?: string
          due_date?: string
          id?: string
          label?: string
          owner_id?: string | null
          programme_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deadlines_programme_id_fkey"
            columns: ["programme_id"]
            isOneToOne: false
            referencedRelation: "programmes"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string
          doc_type: string
          file_name: string
          file_path: string
          id: string
          link: string
          notes: string
          status: string
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          doc_type?: string
          file_name?: string
          file_path?: string
          id?: string
          link?: string
          notes?: string
          status?: string
          title: string
          user_id: string
        }
        Update: {
          created_at?: string
          doc_type?: string
          file_name?: string
          file_path?: string
          id?: string
          link?: string
          notes?: string
          status?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      notes: {
        Row: {
          application_id: string
          body: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          application_id: string
          body: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          application_id?: string
          body?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notes_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          currency: string
          display_name: string | null
          gpa: string
          gpa_scale: string
          id: string
          plan: string
          role: string
          target_intake: string
        }
        Insert: {
          created_at?: string
          currency?: string
          display_name?: string | null
          gpa?: string
          gpa_scale?: string
          id: string
          plan?: string
          role?: string
          target_intake?: string
        }
        Update: {
          created_at?: string
          currency?: string
          display_name?: string | null
          gpa?: string
          gpa_scale?: string
          id?: string
          plan?: string
          role?: string
          target_intake?: string
        }
        Relationships: []
      }
      programmes: {
        Row: {
          application_fee: number
          created_at: string
          currency: string
          degree: string
          duration_months: number
          english_test: string
          id: string
          intake: string
          interview: boolean
          min_gpa: number | null
          name: string
          owner_id: string | null
          portfolio_required: boolean
          references_required: number
          study_mode: string
          summary: string
          tuition: number
          university_id: string
        }
        Insert: {
          application_fee?: number
          created_at?: string
          currency?: string
          degree?: string
          duration_months?: number
          english_test?: string
          id?: string
          intake?: string
          interview?: boolean
          min_gpa?: number | null
          name: string
          owner_id?: string | null
          portfolio_required?: boolean
          references_required?: number
          study_mode?: string
          summary?: string
          tuition?: number
          university_id: string
        }
        Update: {
          application_fee?: number
          created_at?: string
          currency?: string
          degree?: string
          duration_months?: number
          english_test?: string
          id?: string
          intake?: string
          interview?: boolean
          min_gpa?: number | null
          name?: string
          owner_id?: string | null
          portfolio_required?: boolean
          references_required?: number
          study_mode?: string
          summary?: string
          tuition?: number
          university_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "programmes_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      requirements: {
        Row: {
          created_at: string
          detail: string
          doc_type: string | null
          id: string
          label: string
          owner_id: string | null
          programme_id: string
        }
        Insert: {
          created_at?: string
          detail?: string
          doc_type?: string | null
          id?: string
          label: string
          owner_id?: string | null
          programme_id: string
        }
        Update: {
          created_at?: string
          detail?: string
          doc_type?: string | null
          id?: string
          label?: string
          owner_id?: string | null
          programme_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "requirements_programme_id_fkey"
            columns: ["programme_id"]
            isOneToOne: false
            referencedRelation: "programmes"
            referencedColumns: ["id"]
          },
        ]
      }
      status_records: {
        Row: {
          application_id: string
          created_at: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          application_id: string
          created_at?: string
          id?: string
          status: string
          user_id: string
        }
        Update: {
          application_id?: string
          created_at?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "status_records_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          application_id: string | null
          created_at: string
          done: boolean
          due_date: string | null
          id: string
          title: string
          user_id: string
        }
        Insert: {
          application_id?: string | null
          created_at?: string
          done?: boolean
          due_date?: string | null
          id?: string
          title: string
          user_id: string
        }
        Update: {
          application_id?: string | null
          created_at?: string
          done?: boolean
          due_date?: string | null
          id?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      universities: {
        Row: {
          city: string
          country: string
          created_at: string
          id: string
          name: string
          owner_id: string | null
        }
        Insert: {
          city?: string
          country?: string
          created_at?: string
          id?: string
          name: string
          owner_id?: string | null
        }
        Update: {
          city?: string
          country?: string
          created_at?: string
          id?: string
          name?: string
          owner_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_adviser_for: { Args: { _student: string }; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

```

# src/lib/atlas.ts

```ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type University = { id: string; name: string; country: string; city: string; owner_id: string | null };
export type Programme = {
  id: string; owner_id: string | null; university_id: string; name: string; degree: string;
  duration_months: number; tuition: number; currency: string; intake: string; study_mode: string;
  min_gpa: number | null; english_test: string; references_required: number; portfolio_required: boolean;
  interview: boolean; application_fee: number; summary: string;
  universities?: University | null;
};
export type Requirement = { id: string; programme_id: string; label: string; detail: string; doc_type: string | null; owner_id: string | null };
export type Deadline = { id: string; programme_id: string | null; label: string; due_date: string; owner_id: string | null };
export type Application = {
  id: string; user_id: string; programme_id: string; status: string; priority: number;
  shortlisted: boolean; adviser_comment: string; updated_at: string; tier?: string;
};
export type Doc = { id: string; user_id: string; title: string; doc_type: string; status: string; link: string; notes: string; file_path: string; file_name: string };
export type AppDoc = { application_id: string; document_id: string; user_id: string };
export type Task = { id: string; user_id: string; application_id: string | null; title: string; due_date: string | null; done: boolean };
export type Note = { id: string; application_id: string; body: string; created_at: string; user_id: string };

export const STATUSES = [
  { value: "researching", label: "Researching" },
  { value: "preparing", label: "Preparing" },
  { value: "submitted", label: "Submitted" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "declined", label: "Not proceeding" },
] as const;
export const DOC_TYPES = [
  { value: "transcript", label: "Transcript" },
  { value: "statement", label: "Statement" },
  { value: "reference", label: "Reference" },
  { value: "cv", label: "CV" },
  { value: "english", label: "English test" },
  { value: "portfolio", label: "Portfolio" },
  { value: "other", label: "Other" },
] as const;
export const DOC_STATUSES = [
  { value: "not_started", label: "Not started" },
  { value: "drafting", label: "Drafting" },
  { value: "review", label: "In review" },
  { value: "ready", label: "Ready" },
] as const;
export const label = (list: readonly { value: string; label: string }[], v: string) =>
  list.find((x) => x.value === v)?.label ?? v;

export async function currentUserId() {
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new Error("Not signed in");
  return data.user.id;
}

function must<T>(r: { data: T | null; error: { message: string } | null }): T {
  if (r.error) throw new Error(r.error.message);
  return r.data as T;
}

export type Workspace = {
  userId: string;
  programmes: Programme[];
  requirements: Requirement[];
  deadlines: Deadline[];
  applications: Application[];
  documents: Doc[];
  links: AppDoc[];
  tasks: Task[];
};

export async function loadWorkspace(userId?: string): Promise<Workspace> {
  const uid = userId ?? (await currentUserId());
  const [p, r, d, a, docs, l, t] = await Promise.all([
    supabase.from("programmes").select("*, universities(*)").order("name"),
    supabase.from("requirements").select("*"),
    supabase.from("deadlines").select("*").order("due_date"),
    supabase.from("applications").select("*").eq("user_id", uid),
    supabase.from("documents").select("*").eq("user_id", uid).order("created_at"),
    supabase.from("application_documents").select("*").eq("user_id", uid),
    supabase.from("tasks").select("*").eq("user_id", uid).order("due_date", { nullsFirst: false }),
  ]);
  return {
    userId: uid,
    programmes: must(p) as Programme[],
    requirements: must(r) as Requirement[],
    deadlines: must(d) as Deadline[],
    applications: must(a) as Application[],
    documents: must(docs) as Doc[],
    links: must(l) as AppDoc[],
    tasks: must(t) as Task[],
  };
}

export function useWorkspace() {
  return useQuery({ queryKey: ["workspace"], queryFn: () => loadWorkspace() });
}
export function useRefresh() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries();
}

export function readiness(ws: Pick<Workspace, "requirements" | "documents" | "links">, app: Application) {
  const reqs = ws.requirements.filter((r) => r.programme_id === app.programme_id);
  const linked = ws.links
    .filter((l) => l.application_id === app.id)
    .map((l) => ws.documents.find((d) => d.id === l.document_id))
    .filter(Boolean) as Doc[];
  const items = reqs.map((r) => {
    const doc = linked.find((d) => r.doc_type && d.doc_type === r.doc_type);
    return { requirement: r, doc, ready: doc?.status === "ready" };
  });
  const ready = items.filter((i) => i.ready).length;
  return { items, ready, total: items.length, pct: items.length ? Math.round((ready / items.length) * 100) : 0 };
}

export function daysUntil(date: string) {
  const d = new Date(date + "T00:00:00");
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - now.getTime()) / 86400000);
}
export function formatDate(date: string | null) {
  if (!date) return "—";
  return new Date(date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
export function money(n: number, c: string) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(n);
}
export function nextDeadline(ws: Pick<Workspace, "deadlines">, programmeId: string) {
  return ws.deadlines
    .filter((d) => d.programme_id === programmeId && daysUntil(d.due_date) >= 0)
    .sort((a, b) => a.due_date.localeCompare(b.due_date))[0];
}

export function downloadFile(name: string, content: string, type = "text/csv") {
  const body = type === "text/csv" ? "\uFEFF" + content : content;
  const blob = new Blob([body], { type: `${type};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { a.remove(); URL.revokeObjectURL(url); }, 1500);
}

// Approximate fixed exchange rates to HKD (for planning only)
export const RATES_TO_HKD: Record<string, number> = { HKD: 1, GBP: 10.2, USD: 7.8, EUR: 8.5, SGD: 5.9, AUD: 5.1, CAD: 5.7, CNY: 1.08, JPY: 0.052, CHF: 8.9 };
export const DISPLAY_CURRENCIES = ["original", "HKD", "USD", "GBP", "EUR", "SGD", "AUD", "CNY"] as const;
export function convert(n: number, from: string, to: string) {
  const a = RATES_TO_HKD[from], b = RATES_TO_HKD[to];
  if (!a || !b) return null;
  return (n * a) / b;
}

export function gpaGap(userGpa: string | null | undefined, minGpa: number | null) {
  const g = parseFloat(userGpa ?? "");
  if (!minGpa || isNaN(g)) return null;
  return g < minGpa ? { user: g, min: minGpa } : null;
}
export function toCsv(rows: (string | number)[][]) {
  return rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
}

export const TIERS = [
  { value: "reach", label: "Reach" },
  { value: "target", label: "Target" },
  { value: "safety", label: "Safety" },
] as const;

```

# src/lib/error-capture.ts

```ts
// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.

let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 5_000;

function record(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
}

// h3's HTTPError serializes to {"status":500,"unhandled":true,"message":"HTTPError"} —
// no stack, no cause — so a plain console.error(error) reaches the log pipeline with
// the failure detail stripped. Expand Error-like args into a string that keeps the
// message, stack, and the full cause chain.
const CAUSE_DEPTH_LIMIT = 5;
const DESCRIPTION_LENGTH_LIMIT = 8_000;

export function describeError(error: unknown): string {
  const parts: string[] = [];
  let current: unknown = error;
  for (let depth = 0; depth < CAUSE_DEPTH_LIMIT && current != null; depth++) {
    if (!(current instanceof Error)) {
      parts.push(typeof current === "string" ? current : safeStringify(current));
      break;
    }
    const label = depth === 0 ? "" : "caused by: ";
    const status = describeStatus(current);
    parts.push(`${label}${current.stack ?? `${current.name}: ${current.message}`}${status}`);
    current = current.cause;
  }
  return parts.join("\n").slice(0, DESCRIPTION_LENGTH_LIMIT);
}

function describeStatus(error: Error): string {
  const { status, statusCode } = error as { status?: unknown; statusCode?: unknown };
  const value = status ?? statusCode;
  return typeof value === "number" ? ` (status ${value})` : "";
}

function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

function isErrorLike(value: unknown): value is Error {
  return value instanceof Error;
}

// Wrap console.error so errors logged by any layer — including h3's internal
// unhandled-error logging, which this file cannot hook directly — are both
// recorded for consumeLastCapturedError and expanded before serialization.
const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  const expanded = args.map((arg) => {
    if (!isErrorLike(arg)) return arg;
    record(arg);
    return describeError(arg);
  });
  originalConsoleError(...expanded);
};

if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}

```

# src/lib/error-page.ts

```ts
export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}

```

# src/lib/lovable-error-reporting.ts

```ts
type LovableErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type LovableEvents = {
  track?: (event: string, properties?: Record<string, unknown>) => string | null;
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: LovableErrorOptions,
  ) => void;
};

declare global {
  interface Window {
    __lovableEvents?: LovableEvents;
    __lovableReportRuntimeError?: (payload: {
      message: string;
      stack?: string;
      filename?: string;
    }) => void;
  }
}

export function reportLovableError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
  // Prod React does not rethrow boundary-caught errors to window.onerror, so the
  // editor's telemetry never sees them. Forward to lovable.js's reporting hook,
  // which is present only inside the editor preview.
  // Loaders and server fns commonly throw a raw Response; String(it) is the
  // opaque "[object Response]", so pull out the status and URL instead.
  const message =
    error instanceof Response
      ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
      : error instanceof Error
        ? error.message
        : String(error);
  const stack = error instanceof Error ? error.stack : undefined;
  window.__lovableReportRuntimeError?.({
    message,
    ...(stack !== undefined && { stack }),
    filename: window.location.pathname,
  });
}

```

# src/lib/plans.ts

```ts
export type PlanCurrency = "HKD" | "GBP" | "USD";

export const PLAN_CURRENCIES: { value: PlanCurrency; label: string }[] = [
  { value: "HKD", label: "HK$ (HKD)" },
  { value: "GBP", label: "£ (GBP)" },
  { value: "USD", label: "US$ (USD)" },
];

export const PLANS = [
  {
    id: "free", name: "Basic", tagline: "For getting organised", period: "forever", featured: false, maxProgrammes: 4,
    prices: { HKD: "HK$0", GBP: "£0", USD: "US$0" } as Record<PlanCurrency, string>,
    features: ["Up to 4 programmes", "Comparison table", "Deadline & task tracking", "Document tracker"],
  },
  {
    id: "season", name: "Season Pass", tagline: "For one full application season", period: "one-off, 12 months", featured: true, maxProgrammes: 999,
    prices: { HKD: "HK$150", GBP: "£15", USD: "US$19" } as Record<PlanCurrency, string>,
    features: ["Unlimited programmes", "CSV & printable summary export", "Adviser review sharing", "Shortlist & action plan"],
  },
  {
    id: "licence", name: "Adviser / University", tagline: "For careers & progression teams", period: "per student / season", featured: false, maxProgrammes: 999,
    prices: { HKD: "HK$60", GBP: "£6", USD: "US$8" } as Record<PlanCurrency, string>,
    features: ["Everything in Season Pass", "Review many students", "Team onboarding", "Invoice billing"],
  },
] as const;
export type PlanId = (typeof PLANS)[number]["id"];
export const planOf = (id: string | null | undefined) => PLANS.find((p) => p.id === id) ?? PLANS[0];

/** Display price for a plan in a currency (defaults to HKD). */
export function planPrice(plan: (typeof PLANS)[number], currency: string | null | undefined): string {
  const c = (currency ?? "HKD") as PlanCurrency;
  return plan.prices[c] ?? plan.prices.HKD;
}

```

# src/lib/programme-presets.ts

```ts
// Pre-loaded mock programme records used for keyword search + auto-fill.
// Figures are illustrative demo values, not official admissions data.
export type Preset = {
  university: string;
  acronym: string;
  country: string;
  name: string;
  degree: string;
  tuition: number;
  currency: string;
  english: string;
  intake: string;
  deadline: string; // YYYY-MM-DD
  keywords?: string;
};

export const PRESETS: Preset[] = [
  { university: "The Chinese University of Hong Kong", acronym: "CUHK", country: "Hong Kong", name: "Business Analytics", degree: "MSc", tuition: 390000, currency: "HKD", english: "IELTS 6.5 / TOEFL 79", intake: "September 2027", deadline: "2027-01-31", keywords: "analytics data" },
  { university: "The Chinese University of Hong Kong", acronym: "CUHK", country: "Hong Kong", name: "Finance", degree: "MSc", tuition: 430000, currency: "HKD", english: "IELTS 6.5 / TOEFL 79", intake: "September 2027", deadline: "2027-02-28", keywords: "finance investment" },
  { university: "The Chinese University of Hong Kong", acronym: "CUHK", country: "Hong Kong", name: "Marketing", degree: "MSc", tuition: 360000, currency: "HKD", english: "IELTS 6.5 / TOEFL 79", intake: "September 2027", deadline: "2027-03-15", keywords: "marketing brand" },
  { university: "The University of Hong Kong", acronym: "HKU", country: "Hong Kong", name: "Finance", degree: "Master", tuition: 462000, currency: "HKD", english: "IELTS 7.0 / TOEFL 100", intake: "September 2027", deadline: "2027-01-15", keywords: "mfin finance" },
  { university: "The University of Hong Kong", acronym: "HKU", country: "Hong Kong", name: "Computer Science", degree: "MSc", tuition: 288000, currency: "HKD", english: "IELTS 6.0 / TOEFL 80", intake: "September 2027", deadline: "2027-02-01", keywords: "computing cs" },
  { university: "Hong Kong University of Science and Technology", acronym: "HKUST", country: "Hong Kong", name: "Big Data Technology", degree: "MSc", tuition: 250000, currency: "HKD", english: "IELTS 6.5 / TOEFL 80", intake: "September 2027", deadline: "2027-03-31", keywords: "data science" },
  { university: "London School of Economics", acronym: "LSE", country: "United Kingdom", name: "Data Science", degree: "MSc", tuition: 36000, currency: "GBP", english: "IELTS 7.0 / TOEFL 100", intake: "September 2027", deadline: "2027-01-20", keywords: "data statistics" },
  { university: "London School of Economics", acronym: "LSE", country: "United Kingdom", name: "Finance", degree: "MSc", tuition: 44000, currency: "GBP", english: "IELTS 7.0 / TOEFL 100", intake: "September 2027", deadline: "2027-01-10", keywords: "finance" },
  { university: "Imperial College London", acronym: "Imperial", country: "United Kingdom", name: "Business Analytics", degree: "MSc", tuition: 42500, currency: "GBP", english: "IELTS 7.0 / TOEFL 100", intake: "September 2027", deadline: "2027-03-01", keywords: "analytics data" },
  { university: "University College London", acronym: "UCL", country: "United Kingdom", name: "Business Analytics", degree: "MSc", tuition: 38300, currency: "GBP", english: "IELTS 7.0 / TOEFL 100", intake: "September 2027", deadline: "2027-03-29", keywords: "analytics" },
  { university: "University of Edinburgh", acronym: "Edinburgh", country: "United Kingdom", name: "Marketing Analytics", degree: "MSc", tuition: 31300, currency: "GBP", english: "IELTS 7.0 / TOEFL 100", intake: "September 2027", deadline: "2027-04-30", keywords: "marketing analytics" },
  { university: "Columbia University", acronym: "Columbia", country: "United States", name: "Business Analytics", degree: "MSc", tuition: 68000, currency: "USD", english: "TOEFL 100 / IELTS 7.0", intake: "Fall 2027", deadline: "2027-02-15", keywords: "analytics" },
  { university: "National University of Singapore", acronym: "NUS", country: "Singapore", name: "Business Analytics", degree: "MSc", tuition: 58000, currency: "SGD", english: "IELTS 7.0 / TOEFL 100", intake: "August 2027", deadline: "2027-01-31", keywords: "analytics data" },
];

export function searchPresets(q: string): Preset[] {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return PRESETS.filter((p) => {
    const hay = `${p.acronym} ${p.university} ${p.degree} ${p.name} ${p.country} ${p.keywords ?? ""}`.toLowerCase();
    return terms.every((t) => hay.includes(t));
  }).slice(0, 8);
}

```

# src/lib/utils.ts

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

```

# src/router.tsx

```tsx
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};

```

# src/routes/__root.tsx

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { supabase } from "@/integrations/supabase/client";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "GradPath Atlas — Master's application planner" },
      { name: "description", content: "Compare master's programmes, track deadlines and organise application documents in one calm workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      if (event === "SIGNED_OUT") queryClient.clear();
      router.invalidate();
      if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
    });
    return () => data.subscription.unsubscribe();
  }, [queryClient, router]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}

```

# src/routes/_authenticated/adviser.tsx

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { loadWorkspace, readiness, label, STATUSES, TIERS, useRefresh } from "@/lib/atlas";
import { useProfile } from "@/components/AddProgramme";
import { Badge, Button, Card, Empty, Input, PageHeader, Progress, Textarea } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/adviser")({
  head: () => ({ meta: [{ title: "Adviser review — GradPath Atlas" }, { name: "description", content: "Share your plan with an adviser and read their feedback." }] }),
  component: Adviser,
});

function Adviser() {
  const profile = useProfile();
  const refresh = useRefresh();
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const uid = profile.data?.id;
  const myEmail = (profile.data?.email ?? "").toLowerCase();

  const myAdvisers = useQuery({
    queryKey: ["advisers", uid],
    enabled: !!uid,
    queryFn: async () => (await supabase.from("adviser_links").select("*").eq("student_id", uid!)).data ?? [],
  });
  const students = useQuery({
    queryKey: ["students", myEmail],
    enabled: !!myEmail,
    queryFn: async () => {
      const { data } = await supabase.from("adviser_links").select("*").ilike("adviser_email", myEmail);
      const links = (data ?? []).filter((l) => l.student_id !== uid);
      return Promise.all(links.map(async (l) => ({ id: l.student_id, ws: await loadWorkspace(l.student_id) })));
    },
  });

  async function invite(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const v = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(v)) return setErr("Enter a valid email address.");
    const { error } = await supabase.from("adviser_links").insert({ student_id: uid!, adviser_email: v });
    if (error) return setErr(error.message.includes("duplicate") ? "Already shared with this adviser." : error.message);
    setEmail("");
    myAdvisers.refetch();
  }
  async function revoke(id: string) {
    await supabase.from("adviser_links").delete().eq("id", id);
    myAdvisers.refetch();
  }

  return (
    <>
      <PageHeader title="Adviser review" description="Share read-only access with a mentor or careers adviser. They sign in with the email you add and can leave feedback." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="h-fit p-5">
          <h2 className="mb-3 font-serif text-lg">Share my plan</h2>
          <form onSubmit={invite} className="space-y-2">
            <label htmlFor="ae" className="text-sm font-medium">Adviser email</label>
            <Input id="ae" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="adviser@university.ac.uk" />
            {err && <p role="alert" className="text-sm text-destructive">{err}</p>}
            <Button type="submit">Share access</Button>
          </form>
          <ul className="mt-4 space-y-2 text-sm">
            {(myAdvisers.data ?? []).map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-2"><span>{a.adviser_email}</span><Button size="sm" variant="danger" onClick={() => revoke(a.id)}>Remove</Button></li>
            ))}
            {myAdvisers.data?.length === 0 && <li className="text-muted-foreground">Not shared with anyone yet.</li>}
          </ul>
        </Card>

        <div className="space-y-4 lg:col-span-2">
          <h2 className="font-serif text-lg">Students sharing with me</h2>
          {students.isLoading ? <p className="text-sm text-muted-foreground">Loading…</p> :
            !students.data?.length ? <Empty>No students have shared their plan with {myEmail || "you"} yet.</Empty> :
            students.data.map((s) => <StudentCard key={s.id} ws={s.ws} onSaved={() => { students.refetch(); refresh(); }} />)}
        </div>
      </div>
    </>
  );
}

function StudentCard({ ws, onSaved }: { ws: Awaited<ReturnType<typeof loadWorkspace>>; onSaved: () => void }) {
  return (
    <Card className="p-5">
      <p className="mb-3 text-sm text-muted-foreground">Student · {ws.applications.length} programmes · {ws.documents.filter((d) => d.status === "ready").length}/{ws.documents.length} documents ready · {ws.tasks.filter((t) => !t.done).length} open tasks</p>
      <ul className="space-y-4">
        {ws.applications.map((a) => {
          const p = ws.programmes.find((x) => x.id === a.programme_id);
          const r = readiness(ws, a);
          return <AppReview key={a.id} id={a.id} name={p?.name ?? "Custom programme"} uni={p?.universities?.name ?? ""} status={label(STATUSES, a.status)} tier={label(TIERS, a.tier ?? "target")} pct={r.pct} missing={r.items.filter((i) => !i.ready).map((i) => i.requirement.label)} comment={a.adviser_comment} onSaved={onSaved} />;
        })}
      </ul>
    </Card>
  );
}

function AppReview(p: { id: string; name: string; uni: string; status: string; tier: string; pct: number; missing: string[]; comment: string; onSaved: () => void }) {
  const [c, setC] = useState(p.comment);
  const [saved, setSaved] = useState(false);
  async function save() {
    await supabase.from("applications").update({ adviser_comment: c }).eq("id", p.id);
    setSaved(true);
    p.onSaved();
  }
  return (
    <li className="rounded-md border border-border p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-medium">{p.name} <span className="text-sm text-muted-foreground">{p.uni}</span></p>
        <div className="flex gap-1"><Badge tone="info">{p.status}</Badge><Badge>{p.tier}</Badge></div>
      </div>
      <div className="my-2 max-w-xs"><Progress value={p.pct} label={`${p.name} readiness`} /></div>
      {p.missing.length > 0 && <p className="text-xs text-muted-foreground">Missing: {p.missing.join(", ")}</p>}
      <label htmlFor={`c-${p.id}`} className="mt-2 block text-sm font-medium">Feedback</label>
      <Textarea id={`c-${p.id}`} rows={2} value={c} onChange={(e) => { setC(e.target.value); setSaved(false); }} />
      <div className="mt-2 flex items-center gap-2"><Button size="sm" onClick={save}>Save feedback</Button>{saved && <span className="text-xs text-muted-foreground">Saved</span>}</div>
    </li>
  );
}

```

# src/routes/_authenticated/compare.tsx

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useWorkspace, useRefresh, readiness, nextDeadline, formatDate, money, label, STATUSES, toCsv, downloadFile, daysUntil, convert, gpaGap, DISPLAY_CURRENCIES } from "@/lib/atlas";
import { AddProgramme, useProfile } from "@/components/AddProgramme";
import { Badge, Button, Empty, Input, PageHeader, Progress, Select } from "@/components/ui-kit";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/compare")({
  head: () => ({ meta: [{ title: "Compare programmes — GradPath Atlas" }, { name: "description", content: "Side-by-side programme requirements." }] }),
  component: Compare,
});

type SortKey = "name" | "university" | "tuition" | "deadline" | "readiness" | "priority";

function NotesCell({ appId, notes, onSaved }: { appId: string; notes: { id: string; body: string; application_id: string }[]; onSaved: () => void }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  async function add() {
    if (!text.trim()) return undefined;
    setBusy(true);
    const { data: u } = await supabase.auth.getUser();
    const { error } = await supabase.from("notes").insert({ application_id: appId, body: text.trim(), user_id: u.user!.id });
    setBusy(false);
    if (error) { toast.error(error.message); return undefined; }
    setText("");
    onSaved();
    return undefined;
  }
  return (
    <div className="space-y-1.5">
      {notes.slice(-3).map((n) => <p key={n.id} className="rounded bg-muted px-2 py-1 text-xs">{n.body}</p>)}
      <div className="flex gap-1">
        <Input aria-label="Add note" placeholder="Add a note…" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }} className="h-8 px-2 py-1 text-xs" />
        <Button size="sm" variant="outline" onClick={add} disabled={busy || !text.trim()}>Add</Button>
      </div>
    </div>
  );
}

function Compare() {
  const { data: ws, isLoading } = useWorkspace();
  const refresh = useRefresh();
  const profile = useProfile();
  const notes = useQuery({ queryKey: ["notes-all"], queryFn: async () => (await supabase.from("notes").select("id, body, application_id").order("created_at")).data ?? [] });
  const [cur, setCur] = useState("original");
  useEffect(() => { const c = (profile.data as { currency?: string } | undefined)?.currency; if (c) setCur(c); }, [profile.data]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [country, setCountry] = useState("all");
  const [onlyShortlist, setOnlyShortlist] = useState(false);
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: "deadline", dir: 1 });

  const rows = useMemo(() => {
    if (!ws) return [];
    return ws.applications
      .map((a) => {
        const p = ws.programmes.find((x) => x.id === a.programme_id)!;
        return p && { a, p, r: readiness(ws, a), d: nextDeadline(ws, p.id), reqs: ws.requirements.filter((r) => r.programme_id === p.id) };
      })
      .filter(Boolean)
      .filter((x) => {
        const s = `${x!.p.name} ${x!.p.universities?.name} ${x!.p.universities?.country}`.toLowerCase();
        return (!q || s.includes(q.toLowerCase())) && (status === "all" || x!.a.status === status) && (country === "all" || x!.p.universities?.country === country) && (!onlyShortlist || x!.a.shortlisted);
      })
      .sort((x, y) => {
        const v = (z: typeof x) => {
          switch (sort.key) {
            case "name": return z!.p.name;
            case "university": return z!.p.universities?.name ?? "";
            case "tuition": return z!.p.tuition;
            case "deadline": return z!.d?.due_date ?? "9999";
            case "readiness": return z!.r.pct;
            case "priority": return z!.a.priority;
          }
        };
        const A = v(x), B = v(y);
        return (A < B ? -1 : A > B ? 1 : 0) * sort.dir;
      }) as NonNullable<ReturnType<typeof Object>>[] as {
        a: import("@/lib/atlas").Application; p: import("@/lib/atlas").Programme; r: ReturnType<typeof readiness>;
        d: import("@/lib/atlas").Deadline | undefined; reqs: import("@/lib/atlas").Requirement[];
      }[];
  }, [ws, q, status, country, onlyShortlist, sort]);

  if (isLoading || !ws) return <p className="text-muted-foreground">Loading…</p>;
  const countries = Array.from(new Set(ws.applications.map((a) => ws.programmes.find((p) => p.id === a.programme_id)?.universities?.country).filter(Boolean))) as string[];

  async function removeProgramme(appId: string, name: string) {
    if (!window.confirm(`Remove "${name}" from your plan? This also deletes its notes and document links.`)) return;
    const { error } = await supabase.from("applications").delete().eq("id", appId);
    if (error) { toast.error(error.message); return; }
    toast.success(`Removed ${name}`);
    refresh();
  }

  function showMoney(n: number, c: string) {
    if (cur === "original" || cur === c) return money(n, c);
    const v = convert(n, c, cur);
    return v == null ? money(n, c) : `≈ ${money(v, cur)}`;
  }

  function exportCsv() {
    toast.success("CSV downloaded");
    downloadFile("gradpath-comparison.csv", toCsv([
      ["Programme", "Degree", "University", "Country", "Tuition", "Currency", "Duration (months)", "Intake", "Min GPA", "English", "References", "Portfolio", "Interview", "Next deadline", "Status", "Priority", "Shortlisted", "Readiness %"],
      ...rows.map(({ a, p, r, d }) => [p.name, p.degree, p.universities?.name ?? "", p.universities?.country ?? "", p.tuition, p.currency, p.duration_months, p.intake, p.min_gpa ?? "", p.english_test, p.references_required, p.portfolio_required ? "Yes" : "No", p.interview ? "Yes" : "No", d?.due_date ?? "", label(STATUSES, a.status), a.priority, a.shortlisted ? "Yes" : "No", r.pct]),
    ]));
  }

  const Th = ({ k, children, className = "" }: { k?: SortKey; children: React.ReactNode; className?: string }) => (
    <th scope="col" className={`whitespace-nowrap bg-secondary px-4 py-3 text-left text-xs font-medium text-muted-foreground ${className}`}
      aria-sort={k && sort.key === k ? (sort.dir === 1 ? "ascending" : "descending") : undefined}>
      {k ? (
        <button className="inline-flex items-center gap-1 hover:text-foreground" onClick={() => setSort((s) => ({ key: k, dir: s.key === k ? (s.dir === 1 ? -1 : 1) : 1 }))}>
          {children}<span aria-hidden>{sort.key === k ? (sort.dir === 1 ? "↑" : "↓") : "↕"}</span>
        </button>
      ) : children}
    </th>
  );

  return (
    <>
      <PageHeader title="Compare programmes" description="Requirements, costs and readiness side by side. Click a column heading to sort."
        actions={<><Button variant="outline" onClick={exportCsv} disabled={!rows.length}>Export CSV</Button><AddProgramme ws={ws} onDone={refresh} /></>} />

      <div className="mb-4 flex flex-wrap items-end gap-3">
        <div className="w-72"><label htmlFor="q" className="sr-only">Search</label><Input id="q" placeholder="Search programme, university, country…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div><label htmlFor="st" className="sr-only">Status</label><Select id="st" value={status} onChange={(e) => setStatus(e.target.value)} className="w-44"><option value="all">All statuses</option>{STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}</Select></div>
        <div><label htmlFor="co" className="sr-only">Country</label><Select id="co" value={country} onChange={(e) => setCountry(e.target.value)} className="w-44"><option value="all">All countries</option>{countries.map((c) => <option key={c}>{c}</option>)}</Select></div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={onlyShortlist} onChange={(e) => setOnlyShortlist(e.target.checked)} className="h-4 w-4 accent-primary" />Shortlisted only</label>
        <div className="flex items-center gap-2"><label htmlFor="cur" className="text-sm text-muted-foreground">Show fees in</label><Select id="cur" value={cur} onChange={(e) => setCur(e.target.value)} className="w-36">{DISPLAY_CURRENCIES.map((c) => <option key={c} value={c}>{c === "original" ? "Original" : c}</option>)}</Select></div>
      </div>

      {ws.applications.length === 0 ? <Empty>Add programmes to start comparing.</Empty> : rows.length === 0 ? <Empty>No programmes match these filters.</Empty> : (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full min-w-[1200px] text-sm">
            <caption className="sr-only">Programme comparison</caption>
            <thead>
              <tr>
                <Th k="name" className="sticky left-0 z-10">Programme</Th>
                <Th k="university">University</Th>
                <Th k="tuition">Tuition</Th>
                <Th>Length · Intake</Th>
                <Th>Min GPA</Th>
                <Th>English</Th>
                <Th>Refs</Th>
                <Th>Extras</Th>
                <Th k="deadline">Next deadline</Th>
                <Th>Status</Th>
                <Th k="priority">Priority</Th>
                <Th k="readiness" className="w-44">Required documents</Th>
                <Th>My notes</Th>
                <Th><span className="sr-only">Actions</span></Th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ a, p, r, d }) => (
                <tr key={a.id} className="border-t border-border align-top hover:bg-muted/50">
                  <th scope="row" className="sticky left-0 bg-card px-4 py-3 text-left font-normal">
                    <Link to="/programmes/$id" params={{ id: a.id }} className="font-medium hover:underline">{p.degree} {p.name}</Link>
                    {a.shortlisted && <span className="ml-2"><Badge tone="success">Shortlist</Badge></span>}
                  </th>
                  <td className="px-4 py-3">{p.universities?.name}<p className="text-xs text-muted-foreground">{p.universities?.country}</p></td>
                  <td className="px-4 py-3 tabular-nums">{showMoney(p.tuition, p.currency)}<p className="text-xs text-muted-foreground">Fee {showMoney(p.application_fee, p.currency)}</p>{cur !== "original" && cur !== p.currency && <p className="text-xs text-muted-foreground">({money(p.tuition, p.currency)})</p>}</td>
                  <td className="px-4 py-3">{p.duration_months} mo<p className="text-xs text-muted-foreground">{p.intake}</p></td>
                  <td className="px-4 py-3 tabular-nums">{p.min_gpa ?? "—"}{(() => { const g = gpaGap((profile.data as { gpa?: string } | undefined)?.gpa, p.min_gpa); return g && <p className="mt-1 max-w-[9rem] rounded bg-warning/20 px-1.5 py-0.5 text-xs text-foreground" title="Your GPA is below the listed minimum. Strong experience or test scores may still help.">⚠ Your GPA {g.user} is below {g.min}</p>; })()}</td>
                  <td className="px-4 py-3">{p.english_test || "—"}</td>
                  <td className="px-4 py-3 tabular-nums">{p.references_required}</td>
                  <td className="px-4 py-3 space-x-1">{p.portfolio_required && <Badge>Portfolio</Badge>}{p.interview && <Badge>Interview</Badge>}{!p.portfolio_required && !p.interview && "—"}</td>
                  <td className="px-4 py-3">{d ? <>{formatDate(d.due_date)}<p className="text-xs text-muted-foreground">{d.label} · {daysUntil(d.due_date)}d</p></> : "—"}</td>
                  <td className="px-4 py-3">{label(STATUSES, a.status)}</td>
                  <td className="px-4 py-3">{["", "High", "Medium", "Low"][a.priority]}</td>
                  <td className="px-4 py-3"><Progress value={r.pct} label={`${p.name} readiness`} /><p className="mt-1 text-xs text-muted-foreground">{r.ready}/{r.total} items ready</p></td>
                  <td className="px-4 py-3 w-64"><NotesCell appId={a.id} notes={(notes.data ?? []).filter((n) => n.application_id === a.id)} onSaved={() => notes.refetch()} /></td>
                  <td className="px-4 py-3">
                    <button type="button" onClick={() => removeProgramme(a.id, `${p.degree} ${p.name}`)}
                      aria-label={`Remove ${p.name}`} title="Remove from plan"
                      className="rounded p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">Catalogue universities and programmes are fictional demo data.</p>
    </>
  );
}

```

# src/routes/_authenticated/dashboard.tsx

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useWorkspace, useRefresh, readiness, daysUntil, formatDate, label, STATUSES } from "@/lib/atlas";
import { AddProgramme, useProfile } from "@/components/AddProgramme";
import { Badge, Card, DeadlineBadge, Empty, PageHeader, Progress } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — GradPath Atlas" }, { name: "description", content: "Your application planning overview." }] }),
  component: Dashboard,
});

function Dashboard() {
  const { data: ws, isLoading, error } = useWorkspace();
  const profile = useProfile();
  const refresh = useRefresh();

  const view = useMemo(() => {
    if (!ws) return null;
    const apps = ws.applications.map((a) => ({ a, p: ws.programmes.find((p) => p.id === a.programme_id)!, r: readiness(ws, a) })).filter((x) => x.p);
    const ids = new Set(ws.applications.map((a) => a.programme_id));
    const upcoming = ws.deadlines.filter((d) => d.programme_id && ids.has(d.programme_id) && daysUntil(d.due_date) >= 0).slice(0, 6);
    const missing = apps.flatMap((x) => x.r.items.filter((i) => !i.ready).map((i) => ({ prog: x.p, app: x.a, req: i.requirement, doc: i.doc })));
    const openTasks = ws.tasks.filter((t) => !t.done);
    const overall = apps.length ? Math.round(apps.reduce((s, x) => s + x.r.pct, 0) / apps.length) : 0;
    return { apps, upcoming, missing, openTasks, overall };
  }, [ws]);

  if (isLoading) return <p className="text-muted-foreground">Loading your workspace…</p>;
  if (error || !ws || !view) return <p className="text-destructive">Could not load your workspace.</p>;

  return (
    <>
      <PageHeader
        title={`Hello${profile.data?.display_name ? `, ${profile.data.display_name}` : ""}`}
        description="Your application season at a glance. Figures are planning aids only — they do not predict admission outcomes."
        actions={<AddProgramme ws={ws} onDone={refresh} />}
      />

      <div className="grid grid-cols-4 gap-4">
        {[
          ["Programmes tracked", ws.applications.length],
          ["Overall readiness", `${view.overall}%`],
          ["Upcoming deadlines", view.upcoming.length],
          ["Open tasks", view.openTasks.length],
        ].map(([k, v]) => (
          <Card key={k} className="p-5">
            <p className="text-sm text-muted-foreground">{k}</p>
            <p className="mt-2 font-serif text-4xl">{v}</p>
          </Card>
        ))}
      </div>

      {ws.applications.length === 0 ? (
        <div className="mt-8"><Empty>No programmes yet. Use <strong>Add programme</strong> to track one from the fictional demo catalogue or enter your own.</Empty></div>
      ) : (
        <div className="mt-8 grid grid-cols-[1.6fr_1fr] gap-6">
          <Card>
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="text-xl">Application progress</h2>
              <Link to="/compare" className="text-sm underline">Compare all</Link>
            </div>
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted-foreground"><tr><th className="px-5 py-2 font-medium">Programme</th><th className="px-3 py-2 font-medium">Status</th><th className="w-48 px-5 py-2 font-medium">Documents ready</th></tr></thead>
              <tbody>
                {view.apps.map(({ a, p, r }) => (
                  <tr key={a.id} className="border-t border-border">
                    <td className="px-5 py-3">
                      <Link to="/programmes/$id" params={{ id: a.id }} className="font-medium hover:underline">{p.degree} {p.name}</Link>
                      <p className="text-xs text-muted-foreground">{p.universities?.name}</p>
                    </td>
                    <td className="px-3 py-3"><Badge tone={a.status === "offer" ? "success" : a.status === "submitted" ? "info" : "neutral"}>{label(STATUSES, a.status)}</Badge></td>
                    <td className="px-5 py-3"><Progress value={r.pct} label={`${p.name} readiness`} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <div className="space-y-6">
            <Card>
              <div className="flex items-center justify-between border-b border-border px-5 py-4"><h2 className="text-xl">Next deadlines</h2><Link to="/deadlines" className="text-sm underline">All</Link></div>
              <ul className="divide-y divide-border">
                {view.upcoming.length === 0 && <li className="px-5 py-4 text-sm text-muted-foreground">Nothing upcoming.</li>}
                {view.upcoming.map((d) => {
                  const p = ws.programmes.find((x) => x.id === d.programme_id);
                  return (
                    <li key={d.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
                      <div><p className="font-medium">{p?.name}</p><p className="text-xs text-muted-foreground">{d.label} · {formatDate(d.due_date)}</p></div>
                      <DeadlineBadge days={daysUntil(d.due_date)} />
                    </li>
                  );
                })}
              </ul>
            </Card>
            <Card>
              <div className="border-b border-border px-5 py-4"><h2 className="text-xl">Missing items</h2></div>
              <ul className="max-h-72 divide-y divide-border overflow-y-auto">
                {view.missing.length === 0 && <li className="px-5 py-4 text-sm text-muted-foreground">Every requirement has a ready document. </li>}
                {view.missing.slice(0, 12).map((m) => (
                  <li key={m.app.id + m.req.id} className="px-5 py-3 text-sm">
                    <Link to="/programmes/$id" params={{ id: m.app.id }} className="font-medium hover:underline">{m.req.label}</Link>
                    <p className="text-xs text-muted-foreground">{m.prog.name} · {m.doc ? `linked, ${m.doc.status.replace("_", " ")}` : "no document linked"}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}

```

# src/routes/_authenticated/deadlines.tsx

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace, useRefresh, daysUntil, formatDate, toCsv, downloadFile } from "@/lib/atlas";
import { Button, Card, DeadlineBadge, Empty, Field, Input, PageHeader, Select } from "@/components/ui-kit";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/deadlines")({
  head: () => ({ meta: [{ title: "Deadlines & timeline — GradPath Atlas" }, { name: "description", content: "Every application deadline in date order." }] }),
  component: Deadlines,
});

function ics(items: { label: string; date: string }[]) {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//GradPath Atlas//EN"];
  items.forEach((i, n) => {
    const d = i.date.replace(/-/g, "");
    lines.push("BEGIN:VEVENT", `UID:${d}-${n}@gradpath`, `DTSTART;VALUE=DATE:${d}`, `SUMMARY:${i.label.replace(/[,;]/g, " ")}`, "END:VEVENT");
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

type CalItem = { id: string; date: string; label: string; sub: string; days: number };
function MonthCalendar({ items }: { items: CalItem[] }) {
  const first = items.find((i) => i.days >= 0)?.date ?? new Date().toISOString().slice(0, 10);
  const [cursor, setCursor] = useState(() => { const d = new Date(first + "T00:00:00"); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const [picked, setPicked] = useState<string | null>(null);
  const y = cursor.getFullYear(), m = cursor.getMonth();
  const startPad = (new Date(y, m, 1).getDay() + 6) % 7;
  const daysIn = new Date(y, m + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(startPad).fill(null), ...Array.from({ length: daysIn }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  const key = (d: number) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const today = new Date().toISOString().slice(0, 10);
  const pickedItems = picked ? items.filter((i) => i.date === picked) : [];
  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <Button size="sm" variant="ghost" onClick={() => setCursor(new Date(y, m - 1, 1))} aria-label="Previous month">‹ Prev</Button>
        <h2 className="font-serif text-lg">{cursor.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</h2>
        <Button size="sm" variant="ghost" onClick={() => setCursor(new Date(y, m + 1, 1))} aria-label="Next month">Next ›</Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <div key={d} className="py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const k = key(d);
          const its = items.filter((x) => x.date === k);
          return (
            <button key={i} type="button" onClick={() => setPicked(k)}
              className={`min-h-20 rounded-md border p-1 text-left text-xs ${picked === k ? "border-primary" : "border-border"} ${k === today ? "bg-secondary" : "bg-card"} hover:border-primary`}>
              <span className="font-medium">{d}</span>
              {its.slice(0, 2).map((x) => (
                <span key={x.id} className={`mt-1 block truncate rounded px-1 ${x.days < 0 ? "bg-muted text-muted-foreground" : x.days <= 14 ? "bg-destructive/15 text-destructive" : "bg-primary/10 text-primary"}`}>{x.label}</span>
              ))}
              {its.length > 2 && <span className="mt-1 block text-muted-foreground">+{its.length - 2} more</span>}
            </button>
          );
        })}
      </div>
      {picked && (
        <div className="mt-4 border-t border-border pt-3">
          <p className="mb-2 text-sm font-medium">{formatDate(picked)}</p>
          {pickedItems.length === 0 ? <p className="text-sm text-muted-foreground">No deadlines on this day.</p> : (
            <ul className="space-y-2">{pickedItems.map((x) => <li key={x.id} className="flex items-center justify-between text-sm"><span>{x.label} <span className="text-muted-foreground">· {x.sub}</span></span><DeadlineBadge days={x.days} /></li>)}</ul>
          )}
        </div>
      )}
    </Card>
  );
}

function Deadlines() {
  const { data: ws, isLoading } = useWorkspace();
  const refresh = useRefresh();
  const [prog, setProg] = useState("all");
  const [showPast, setShowPast] = useState(false);
  const [view, setView] = useState<"list" | "calendar">("list");
  const [f, setF] = useState({ label: "", date: "", programme: "" });
  const [err, setErr] = useState("");

  if (isLoading || !ws) return <p className="text-sm text-muted-foreground">Loading…</p>;
  const tracked = ws.applications.map((a) => ws.programmes.find((p) => p.id === a.programme_id)).filter(Boolean) as typeof ws.programmes;
  const ids = new Set(tracked.map((p) => p.id));
  const rows = ws.deadlines
    .filter((d) => (d.programme_id ? ids.has(d.programme_id) : d.owner_id === ws.userId))
    .filter((d) => prog === "all" || d.programme_id === prog)
    .map((d) => ({ d, days: daysUntil(d.due_date), p: tracked.find((p) => p.id === d.programme_id) }))
    .filter((x) => showPast || x.days >= 0)
    .sort((a, b) => a.d.due_date.localeCompare(b.d.due_date));

  const groups = new Map<string, typeof rows>();
  rows.forEach((r) => {
    const k = new Date(r.d.due_date + "T00:00:00").toLocaleDateString("en-GB", { month: "long", year: "numeric" });
    groups.set(k, [...(groups.get(k) ?? []), r]);
  });

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!f.label || !f.date) return setErr("Add a label and a date.");
    const { error } = await supabase.from("deadlines").insert({ label: f.label, due_date: f.date, programme_id: f.programme || null, owner_id: ws!.userId });
    if (error) return setErr(error.message);
    setF({ label: "", date: "", programme: "" });
    refresh();
  }
  async function remove(id: string) {
    await supabase.from("deadlines").delete().eq("id", id);
    refresh();
  }
  const exportItems = rows.map((r) => ({ label: `${r.p?.name ?? "Personal"} — ${r.d.label}`, date: r.d.due_date }));

  return (
    <>
      <PageHeader
        title="Deadlines & timeline"
        description="All deadlines for the programmes you track, soonest first."
        actions={<>
          <Button variant="outline" onClick={() => { downloadFile("deadlines.csv", toCsv([["Programme", "Deadline", "Date", "Days left"], ...rows.map((r) => [r.p?.name ?? "Personal", r.d.label, r.d.due_date, r.days])])); toast.success("CSV downloaded"); }}>Export CSV</Button>
          <Button variant="outline" onClick={() => downloadFile("deadlines.ics", ics(exportItems), "text/calendar")}>Add to calendar</Button>
        </>}
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="flex flex-wrap items-center gap-3">
            <label htmlFor="pf" className="text-sm text-muted-foreground">Programme</label>
            <Select id="pf" className="w-64" value={prog} onChange={(e) => setProg(e.target.value)}>
              <option value="all">All programmes</option>
              {tracked.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </Select>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="size-4" checked={showPast} onChange={(e) => setShowPast(e.target.checked)} />Show passed</label>
            <div role="group" aria-label="View" className="ml-auto inline-flex rounded-md border border-input p-0.5">
              {(["list", "calendar"] as const).map((v) => (
                <button key={v} type="button" aria-pressed={view === v} onClick={() => setView(v)}
                  className={`rounded px-3 py-1 text-sm ${view === v ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>{v === "list" ? "Timeline" : "Calendar"}</button>
              ))}
            </div>
          </div>
          {view === "calendar" ? <MonthCalendar items={rows.map((r) => ({ id: r.d.id, date: r.d.due_date, label: r.d.label, sub: r.p?.name ?? "Personal", days: r.days }))} /> :
          rows.length === 0 ? <Empty>No upcoming deadlines. Track a programme on the Compare page to see its dates.</Empty> : [...groups].map(([month, items]) => (
            <section key={month}>
              <h2 className="mb-2 font-serif text-lg">{month}</h2>
              <ol className="relative space-y-3 border-l border-border pl-5">
                {items.map(({ d, days, p }) => (
                  <li key={d.id} className="relative">
                    <span className={`absolute -left-[1.6rem] top-4 size-2.5 rounded-full ${days < 0 ? "bg-muted-foreground" : days <= 14 ? "bg-destructive" : "bg-primary"}`} aria-hidden />
                    <Card className="flex items-center justify-between gap-4 p-4">
                      <div>
                        <p className="font-medium">{d.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {p ? <Link to="/programmes/$id" params={{ id: p.id }} className="underline-offset-2 hover:underline">{p.name}</Link> : "Personal milestone"} · {formatDate(d.due_date)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <DeadlineBadge days={days} />
                        {d.owner_id === ws.userId && <Button size="sm" variant="danger" onClick={() => remove(d.id)}>Remove</Button>}
                      </div>
                    </Card>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
        <Card className="h-fit p-5">
          <h2 className="mb-3 font-serif text-lg">Add a milestone</h2>
          <form onSubmit={add} className="space-y-3">
            <Field label="What" htmlFor="dl"><Input id="dl" value={f.label} onChange={(e) => setF({ ...f, label: e.target.value })} placeholder="e.g. Ask referee for letter" /></Field>
            <Field label="Date" htmlFor="dd"><Input id="dd" type="date" value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} /></Field>
            <Field label="Programme (optional)" htmlFor="dp">
              <Select id="dp" value={f.programme} onChange={(e) => setF({ ...f, programme: e.target.value })}>
                <option value="">Personal</option>
                {tracked.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </Select>
            </Field>
            {err && <p role="alert" className="text-sm text-destructive">{err}</p>}
            <Button type="submit">Add milestone</Button>
          </form>
        </Card>
      </div>
    </>
  );
}

```

# src/routes/_authenticated/documents.tsx

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace, useRefresh, label, readiness, DOC_TYPES, DOC_STATUSES, type Doc } from "@/lib/atlas";
import { Badge, Button, Card, Empty, Field, Input, PageHeader, Select, Textarea } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/documents")({
  head: () => ({ meta: [{ title: "Document vault — GradPath Atlas" }, { name: "description", content: "Track CVs, statements, transcripts and references." }] }),
  component: Documents,
});

const blank = { title: "", doc_type: "cv", status: "not_started", link: "", notes: "", programme: "" };

function Documents() {
  const { data: ws, isLoading } = useWorkspace();
  const refresh = useRefresh();
  const [f, setF] = useState(blank);
  const [editing, setEditing] = useState<string | null>(null);
  const [err, setErr] = useState("");
  const [filter, setFilter] = useState("all");
  const [progFilter, setProgFilter] = useState("all");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  if (isLoading || !ws) return <p className="text-sm text-muted-foreground">Loading…</p>;
  const editingFile = editing ? ws.documents.find((d) => d.id === editing)?.file_name : "";

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!f.title.trim()) return setErr("Please give the document a title.");
    if (file && file.size > 20 * 1024 * 1024) return setErr("That file is larger than 20 MB.");
    setBusy(true);
    const { programme, ...docFields } = f;
    const payload: typeof docFields & { file_path?: string; file_name?: string } = { ...docFields };
    if (file) {
      const path = `${ws!.userId}/${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g, "_")}`;
      const up = await supabase.storage.from("documents").upload(path, file);
      if (up.error) { setBusy(false); return setErr(up.error.message); }
      const old = editing ? ws!.documents.find((d) => d.id === editing)?.file_path : "";
      if (old) await supabase.storage.from("documents").remove([old]);
      payload.file_path = path;
      payload.file_name = file.name;
    }
    const res = editing
      ? await supabase.from("documents").update(payload).eq("id", editing)
      : await supabase.from("documents").insert({ ...payload, title: f.title, user_id: ws!.userId }).select("id").single();
    if (res.error) { setBusy(false); return setErr(res.error.message); }
    const docId = editing ?? (res.data as { id: string } | null)?.id;
    if (docId) {
      const existing = ws!.links.filter((l) => l.document_id === docId).map((l) => l.application_id);
      if (programme && !existing.includes(programme)) {
        await supabase.from("application_documents").insert({ application_id: programme, document_id: docId, user_id: ws!.userId });
      }
      if (!programme && editing && existing.length) {
        await supabase.from("application_documents").delete().eq("document_id", docId);
      }
    }
    setBusy(false);
    setF(blank);
    setFile(null);
    (document.getElementById("fl") as HTMLInputElement | null)?.value && ((document.getElementById("fl") as HTMLInputElement).value = "");
    setEditing(null);
    refresh();
  }
  async function openFile(d: Doc) {
    const { data, error } = await supabase.storage.from("documents").createSignedUrl(d.file_path, 300);
    if (error || !data) return alert(error?.message ?? "Could not open file");
    window.open(data.signedUrl, "_blank", "noopener");
  }
  async function setStatus(d: Doc, status: string) {
    await supabase.from("documents").update({ status }).eq("id", d.id);
    refresh();
  }
  async function remove(d: Doc) {
    if (!confirm(`Delete “${d.title}”?`)) return;
    await supabase.from("application_documents").delete().eq("document_id", d.id);
    if (d.file_path) await supabase.storage.from("documents").remove([d.file_path]);
    await supabase.from("documents").delete().eq("id", d.id);
    refresh();
  }
  function usedBy(d: Doc) {
    return ws!.links
      .filter((l) => l.document_id === d.id)
      .map((l) => ws!.applications.find((a) => a.id === l.application_id))
      .map((a) => ws!.programmes.find((p) => p.id === a?.programme_id)?.name)
      .filter(Boolean);
  }
  const linkedTo = (d: Doc) => ws.links.filter((l) => l.document_id === d.id).map((l) => l.application_id);
  const docs = ws.documents
    .filter((d) => filter === "all" || d.doc_type === filter)
    .filter((d) => progFilter === "all" || (progFilter === "none" ? linkedTo(d).length === 0 : linkedTo(d).includes(progFilter)));
  const selApp = ws.applications.find((a) => a.id === progFilter);
  const neededFor = selApp ? readiness(ws, selApp).items : null;

  return (
    <>
      <PageHeader title="Document vault" description="Keep every application document in one place and see which programmes use it." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:order-2">
          <h2 className="mb-3 font-serif text-lg">{editing ? "Edit document" : "Add document"}</h2>
          <form onSubmit={save} className="space-y-3">
            <Field label="Title" htmlFor="t"><Input id="t" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="e.g. Personal statement v2" /></Field>
            <Field label="Type" htmlFor="ty">
              <Select id="ty" value={f.doc_type} onChange={(e) => setF({ ...f, doc_type: e.target.value })}>{DOC_TYPES.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}</Select>
            </Field>
            <Field label="Status" htmlFor="st">
              <Select id="st" value={f.status} onChange={(e) => setF({ ...f, status: e.target.value })}>{DOC_STATUSES.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}</Select>
            </Field>
            <Field label="Attach file from your device (optional)" htmlFor="fl" hint={editingFile ? `Current file: ${editingFile}. Choose a new one to replace it.` : "PDF, Word or image, up to 20 MB."}>
              <input id="fl" type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="block w-full text-sm file:mr-3 file:rounded-md file:border file:border-input file:bg-secondary file:px-3 file:py-1.5 file:text-sm" />
            </Field>
            <Field label="Link (optional)" htmlFor="ln" hint="Paste a Google Drive or OneDrive link."><Input id="ln" type="url" value={f.link} onChange={(e) => setF({ ...f, link: e.target.value })} /></Field>
            <Field label="Link to programme (optional)" htmlFor="pg" hint="Attach this document to one of your tracked programmes.">
              <Select id="pg" value={f.programme} onChange={(e) => setF({ ...f, programme: e.target.value })}>
                <option value="">— Not linked —</option>
                {ws!.applications.map((a) => <option key={a.id} value={a.id}>{ws!.programmes.find((p) => p.id === a.programme_id)?.name}</option>)}
              </Select>
            </Field>
            <Field label="Notes" htmlFor="nt"><Textarea id="nt" rows={2} value={f.notes} onChange={(e) => setF({ ...f, notes: e.target.value })} /></Field>
            {err && <p role="alert" className="text-sm text-destructive">{err}</p>}
            <div className="flex gap-2">
              <Button type="submit">{editing ? "Save changes" : "Add document"}</Button>
              {editing && <Button type="button" variant="ghost" onClick={() => { setEditing(null); setF(blank); }}>Cancel</Button>}
            </div>
          </form>
        </Card>

        <div className="space-y-3 lg:col-span-2">
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="flt" className="text-sm text-muted-foreground">Show</label>
            <Select id="flt" className="w-48" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All types</option>
              {DOC_TYPES.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
            </Select>
            <label htmlFor="pflt" className="text-sm text-muted-foreground">for</label>
            <Select id="pflt" className="w-64" value={progFilter} onChange={(e) => setProgFilter(e.target.value)}>
              <option value="all">All programmes</option>
              <option value="none">Not linked to any programme</option>
              {ws.applications.map((a) => <option key={a.id} value={a.id}>{ws.programmes.find((p) => p.id === a.programme_id)?.name}</option>)}
            </Select>
          </div>
          {neededFor && neededFor.length > 0 && (
            <Card className="p-4">
              <p className="mb-2 text-sm font-medium">Documents this programme needs</p>
              <ul className="space-y-1 text-sm">{neededFor.map((it, i) => <li key={i}>{it.ready ? "✓" : "○"} {it.requirement.label} <span className="text-muted-foreground">— {it.doc ? it.doc.title : "no document linked yet"}</span></li>)}</ul>
            </Card>
          )}
          {docs.length === 0 ? <Empty>No documents yet. Add your CV, statement, transcripts and references.</Empty> : docs.map((d) => (
            <Card key={d.id} className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{d.title} <span className="text-sm text-muted-foreground">· {label(DOC_TYPES, d.doc_type)}</span></p>
                  {d.notes && <p className="text-sm text-muted-foreground">{d.notes}</p>}
                  {d.file_path && <button type="button" onClick={() => openFile(d)} className="mr-3 text-sm text-primary underline">📎 {d.file_name || "Attached file"}</button>}
                  {d.link && <a href={d.link} target="_blank" rel="noreferrer" className="text-sm text-primary underline">Open link</a>}
                  <p className="mt-1 text-xs text-muted-foreground">Used for: {usedBy(d).join(", ") || "not linked yet — link it from a programme page"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={d.status === "ready" ? "success" : d.status === "review" ? "warning" : "neutral"}>{label(DOC_STATUSES, d.status)}</Badge>
                  <label className="sr-only" htmlFor={`s-${d.id}`}>Change status</label>
                  <Select id={`s-${d.id}`} className="h-8 w-32" value={d.status} onChange={(e) => setStatus(d, e.target.value)}>
                    {DOC_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </Select>
                  <Button size="sm" variant="ghost" onClick={() => { setEditing(d.id); setF({ title: d.title, doc_type: d.doc_type, status: d.status, link: d.link, notes: d.notes, programme: linkedTo(d)[0] ?? "" }); }}>Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => remove(d)}>Delete</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

```

# src/routes/_authenticated/programmes.$id.tsx

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useWorkspace, useRefresh, readiness, formatDate, money, daysUntil, label, STATUSES, DOC_TYPES, DOC_STATUSES, TIERS, convert, gpaGap, DISPLAY_CURRENCIES, type Note } from "@/lib/atlas";
import { useProfile } from "@/components/AddProgramme";
import { Badge, Button, Card, DeadlineBadge, Empty, Field, PageHeader, Progress, Select, Textarea } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/programmes/$id")({
  head: () => ({ meta: [{ title: "Programme detail — GradPath Atlas" }, { name: "description", content: "Requirements, notes, documents and status for one programme." }] }),
  component: ProgrammeDetail,
});

function ProgrammeDetail() {
  const { id } = Route.useParams();
  const { data: ws, isLoading } = useWorkspace();
  const refresh = useRefresh();
  const profile = useProfile();
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");
  const [cur, setCur] = useState<string>("");
  const [draft, setDraft] = useState<{ status: string; tier: string; priority: number; shortlisted: boolean } | null>(null);
  const [saving, setSaving] = useState(false);

  const app = ws?.applications.find((a) => a.id === id || a.programme_id === id);
  const notes = useQuery({
    queryKey: ["notes", app?.id],
    enabled: !!app,
    queryFn: async () => {
      const { data, error } = await supabase.from("notes").select("*").eq("application_id", app!.id).order("created_at", { ascending: false });
      if (error) throw error;
      return data as Note[];
    },
  });

  if (isLoading || !ws) return <p className="text-sm text-muted-foreground">Loading…</p>;
  const prog = ws.programmes.find((p) => p.id === (app?.programme_id ?? id));
  if (!prog) return <Empty>Programme not found. <Link to="/compare" className="underline">Back to compare</Link></Empty>;
  if (!app) return <Empty>You are not tracking this programme yet. Add it from <Link to="/compare" className="underline">Compare programmes</Link>.</Empty>;

  const r = readiness(ws, app);
  const deadlines = ws.deadlines.filter((d) => d.programme_id === prog.id);
  const linkedIds = new Set(ws.links.filter((l) => l.application_id === app.id).map((l) => l.document_id));
  const effCur = cur || ((profile.data as { currency?: string } | undefined)?.currency ?? "original");
  const showConverted = effCur !== "original" && effCur !== prog.currency;

  async function update(patch: { status?: string; tier?: string; priority?: number; shortlisted?: boolean; adviser_comment?: string }) {
    setErr("");
    const { error } = await supabase.from("applications").update(patch).eq("id", app!.id);
    if (error) setErr(error.message);
    refresh();
  }
  async function saveDraft() {
    if (!draft) return;
    setSaving(true);
    setErr("");
    const { error } = await supabase.from("applications").update(draft).eq("id", app!.id);
    setSaving(false);
    if (error) return setErr(error.message);
    setDraft(null);
    toast.success("Changes saved");
    refresh();
  }
  async function toggleDoc(docId: string) {
    if (linkedIds.has(docId)) await supabase.from("application_documents").delete().eq("application_id", app!.id).eq("document_id", docId);
    else await supabase.from("application_documents").insert({ application_id: app!.id, document_id: docId, user_id: ws!.userId });
    refresh();
  }
  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    if (!note.trim()) return;
    const { error } = await supabase.from("notes").insert({ application_id: app!.id, user_id: ws!.userId, body: note.trim() });
    if (error) return setErr(error.message);
    setNote("");
    notes.refetch();
  }
  async function delNote(nid: string) {
    await supabase.from("notes").delete().eq("id", nid);
    notes.refetch();
  }
  async function untrack() {
    if (!confirm("Stop tracking this programme? Notes and links for it will be removed.")) return;
    await supabase.from("notes").delete().eq("application_id", app!.id);
    await supabase.from("application_documents").delete().eq("application_id", app!.id);
    await supabase.from("tasks").update({ application_id: null }).eq("application_id", app!.id);
    await supabase.from("status_records").select("id").limit(0);
    const { error } = await supabase.from("applications").delete().eq("id", app!.id);
    if (error) return setErr("Could not remove: " + error.message);
    refresh();
    history.back();
  }

  return (
    <>
      <PageHeader
        title={prog.name}
        description={`${prog.degree} · ${prog.universities?.name ?? ""}${prog.universities?.country ? ", " + prog.universities.country : ""}`}
        actions={<Link to="/compare"><Button variant="outline">Back to compare</Button></Link>}
      />
      {err && <p role="alert" className="mb-4 text-sm text-destructive">{err}</p>}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-serif text-lg">Key facts</h2>
              <div className="flex items-center gap-2">
                <label htmlFor="cur" className="text-sm text-muted-foreground">Show fees in</label>
                <Select id="cur" value={effCur} onChange={(e) => setCur(e.target.value)} className="w-32">
                  {DISPLAY_CURRENCIES.map((c) => <option key={c} value={c}>{c === "original" ? "Original" : c}</option>)}
                </Select>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm md:grid-cols-3">
              {[
                ["Tuition", showConverted ? money(convert(prog.tuition, prog.currency, effCur) ?? prog.tuition, effCur) : money(prog.tuition, prog.currency)],
                ["Duration", `${prog.duration_months} months`],
                ["Intake", prog.intake],
                ["Mode", prog.study_mode],
                ["Min. GPA", prog.min_gpa ?? "—"],
                ["English", prog.english_test || "—"],
                ["References", prog.references_required],
                ["Portfolio", prog.portfolio_required ? "Required" : "No"],
                ["Interview", prog.interview ? "Yes" : "No"],
              ].map(([k, v]) => (
                <div key={String(k)}>
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                  {k === "Tuition" && showConverted && (
                    <p className="text-xs text-muted-foreground">≈ converted from {money(prog.tuition, prog.currency)} · approximate rate</p>
                  )}
                  {k === "Min. GPA" && (() => { const min = prog.min_gpa; if (min == null) return null; const g = gpaGap((profile.data as { gpa?: string } | undefined)?.gpa, min); return g && <p className="mt-1 max-w-[11rem] rounded bg-warning/20 px-1.5 py-0.5 text-xs text-foreground" title="Your GPA is below the listed minimum. Strong experience or test scores may still help.">⚠ Your GPA {g.user} is below {g.min}</p>; })()}
                </div>
              ))}
            </dl>
            {prog.summary && <p className="mt-4 text-sm text-muted-foreground">{prog.summary}</p>}
          </Card>

          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 className="font-serif text-lg">Requirements checklist</h2>
              <div className="w-48"><Progress value={r.pct} label="Readiness" /></div>
            </div>
            {r.items.length === 0 ? <p className="text-sm text-muted-foreground">No requirements listed.</p> : (
              <ul className="divide-y divide-border">
                {r.items.map((i) => (
                  <li key={i.requirement.id} className="flex items-start justify-between gap-4 py-3 text-sm">
                    <div>
                      <p className="font-medium">{i.requirement.label}</p>
                      {i.requirement.detail && <p className="text-muted-foreground">{i.requirement.detail}</p>}
                      <p className="text-xs text-muted-foreground">
                        {i.doc ? `Linked: ${i.doc.title}` : i.requirement.doc_type ? `Needs a ${label(DOC_TYPES, i.requirement.doc_type)} document` : "No document needed"}
                      </p>
                    </div>
                    {i.ready ? <Badge tone="success">Ready</Badge> : i.doc ? <Badge tone="warning">{label(DOC_STATUSES, i.doc.status)}</Badge> : <Badge tone="danger">Missing</Badge>}
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="p-5">
            <h2 className="mb-1 font-serif text-lg">Document attachments</h2>
            <p className="mb-3 text-sm text-muted-foreground">Tick the documents you will use for this programme. Documents marked “Ready” count towards readiness.</p>
            {ws.documents.length === 0 ? (
              <p className="text-sm">No documents yet. <Link to="/documents" className="underline">Add documents</Link></p>
            ) : (
              <ul className="space-y-2">
                {ws.documents.map((d) => (
                  <li key={d.id}>
                    <label className="flex items-center gap-3 text-sm">
                      <input type="checkbox" className="size-4" checked={linkedIds.has(d.id)} onChange={() => toggleDoc(d.id)} />
                      <span className="flex-1">{d.title} <span className="text-muted-foreground">· {label(DOC_TYPES, d.doc_type)}</span></span>
                      <Badge tone={d.status === "ready" ? "success" : "neutral"}>{label(DOC_STATUSES, d.status)}</Badge>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 font-serif text-lg">Personal notes</h2>
            <form onSubmit={addNote} className="mb-4 space-y-2">
              <label htmlFor="note" className="sr-only">New note</label>
              <Textarea id="note" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Ask about scholarship deadlines at open day" />
              <Button type="submit" size="sm">Add note</Button>
            </form>
            {notes.data?.length ? (
              <ul className="space-y-3">
                {notes.data.map((n) => (
                  <li key={n.id} className="rounded-md bg-secondary/60 p-3 text-sm">
                    <p className="whitespace-pre-wrap">{n.body}</p>
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>{new Date(n.created_at).toLocaleString("en-GB")}</span>
                      <button className="hover:text-destructive" onClick={() => delNote(n.id)}>Delete</button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : <p className="text-sm text-muted-foreground">No notes yet.</p>}
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="space-y-4 p-5">
            <h2 className="font-serif text-lg">Application status</h2>
            <Field label="Status" htmlFor="status">
              <Select id="status" value={draft?.status ?? app.status} onChange={(e) => setDraft({ status: e.target.value, tier: draft?.tier ?? app.tier ?? "target", priority: draft?.priority ?? app.priority, shortlisted: draft?.shortlisted ?? app.shortlisted })}>
                {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </Select>
            </Field>
            <Field label="Category" htmlFor="tier">
              <Select id="tier" value={draft?.tier ?? app.tier ?? "target"} onChange={(e) => setDraft({ status: draft?.status ?? app.status, tier: e.target.value, priority: draft?.priority ?? app.priority, shortlisted: draft?.shortlisted ?? app.shortlisted })}>
                {TIERS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </Select>
            </Field>
            <Field label="Priority" htmlFor="priority">
              <Select id="priority" value={draft?.priority ?? app.priority} onChange={(e) => setDraft({ status: draft?.status ?? app.status, tier: draft?.tier ?? app.tier ?? "target", priority: Number(e.target.value), shortlisted: draft?.shortlisted ?? app.shortlisted })}>
                <option value={1}>High</option><option value={2}>Medium</option><option value={3}>Low</option>
              </Select>
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="size-4" checked={draft?.shortlisted ?? app.shortlisted} onChange={(e) => setDraft({ status: draft?.status ?? app.status, tier: draft?.tier ?? app.tier ?? "target", priority: draft?.priority ?? app.priority, shortlisted: e.target.checked })} />
              On my shortlist
            </label>
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={saveDraft} disabled={!draft || saving}>{saving ? "Saving…" : "Save changes"}</Button>
              {draft && <Button size="sm" variant="ghost" onClick={() => setDraft(null)}>Discard</Button>}
            </div>
            <Button variant="danger" size="sm" onClick={untrack}>Stop tracking</Button>
          </Card>

          <Card className="p-5">
            <h2 className="mb-3 font-serif text-lg">Deadlines</h2>
            {deadlines.length === 0 ? <p className="text-sm text-muted-foreground">None listed.</p> : (
              <ul className="space-y-2 text-sm">
                {deadlines.map((d) => (
                  <li key={d.id} className="flex items-center justify-between gap-2">
                    <span>{d.label}<br /><span className="text-xs text-muted-foreground">{formatDate(d.due_date)}</span></span>
                    <DeadlineBadge days={daysUntil(d.due_date)} />
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {app.adviser_comment && (
            <Card className="p-5">
              <h2 className="mb-2 font-serif text-lg">Adviser feedback</h2>
              <p className="whitespace-pre-wrap text-sm">{app.adviser_comment}</p>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

```

# src/routes/_authenticated/route.tsx

```tsx
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

```

# src/routes/_authenticated/settings.tsx

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/components/AddProgramme";
import { PLANS, planOf, planPrice } from "@/lib/plans";
import { Badge, Button, Card, Field, Input, PageHeader, Select } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings — GradPath Atlas" }, { name: "description", content: "Academic profile defaults and plan." }] }),
  component: Settings,
});

type P = { display_name: string; gpa: string; gpa_scale: string; target_intake: string; currency: string };

function Settings() {
  const profile = useProfile();
  const qc = useQueryClient();
  const [f, setF] = useState<P>({ display_name: "", gpa: "", gpa_scale: "4.0", target_intake: "September 2027", currency: "GBP" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const d = profile.data as Partial<P> | undefined;
    if (d) setF({ display_name: d.display_name ?? "", gpa: d.gpa ?? "", gpa_scale: d.gpa_scale ?? "4.0", target_intake: d.target_intake ?? "September 2027", currency: d.currency ?? "GBP" });
  }, [profile.data]);

  if (!profile.data) return <p className="text-sm text-muted-foreground">Loading…</p>;
  const plan = planOf(profile.data.plan);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from("profiles").update(f).eq("id", profile.data!.id);
    setMsg(error ? error.message : "Saved.");
    qc.invalidateQueries({ queryKey: ["profile"] });
  }
  async function setPlan(id: string) {
    await supabase.from("profiles").update({ plan: id }).eq("id", profile.data!.id);
    qc.invalidateQueries({ queryKey: ["profile"] });
  }

  return (
    <>
      <PageHeader title="Settings" description={`Signed in as ${profile.data.email}`} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <h2 className="mb-4 font-serif text-lg">Academic profile</h2>
          <form onSubmit={save} className="space-y-4">
            <Field label="Display name" htmlFor="dn"><Input id="dn" value={f.display_name} onChange={(e) => setF({ ...f, display_name: e.target.value })} /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Your GPA / grade" htmlFor="gpa"><Input id="gpa" value={f.gpa} onChange={(e) => setF({ ...f, gpa: e.target.value })} placeholder="e.g. 3.6" /></Field>
              <Field label="GPA scale" htmlFor="gs">
                <Select id="gs" value={f.gpa_scale} onChange={(e) => setF({ ...f, gpa_scale: e.target.value })}>
                  <option value="4.0">4.0 scale</option><option value="4.3">4.3 scale</option><option value="5.0">5.0 scale</option><option value="100">Percentage (100)</option><option value="uk">UK classification</option>
                </Select>
              </Field>
            </div>
            <Field label="Target intake" htmlFor="ti">
              <Select id="ti" value={f.target_intake} onChange={(e) => setF({ ...f, target_intake: e.target.value })}>
                {["January 2027", "September 2027", "January 2028", "September 2028"].map((x) => <option key={x}>{x}</option>)}
              </Select>
            </Field>
            <Field label="Preferred currency" htmlFor="cur" hint="Used as your default when adding custom programmes.">
              <Select id="cur" value={f.currency} onChange={(e) => setF({ ...f, currency: e.target.value })}>
                {["GBP", "EUR", "USD", "HKD", "AUD", "CAD", "SGD"].map((x) => <option key={x}>{x}</option>)}
              </Select>
            </Field>
            <div className="flex items-center gap-3"><Button type="submit">Save profile</Button>{msg && <span role="status" className="text-sm text-muted-foreground">{msg}</span>}</div>
          </form>
        </Card>

        <Card className="p-5">
          <h2 className="mb-1 font-serif text-lg">Plan</h2>
          <p className="mb-4 text-sm text-muted-foreground">Current plan: <Badge tone="info">{plan.name}</Badge> — test mode, no payment is taken. <Link to="/pricing" className="underline">Compare plans</Link></p>
          <ul className="space-y-2">
            {PLANS.map((p) => (
              <li key={p.id} className="flex items-center justify-between rounded-md border border-border p-3 text-sm">
                <span><span className="font-medium">{p.name}</span> · {planPrice(p, f.currency)} {p.period}</span>
                {p.id === plan.id ? <Badge tone="success">Active</Badge> : <Button size="sm" variant="outline" onClick={() => setPlan(p.id)}>Switch (test)</Button>}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}

```

# src/routes/_authenticated/summary.tsx

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace, useRefresh, readiness, nextDeadline, formatDate, money, label, STATUSES, TIERS, toCsv, downloadFile } from "@/lib/atlas";
import { Badge, Button, Card, Empty, PageHeader, Progress, Select } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/summary")({
  head: () => ({ meta: [{ title: "Shortlist & strategy — GradPath Atlas" }, { name: "description", content: "Reach, target and safety plan with a printable report." }] }),
  component: Summary,
});

const tierHelp: Record<string, string> = {
  reach: "Ambitious choices where entry is competitive.",
  target: "Good fit for your profile.",
  safety: "Strong likelihood of an offer.",
};

function Summary() {
  const { data: ws, isLoading } = useWorkspace();
  const refresh = useRefresh();
  if (isLoading || !ws) return <p className="text-sm text-muted-foreground">Loading…</p>;

  const rows = ws.applications
    .map((a) => ({ a, p: ws.programmes.find((p) => p.id === a.programme_id)!, r: readiness(ws, a), nd: nextDeadline(ws, a.programme_id) }))
    .filter((x) => x.p)
    .sort((x, y) => x.a.priority - y.a.priority);
  const shortlisted = rows.filter((x) => x.a.shortlisted);

  async function setTier(id: string, tier: string) {
    await supabase.from("applications").update({ tier }).eq("id", id);
    refresh();
  }
  async function toggleShort(id: string, v: boolean) {
    await supabase.from("applications").update({ shortlisted: v }).eq("id", id);
    refresh();
  }
  function exportCsv() {
    downloadFile("application-strategy.csv", toCsv([
      ["Programme", "University", "Category", "Shortlisted", "Status", "Readiness %", "Next deadline", "Tuition"],
      ...rows.map((x) => [x.p.name, x.p.universities?.name ?? "", label(TIERS, x.a.tier ?? "target"), x.a.shortlisted ? "Yes" : "No", label(STATUSES, x.a.status), x.r.pct, x.nd?.due_date ?? "", money(x.p.tuition, x.p.currency)]),
    ]));
  }

  return (
    <>
      <PageHeader
        title="Shortlist & strategy"
        description="Sort your programmes into Reach, Target and Safety, then print or export your plan."
        actions={<div className="flex gap-2 print:hidden">
          <Button variant="outline" onClick={() => { exportCsv(); toast.success("CSV downloaded"); }}>Export CSV</Button>
          <Button onClick={() => window.print()}>Print report</Button>
        </div>}
      />
      {rows.length === 0 ? <Empty>No programmes yet. Add some from <Link to="/compare" className="underline">Compare programmes</Link>.</Empty> : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            {TIERS.map((t) => {
              const items = rows.filter((x) => (x.a.tier ?? "target") === t.value);
              return (
                <Card key={t.value} className="p-4">
                  <h2 className="font-serif text-lg">{t.label} <span className="text-sm text-muted-foreground">({items.length})</span></h2>
                  <p className="mb-3 text-xs text-muted-foreground">{tierHelp[t.value]}</p>
                  {items.length === 0 ? <p className="text-sm text-muted-foreground">None yet.</p> : (
                    <ul className="space-y-3">
                      {items.map((x) => (
                        <li key={x.a.id} className="rounded-md border border-border p-3 text-sm">
                          <Link to="/programmes/$id" params={{ id: x.a.id }} className="font-medium hover:underline">{x.p.name}</Link>
                          <p className="text-xs text-muted-foreground">{x.p.universities?.name}</p>
                          <div className="my-2"><Progress value={x.r.pct} label={`${x.p.name} readiness`} /></div>
                          <div className="flex items-center justify-between gap-2 print:hidden">
                            <Select aria-label="Category" className="h-8 w-28" value={x.a.tier ?? "target"} onChange={(e) => setTier(x.a.id, e.target.value)}>
                              {TIERS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </Select>
                            <label className="flex items-center gap-1 text-xs"><input type="checkbox" checked={x.a.shortlisted} onChange={(e) => toggleShort(x.a.id, e.target.checked)} />Shortlist</label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              );
            })}
          </div>

          <Card className="mt-6 p-5">
            <h2 className="mb-1 font-serif text-lg">Application strategy report</h2>
            <p className="mb-4 text-xs text-muted-foreground">Generated {new Date().toLocaleDateString("en-GB")} · {shortlisted.length} shortlisted of {rows.length} tracked. Planning aid only — not an admissions prediction.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-muted-foreground">
                  <tr><th className="py-2 pr-3">Programme</th><th className="pr-3">Category</th><th className="pr-3">Status</th><th className="pr-3">Readiness</th><th className="pr-3">Next deadline</th><th className="pr-3">Tuition</th><th>Missing</th></tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {rows.map((x) => (
                    <tr key={x.a.id}>
                      <td className="py-2 pr-3"><span className="font-medium">{x.p.name}</span>{x.a.shortlisted && <> <Badge tone="success">Shortlisted</Badge></>}<br /><span className="text-xs text-muted-foreground">{x.p.universities?.name}</span></td>
                      <td className="pr-3">{label(TIERS, x.a.tier ?? "target")}</td>
                      <td className="pr-3">{label(STATUSES, x.a.status)}</td>
                      <td className="pr-3">{x.r.ready}/{x.r.total}</td>
                      <td className="pr-3">{x.nd ? formatDate(x.nd.due_date) : "—"}</td>
                      <td className="pr-3">{money(x.p.tuition, x.p.currency)}</td>
                      <td className="text-xs">{x.r.items.filter((i) => !i.ready).map((i) => i.requirement.label).join(", ") || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </>
  );
}

```

# src/routes/_authenticated/tasks.tsx

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWorkspace, useRefresh, daysUntil, formatDate, type Task } from "@/lib/atlas";
import { Button, Card, DeadlineBadge, Empty, Input, PageHeader, Select } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/tasks")({
  head: () => ({ meta: [{ title: "Task board — GradPath Atlas" }, { name: "description", content: "Your application to-do list, grouped by programme." }] }),
  component: Tasks,
});

function Tasks() {
  const { data: ws, isLoading } = useWorkspace();
  const refresh = useRefresh();
  const [f, setF] = useState({ title: "", due: "", app: "" });
  const [show, setShow] = useState<"open" | "done" | "all">("open");
  const [group, setGroup] = useState<"programme" | "due">("programme");
  const [err, setErr] = useState("");

  if (isLoading || !ws) return <p className="text-sm text-muted-foreground">Loading…</p>;
  const appName = (id: string | null) => {
    const a = ws.applications.find((x) => x.id === id);
    const p = ws.programmes.find((x) => x.id === a?.programme_id);
    return p ? `${p.name} — ${p.universities?.name ?? ""}` : "General";
  };
  const tasks = ws.tasks.filter((t) => show === "all" || (show === "done" ? t.done : !t.done));

  const groups = new Map<string, Task[]>();
  tasks.forEach((t) => {
    let k: string;
    if (group === "programme") k = appName(t.application_id);
    else if (!t.due_date) k = "No due date";
    else {
      const d = daysUntil(t.due_date);
      k = d < 0 ? "Overdue" : d <= 7 ? "This week" : d <= 30 ? "This month" : "Later";
    }
    groups.set(k, [...(groups.get(k) ?? []), t]);
  });
  const order = ["Overdue", "This week", "This month", "Later", "No due date"];
  const entries = [...groups].sort((a, b) => group === "due" ? order.indexOf(a[0]) - order.indexOf(b[0]) : a[0].localeCompare(b[0]));

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!f.title.trim()) return setErr("Write a task first.");
    const { error } = await supabase.from("tasks").insert({ title: f.title.trim(), due_date: f.due || null, application_id: f.app || null, user_id: ws!.userId });
    if (error) return setErr(error.message);
    setF({ title: "", due: "", app: f.app });
    refresh();
  }
  async function toggle(t: Task) {
    await supabase.from("tasks").update({ done: !t.done }).eq("id", t.id);
    refresh();
  }
  async function remove(t: Task) {
    await supabase.from("tasks").delete().eq("id", t.id);
    refresh();
  }

  return (
    <>
      <PageHeader title="Task board" description={`${ws.tasks.filter((t) => !t.done).length} open · ${ws.tasks.filter((t) => t.done).length} done`} />
      <Card className="mb-6 p-4">
        <form onSubmit={add} className="flex flex-wrap items-end gap-3">
          <div className="min-w-64 flex-1"><label htmlFor="tt" className="mb-1 block text-sm font-medium">New task</label><Input id="tt" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="e.g. Email referee with CV" /></div>
          <div><label htmlFor="td" className="mb-1 block text-sm font-medium">Due</label><Input id="td" type="date" value={f.due} onChange={(e) => setF({ ...f, due: e.target.value })} /></div>
          <div className="w-64"><label htmlFor="ta" className="mb-1 block text-sm font-medium">Programme</label>
            <Select id="ta" value={f.app} onChange={(e) => setF({ ...f, app: e.target.value })}>
              <option value="">General</option>
              {ws.applications.map((a) => <option key={a.id} value={a.id}>{appName(a.id)}</option>)}
            </Select>
          </div>
          <Button type="submit">Add task</Button>
        </form>
        {err && <p role="alert" className="mt-2 text-sm text-destructive">{err}</p>}
      </Card>

      <div className="mb-4 flex flex-wrap gap-3">
        <Select aria-label="Show tasks" className="w-40" value={show} onChange={(e) => setShow(e.target.value as typeof show)}>
          <option value="open">Open</option><option value="done">Completed</option><option value="all">All</option>
        </Select>
        <Select aria-label="Group by" className="w-48" value={group} onChange={(e) => setGroup(e.target.value as typeof group)}>
          <option value="programme">Group by programme</option><option value="due">Group by due date</option>
        </Select>
      </div>

      {entries.length === 0 ? <Empty>No tasks here.</Empty> : (
        <div className="grid gap-4 md:grid-cols-2">
          {entries.map(([k, items]) => (
            <Card key={k} className="p-4">
              <h2 className="mb-2 font-serif text-base">{k} <span className="text-sm text-muted-foreground">({items.length})</span></h2>
              <ul className="divide-y divide-border">
                {items.map((t) => (
                  <li key={t.id} className="flex items-center gap-3 py-2 text-sm">
                    <input type="checkbox" className="size-4" checked={t.done} onChange={() => toggle(t)} aria-label={`Mark “${t.title}” ${t.done ? "not done" : "done"}`} />
                    <span className={`flex-1 ${t.done ? "text-muted-foreground line-through" : ""}`}>
                      {t.title}
                      {group === "due" && <span className="block text-xs text-muted-foreground">{appName(t.application_id)}</span>}
                    </span>
                    {t.due_date && (t.done ? <span className="text-xs text-muted-foreground">{formatDate(t.due_date)}</span> : <DeadlineBadge days={daysUntil(t.due_date)} />)}
                    <button onClick={() => remove(t)} className="text-xs text-muted-foreground hover:text-destructive">Delete</button>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

```

# src/routes/auth.tsx

```tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Logo } from "@/components/Logo";
import { Button, Field, Input } from "@/components/ui-kit";

type Mode = "signin" | "signup" | "forgot";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): { mode?: Mode | undefined } => ({
    mode: s["mode"] === "signup" || s["mode"] === "forgot" ? (s["mode"] as Mode) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign in — GradPath Atlas" },
      { name: "description", content: "Sign in or create your GradPath Atlas application planning workspace." },
      { property: "og:title", content: "Sign in — GradPath Atlas" },
      { property: "og:description", content: "Access your master's application planning workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>(search.mode ?? "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "error" | "ok"; text: string } | null>(null);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard" });
    });
    const { data } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/dashboard" });
    });
    return () => data.subscription.unsubscribe();
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    setAlreadyRegistered(false);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/dashboard`, data: { display_name: name } },
        });
        if (error) {
          if (/already registered|already exists/i.test(error.message)) {
            setAlreadyRegistered(true);
            setMsg({ tone: "error", text: "An account with this email is already registered. Please sign in instead." });
            return;
          }
          throw error;
        }
        if (!data.session) {
          if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
            setAlreadyRegistered(true);
            setMsg({ tone: "error", text: "An account with this email is already registered. Please sign in instead." });
          } else {
            setMsg({ tone: "ok", text: "Check your inbox to confirm your email, then sign in." });
          }
        }
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        setMsg({ tone: "ok", text: "If that email has an account, a reset link is on its way." });
      }
    } catch (err) {
      setMsg({ tone: "error", text: err instanceof Error ? err.message : "Something went wrong" });
    } finally {
      setBusy(false);
    }
  }

  async function google() {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth" });
    if (r.error) setMsg({ tone: "error", text: r.error.message ?? "Google sign-in failed" });
  }

  const title = mode === "signin" ? "Welcome back" : mode === "signup" ? "Create your workspace" : "Reset your password";

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-primary p-12 text-primary-foreground lg:flex">
        <span className="font-serif text-xl">GradPath Atlas</span>
        <blockquote className="max-w-md font-serif text-3xl leading-snug">"Six programmes, four countries, one plan I actually trust."</blockquote>
        <p className="text-sm opacity-70">Planning workspace for master's applicants</p>
      </div>
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden"><Logo /></div>
          <h1 className="text-3xl">{title}</h1>
          <form onSubmit={submit} className="mt-8 space-y-4">
            {mode === "signup" && (
              <Field label="Your name" htmlFor="name"><Input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></Field>
            )}
            <Field label="Email" htmlFor="email"><Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></Field>
            {mode !== "forgot" && (
              <Field label="Password" htmlFor="password" hint={mode === "signup" ? "At least 8 characters" : undefined}>
                <Input id="password" type="password" required minLength={mode === "signup" ? 8 : undefined} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "signup" ? "new-password" : "current-password"} />
              </Field>
            )}
            {msg && <p role="alert" className={msg.tone === "error" ? "text-sm text-destructive" : "text-sm text-accent-foreground"}>{msg.text}</p>}
            {alreadyRegistered && (
              <Button type="button" variant="outline" className="w-full" onClick={() => { setMode("signin"); setMsg(null); setAlreadyRegistered(false); }}>
                Sign in with this email
              </Button>
            )}
            <Button type="submit" disabled={busy} className="w-full">
              {busy ? "Please wait…" : mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}
            </Button>
          </form>
          {mode !== "forgot" && (
            <>
              <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
              <Button variant="outline" className="w-full" onClick={google}>Continue with Google</Button>
            </>
          )}
          <div className="mt-6 space-y-2 text-sm text-muted-foreground">
            {mode === "signin" && (
              <>
                <p><button className="underline" onClick={() => setMode("forgot")}>Forgot password?</button></p>
                <p>New here? <button className="font-medium text-foreground underline" onClick={() => setMode("signup")}>Create an account</button></p>
              </>
            )}
            {mode !== "signin" && <p>Already registered? <button className="font-medium text-foreground underline" onClick={() => setMode("signin")}>Sign in</button></p>}
          </div>
        </div>
      </div>
    </div>
  );
}

```

# src/routes/index.tsx

```tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicHeader } from "@/components/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GradPath Atlas — Plan every master's application in one place" },
      { name: "description", content: "Compare programme requirements side by side, track deadlines and keep transcripts, statements and references ready." },
      { property: "og:title", content: "GradPath Atlas — Master's application planner" },
      { property: "og:description", content: "Compare programmes, track deadlines and organise reusable application documents." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Landing,
});

const rows = [
  ["Marketing Analytics", "Northbridge", "IELTS 7.0", "2 refs", "30 Nov", 75],
  ["Data Science for Society", "Harbourline", "TOEFL 95", "2 refs", "1 Dec", 50],
  ["Brand Management", "Aldermere", "IELTS 7.0", "Portfolio", "15 Nov", 100],
  ["Management (Sustainability)", "Lumen", "IELTS 7.0", "3 refs", "15 Dec", 25],
] as const;

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main>
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent-foreground">Master's application planning</p>
            <h1 className="text-5xl font-medium leading-[1.05] text-foreground lg:text-6xl">Every programme, deadline and document — on one clear map.</h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              GradPath Atlas helps final-year students compare requirements across universities, track what's due, and reuse transcripts, statements and references without losing track.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to="/auth" search={{ mode: "signup" }} className="rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">Create free workspace</Link>
              <Link to="/pricing" className="rounded-md border border-input bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary">See plans</Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">A planning tool — it does not predict admission outcomes.</p>
          </div>
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="border-b border-border bg-secondary px-4 py-2.5 text-xs font-medium text-muted-foreground">Programme comparison · demo data</div>
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted-foreground">
                <tr>{["Programme", "University", "English", "Extras", "Next deadline", "Ready"].map((h) => <th key={h} className="px-4 py-2.5 font-medium">{h}</th>)}</tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r[0]} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{r[0]}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r[1]}</td>
                    <td className="px-4 py-3">{r[2]}</td>
                    <td className="px-4 py-3">{r[3]}</td>
                    <td className="px-4 py-3">{r[4]}</td>
                    <td className="px-4 py-3">
                      <div className="h-1.5 w-16 rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: `${r[5]}%` }} /></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="border-y border-border bg-card">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
            {[
              ["Compare", "See requirements, costs, tests and references side by side across every shortlisted programme."],
              ["Track deadlines", "Every round and scholarship date in one timeline, with clear warnings as dates approach."],
              ["Reuse documents", "Link one transcript or statement to many applications and see exactly what's missing."],
              ["Share with an adviser", "Give a careers adviser read access to review progress and leave comments."],
            ].map(([t, d], i) => (
              <div key={t}>
                <p className="font-serif text-3xl text-muted-foreground">0{i + 1}</p>
                <h2 className="mt-2 text-xl">{t}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl">From long list to final action plan</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {["Add target programmes", "Record their requirements", "Link documents and tasks", "Shortlist and export your plan"].map((s, i) => (
              <li key={s} className="rounded-lg border border-border bg-card p-5">
                <span className="text-xs font-medium text-muted-foreground">Step {i + 1}</span>
                <p className="mt-1 font-medium">{s}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        GradPath Atlas · All universities and programmes shown are fictional demo data.
      </footer>
    </div>
  );
}

```

# src/routes/pricing.tsx

```tsx
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicHeader } from "@/components/Logo";
import { PLANS, PLAN_CURRENCIES, planPrice, type PlanCurrency } from "@/lib/plans";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — GradPath Atlas" },
      { name: "description", content: "Free basic planning, a one-season application pass, and adviser or university licences. Prices shown in HKD, GBP or USD." },
      { property: "og:title", content: "Pricing — GradPath Atlas" },
      { property: "og:description", content: "Free planning tier, Season Pass and adviser licences, priced in HKD." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Pricing,
});

function Pricing() {
  const [currency, setCurrency] = useState<PlanCurrency>("HKD");
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl">Simple plans for one application season</h1>
            <p className="mt-3 max-w-xl text-muted-foreground">Start free. Upgrade only if you need more programmes, exports, or adviser review. Upgrades are a test flow — no payment is taken.</p>
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            Show prices in
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as PlanCurrency)}
              className="rounded-md border border-input bg-background px-2 py-1.5 text-sm text-foreground"
              aria-label="Price currency"
            >
              {PLAN_CURRENCIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.id} className={`flex flex-col rounded-lg border bg-card p-6 ${p.featured ? "border-primary ring-1 ring-primary" : "border-border"}`}>
              <h2 className="text-2xl">{p.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
              <p className="mt-6 font-serif text-4xl">{planPrice(p, currency)}<span className="ml-1 font-sans text-sm text-muted-foreground">{p.period}</span></p>
              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {p.features.map((f) => <li key={f} className="flex gap-2"><span aria-hidden className="text-success">✓</span>{f}</li>)}
              </ul>
              <Link to="/auth" search={{ mode: "signup" }} className={`mt-8 rounded-md px-4 py-2.5 text-center text-sm font-medium ${p.featured ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-input hover:bg-secondary"}`}>
                {p.id === "free" ? "Start free" : "Try it"}
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">Prices are shown in {currency}. Equivalent prices in other currencies are approximate.</p>
      </main>
    </div>
  );
}

```

# src/routes/README.md

```md
# Routes

TanStack Start uses **file-based routing**. Every `.tsx` file in this directory
defines a route. Do **not** create `src/pages/`, `src/routes/_app/index.tsx`, or
`app/layout.tsx` — those are Next.js / Remix conventions. The only root layout
is `src/routes/__root.tsx`.

## Conventions

| File | URL |
| --- | --- |
| `index.tsx` | `/` |
| `about.tsx` | `/about` |
| `users/index.tsx` | `/users` |
| `users/$id.tsx` | `/users/:id` (dynamic — bare `$`, no curly braces) |
| `posts/{-$category}.tsx` | `/posts/:category?` (optional segment) |
| `files/$.tsx` | `/files/*` (splat — read via `_splat` param, never `*`) |
| `_layout.tsx` | layout route (renders children via `<Outlet />`) |
| `__root.tsx` | app shell — wraps every page; preserve `<Outlet />` |

`routeTree.gen.ts` is auto-generated. Don't edit it by hand.

```

# src/routes/reset-password.tsx

```tsx
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";
import { Button, Field, Input } from "@/components/ui-kit";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password — GradPath Atlas" },
      { name: "description", content: "Choose a new password for your GradPath Atlas account." },
      { property: "og:title", content: "Set a new password — GradPath Atlas" },
      { property: "og:description", content: "Choose a new password for your account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Reset,
});

function Reset() {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password: pw });
    if (error) return setErr(error.message);
    navigate({ to: "/dashboard" });
  }
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-5">
        <Logo />
        <h1 className="text-3xl">Set a new password</h1>
        <Field label="New password" htmlFor="pw"><Input id="pw" type="password" minLength={8} required value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" /></Field>
        {err && <p role="alert" className="text-sm text-destructive">{err}</p>}
        <Button type="submit" className="w-full">Update password</Button>
      </form>
    </div>
  );
}

```

# src/routeTree.gen.ts

```ts
/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as AuthenticatedRouteRouteImport } from './routes/_authenticated/route'
import { Route as AuthRouteImport } from './routes/auth'
import { Route as PricingRouteImport } from './routes/pricing'
import { Route as ResetPasswordRouteImport } from './routes/reset-password'
import { Route as AuthenticatedAdviserRouteImport } from './routes/_authenticated/adviser'
import { Route as AuthenticatedCompareRouteImport } from './routes/_authenticated/compare'
import { Route as AuthenticatedDashboardRouteImport } from './routes/_authenticated/dashboard'
import { Route as AuthenticatedDeadlinesRouteImport } from './routes/_authenticated/deadlines'
import { Route as AuthenticatedDocumentsRouteImport } from './routes/_authenticated/documents'
import { Route as AuthenticatedSettingsRouteImport } from './routes/_authenticated/settings'
import { Route as AuthenticatedSummaryRouteImport } from './routes/_authenticated/summary'
import { Route as AuthenticatedTasksRouteImport } from './routes/_authenticated/tasks'
import { Route as AuthenticatedProgrammesIdRouteImport } from './routes/_authenticated/programmes.$id'

const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const AuthenticatedRouteRoute = AuthenticatedRouteRouteImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRouteImport,
} as any)
const AuthRoute = AuthRouteImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRouteImport,
} as any)
const PricingRoute = PricingRouteImport.update({
  id: '/pricing',
  path: '/pricing',
  getParentRoute: () => rootRouteImport,
} as any)
const ResetPasswordRoute = ResetPasswordRouteImport.update({
  id: '/reset-password',
  path: '/reset-password',
  getParentRoute: () => rootRouteImport,
} as any)
const AuthenticatedAdviserRoute = AuthenticatedAdviserRouteImport.update({
  id: '/adviser',
  path: '/adviser',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)
const AuthenticatedCompareRoute = AuthenticatedCompareRouteImport.update({
  id: '/compare',
  path: '/compare',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)
const AuthenticatedDashboardRoute = AuthenticatedDashboardRouteImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)
const AuthenticatedDeadlinesRoute = AuthenticatedDeadlinesRouteImport.update({
  id: '/deadlines',
  path: '/deadlines',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)
const AuthenticatedDocumentsRoute = AuthenticatedDocumentsRouteImport.update({
  id: '/documents',
  path: '/documents',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)
const AuthenticatedSettingsRoute = AuthenticatedSettingsRouteImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)
const AuthenticatedSummaryRoute = AuthenticatedSummaryRouteImport.update({
  id: '/summary',
  path: '/summary',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)
const AuthenticatedTasksRoute = AuthenticatedTasksRouteImport.update({
  id: '/tasks',
  path: '/tasks',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)
const AuthenticatedProgrammesIdRoute =
  AuthenticatedProgrammesIdRouteImport.update({
    id: '/programmes/$id',
    path: '/programmes/$id',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/auth': typeof AuthRoute
  '/pricing': typeof PricingRoute
  '/reset-password': typeof ResetPasswordRoute
  '/adviser': typeof AuthenticatedAdviserRoute
  '/compare': typeof AuthenticatedCompareRoute
  '/dashboard': typeof AuthenticatedDashboardRoute
  '/deadlines': typeof AuthenticatedDeadlinesRoute
  '/documents': typeof AuthenticatedDocumentsRoute
  '/settings': typeof AuthenticatedSettingsRoute
  '/summary': typeof AuthenticatedSummaryRoute
  '/tasks': typeof AuthenticatedTasksRoute
  '/programmes/$id': typeof AuthenticatedProgrammesIdRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/auth': typeof AuthRoute
  '/pricing': typeof PricingRoute
  '/reset-password': typeof ResetPasswordRoute
  '/adviser': typeof AuthenticatedAdviserRoute
  '/compare': typeof AuthenticatedCompareRoute
  '/dashboard': typeof AuthenticatedDashboardRoute
  '/deadlines': typeof AuthenticatedDeadlinesRoute
  '/documents': typeof AuthenticatedDocumentsRoute
  '/settings': typeof AuthenticatedSettingsRoute
  '/summary': typeof AuthenticatedSummaryRoute
  '/tasks': typeof AuthenticatedTasksRoute
  '/programmes/$id': typeof AuthenticatedProgrammesIdRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/_authenticated': typeof AuthenticatedRouteRouteWithChildren
  '/auth': typeof AuthRoute
  '/pricing': typeof PricingRoute
  '/reset-password': typeof ResetPasswordRoute
  '/_authenticated/adviser': typeof AuthenticatedAdviserRoute
  '/_authenticated/compare': typeof AuthenticatedCompareRoute
  '/_authenticated/dashboard': typeof AuthenticatedDashboardRoute
  '/_authenticated/deadlines': typeof AuthenticatedDeadlinesRoute
  '/_authenticated/documents': typeof AuthenticatedDocumentsRoute
  '/_authenticated/settings': typeof AuthenticatedSettingsRoute
  '/_authenticated/summary': typeof AuthenticatedSummaryRoute
  '/_authenticated/tasks': typeof AuthenticatedTasksRoute
  '/_authenticated/programmes/$id': typeof AuthenticatedProgrammesIdRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/auth'
    | '/pricing'
    | '/reset-password'
    | '/adviser'
    | '/compare'
    | '/dashboard'
    | '/deadlines'
    | '/documents'
    | '/settings'
    | '/summary'
    | '/tasks'
    | '/programmes/$id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/auth'
    | '/pricing'
    | '/reset-password'
    | '/adviser'
    | '/compare'
    | '/dashboard'
    | '/deadlines'
    | '/documents'
    | '/settings'
    | '/summary'
    | '/tasks'
    | '/programmes/$id'
  id:
    | '__root__'
    | '/'
    | '/_authenticated'
    | '/auth'
    | '/pricing'
    | '/reset-password'
    | '/_authenticated/adviser'
    | '/_authenticated/compare'
    | '/_authenticated/dashboard'
    | '/_authenticated/deadlines'
    | '/_authenticated/documents'
    | '/_authenticated/settings'
    | '/_authenticated/summary'
    | '/_authenticated/tasks'
    | '/_authenticated/programmes/$id'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthenticatedRouteRoute: typeof AuthenticatedRouteRouteWithChildren
  AuthRoute: typeof AuthRoute
  PricingRoute: typeof PricingRoute
  ResetPasswordRoute: typeof ResetPasswordRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedRouteRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/pricing': {
      id: '/pricing'
      path: '/pricing'
      fullPath: '/pricing'
      preLoaderRoute: typeof PricingRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/reset-password': {
      id: '/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof ResetPasswordRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/_authenticated/adviser': {
      id: '/_authenticated/adviser'
      path: '/adviser'
      fullPath: '/adviser'
      preLoaderRoute: typeof AuthenticatedAdviserRouteImport
      parentRoute: typeof AuthenticatedRouteRoute
    }
    '/_authenticated/compare': {
      id: '/_authenticated/compare'
      path: '/compare'
      fullPath: '/compare'
      preLoaderRoute: typeof AuthenticatedCompareRouteImport
      parentRoute: typeof AuthenticatedRouteRoute
    }
    '/_authenticated/dashboard': {
      id: '/_authenticated/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthenticatedDashboardRouteImport
      parentRoute: typeof AuthenticatedRouteRoute
    }
    '/_authenticated/deadlines': {
      id: '/_authenticated/deadlines'
      path: '/deadlines'
      fullPath: '/deadlines'
      preLoaderRoute: typeof AuthenticatedDeadlinesRouteImport
      parentRoute: typeof AuthenticatedRouteRoute
    }
    '/_authenticated/documents': {
      id: '/_authenticated/documents'
      path: '/documents'
      fullPath: '/documents'
      preLoaderRoute: typeof AuthenticatedDocumentsRouteImport
      parentRoute: typeof AuthenticatedRouteRoute
    }
    '/_authenticated/settings': {
      id: '/_authenticated/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof AuthenticatedSettingsRouteImport
      parentRoute: typeof AuthenticatedRouteRoute
    }
    '/_authenticated/summary': {
      id: '/_authenticated/summary'
      path: '/summary'
      fullPath: '/summary'
      preLoaderRoute: typeof AuthenticatedSummaryRouteImport
      parentRoute: typeof AuthenticatedRouteRoute
    }
    '/_authenticated/tasks': {
      id: '/_authenticated/tasks'
      path: '/tasks'
      fullPath: '/tasks'
      preLoaderRoute: typeof AuthenticatedTasksRouteImport
      parentRoute: typeof AuthenticatedRouteRoute
    }
    '/_authenticated/programmes/$id': {
      id: '/_authenticated/programmes/$id'
      path: '/programmes/$id'
      fullPath: '/programmes/$id'
      preLoaderRoute: typeof AuthenticatedProgrammesIdRouteImport
      parentRoute: typeof AuthenticatedRouteRoute
    }
  }
}

interface AuthenticatedRouteRouteChildren {
  AuthenticatedAdviserRoute: typeof AuthenticatedAdviserRoute
  AuthenticatedCompareRoute: typeof AuthenticatedCompareRoute
  AuthenticatedDashboardRoute: typeof AuthenticatedDashboardRoute
  AuthenticatedDeadlinesRoute: typeof AuthenticatedDeadlinesRoute
  AuthenticatedDocumentsRoute: typeof AuthenticatedDocumentsRoute
  AuthenticatedSettingsRoute: typeof AuthenticatedSettingsRoute
  AuthenticatedSummaryRoute: typeof AuthenticatedSummaryRoute
  AuthenticatedTasksRoute: typeof AuthenticatedTasksRoute
  AuthenticatedProgrammesIdRoute: typeof AuthenticatedProgrammesIdRoute
}

const AuthenticatedRouteRouteChildren: AuthenticatedRouteRouteChildren = {
  AuthenticatedAdviserRoute: AuthenticatedAdviserRoute,
  AuthenticatedCompareRoute: AuthenticatedCompareRoute,
  AuthenticatedDashboardRoute: AuthenticatedDashboardRoute,
  AuthenticatedDeadlinesRoute: AuthenticatedDeadlinesRoute,
  AuthenticatedDocumentsRoute: AuthenticatedDocumentsRoute,
  AuthenticatedSettingsRoute: AuthenticatedSettingsRoute,
  AuthenticatedSummaryRoute: AuthenticatedSummaryRoute,
  AuthenticatedTasksRoute: AuthenticatedTasksRoute,
  AuthenticatedProgrammesIdRoute: AuthenticatedProgrammesIdRoute,
}

const AuthenticatedRouteRouteWithChildren =
  AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren)

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AuthRoute: AuthRoute,
  PricingRoute: PricingRoute,
  ResetPasswordRoute: ResetPasswordRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

import type { getRouter } from './router.tsx'
import type { startInstance } from './start.ts'
declare module '@tanstack/react-start' {
  interface Register {
    ssr: true
    router: Awaited<ReturnType<typeof getRouter>>
    config: Awaited<ReturnType<typeof startInstance.getOptions>>
  }
}

```

# src/server.ts

```ts
import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};

```

# src/start.ts

```ts
import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [errorMiddleware, csrfMiddleware],
}));

```

# src/styles.css

```css
@import "tailwindcss" source(none);
@source "../src";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

/*
 * Design system definition.
 *
 * The @theme inline block maps CSS custom properties to Tailwind utility
 * classes (e.g. --color-primary -> bg-primary, text-primary).
 *
 * The :root and .dark blocks define the actual color values using oklch.
 * All colors MUST use oklch format.
 *
 * To add a new semantic color:
 * 1. Add the variable to :root (light value) and .dark (dark value)
 * 2. Register it in @theme inline as --color-<name>: var(--<name>)
 */

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --font-sans: "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Newsreader", ui-serif, Georgia, serif;
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-ring-offset-background: var(--background);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

:root {
  --radius: 0.375rem;
  --background: oklch(0.985 0.006 85);
  --foreground: oklch(0.24 0.03 255);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.24 0.03 255);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.24 0.03 255);
  --primary: oklch(0.33 0.07 255);
  --primary-foreground: oklch(0.98 0.005 85);
  --secondary: oklch(0.95 0.012 85);
  --secondary-foreground: oklch(0.28 0.04 255);
  --muted: oklch(0.955 0.01 85);
  --muted-foreground: oklch(0.5 0.025 255);
  --accent: oklch(0.93 0.03 160);
  --accent-foreground: oklch(0.32 0.06 160);
  --destructive: oklch(0.55 0.18 28);
  --destructive-foreground: oklch(0.98 0 0);
  --warning: oklch(0.8 0.13 80);
  --warning-foreground: oklch(0.35 0.07 70);
  --success: oklch(0.55 0.11 160);
  --success-foreground: oklch(0.98 0 0);
  --border: oklch(0.9 0.012 85);
  --input: oklch(0.88 0.015 85);
  --ring: oklch(0.45 0.08 255);
  --chart-1: oklch(0.33 0.07 255);
  --chart-2: oklch(0.55 0.11 160);
  --chart-3: oklch(0.8 0.13 80);
  --chart-4: oklch(0.55 0.18 28);
  --chart-5: oklch(0.6 0.05 255);
  --sidebar: oklch(0.965 0.01 85);
  --sidebar-foreground: oklch(0.24 0.03 255);
  --sidebar-primary: oklch(0.33 0.07 255);
  --sidebar-primary-foreground: oklch(0.98 0.005 85);
  --sidebar-accent: oklch(0.92 0.015 85);
  --sidebar-accent-foreground: oklch(0.24 0.03 255);
  --sidebar-border: oklch(0.9 0.012 85);
  --sidebar-ring: oklch(0.45 0.08 255);
}

@layer base {
  * {
    border-color: var(--color-border);
  }

  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
  }
}

@layer base {
  h1, h2, h3 { font-family: var(--font-serif); letter-spacing: -0.01em; }
  body { font-family: var(--font-sans); }
}

```

# src/test/app-routing.test.tsx

```tsx
import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});

```

# src/test/setup.ts

```ts
import "@testing-library/jest-dom/vitest";

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: () => {},
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

```

# supabase/config.toml

```toml
project_id = "kxrzuzexpiwgybxpalvq"
```

# supabase/migrations/20261004122304_4e560e40-be91-4b9e-a84a-184ac1697575.sql

```sql

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  display_name text,
  role text NOT NULL DEFAULT 'student',
  plan text NOT NULL DEFAULT 'free',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid());

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name) VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email,'@',1)));
  RETURN NEW;
END $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.universities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid,
  name text NOT NULL,
  country text NOT NULL DEFAULT '',
  city text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.universities TO authenticated;
GRANT ALL ON public.universities TO service_role;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read catalog or own" ON public.universities FOR SELECT TO authenticated USING (owner_id IS NULL OR owner_id = auth.uid());
CREATE POLICY "write own" ON public.universities FOR ALL TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

CREATE TABLE public.programmes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid,
  university_id uuid NOT NULL REFERENCES public.universities(id) ON DELETE CASCADE,
  name text NOT NULL,
  degree text NOT NULL DEFAULT 'MSc',
  duration_months int NOT NULL DEFAULT 12,
  tuition int NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'GBP',
  intake text NOT NULL DEFAULT 'September 2027',
  study_mode text NOT NULL DEFAULT 'Full-time',
  min_gpa numeric,
  english_test text NOT NULL DEFAULT '',
  references_required int NOT NULL DEFAULT 2,
  portfolio_required boolean NOT NULL DEFAULT false,
  interview boolean NOT NULL DEFAULT false,
  application_fee int NOT NULL DEFAULT 0,
  summary text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.programmes TO authenticated;
GRANT ALL ON public.programmes TO service_role;
ALTER TABLE public.programmes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read catalog or own" ON public.programmes FOR SELECT TO authenticated USING (owner_id IS NULL OR owner_id = auth.uid());
CREATE POLICY "write own" ON public.programmes FOR ALL TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

CREATE TABLE public.requirements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid,
  programme_id uuid NOT NULL REFERENCES public.programmes(id) ON DELETE CASCADE,
  label text NOT NULL,
  detail text NOT NULL DEFAULT '',
  doc_type text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.requirements TO authenticated;
GRANT ALL ON public.requirements TO service_role;
ALTER TABLE public.requirements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read catalog or own" ON public.requirements FOR SELECT TO authenticated USING (owner_id IS NULL OR owner_id = auth.uid());
CREATE POLICY "write own" ON public.requirements FOR ALL TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

CREATE TABLE public.deadlines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid,
  programme_id uuid REFERENCES public.programmes(id) ON DELETE CASCADE,
  label text NOT NULL,
  due_date date NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.deadlines TO authenticated;
GRANT ALL ON public.deadlines TO service_role;
ALTER TABLE public.deadlines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read catalog or own" ON public.deadlines FOR SELECT TO authenticated USING (owner_id IS NULL OR owner_id = auth.uid());
CREATE POLICY "write own" ON public.deadlines FOR ALL TO authenticated USING (owner_id = auth.uid()) WITH CHECK (owner_id = auth.uid());

-- Adviser sharing
CREATE TABLE public.adviser_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL,
  adviser_email text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (student_id, adviser_email)
);
GRANT SELECT, INSERT, DELETE ON public.adviser_links TO authenticated;
GRANT ALL ON public.adviser_links TO service_role;
ALTER TABLE public.adviser_links ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_adviser_for(_student uuid) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.adviser_links WHERE student_id = _student AND lower(adviser_email) = lower(coalesce(auth.jwt()->>'email','')))
$$;

CREATE POLICY "student manages" ON public.adviser_links FOR ALL TO authenticated USING (student_id = auth.uid()) WITH CHECK (student_id = auth.uid());
CREATE POLICY "adviser sees" ON public.adviser_links FOR SELECT TO authenticated USING (lower(adviser_email) = lower(coalesce(auth.jwt()->>'email','')));

CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  programme_id uuid NOT NULL REFERENCES public.programmes(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'researching',
  priority int NOT NULL DEFAULT 2,
  shortlisted boolean NOT NULL DEFAULT false,
  adviser_comment text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, programme_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.applications TO authenticated;
GRANT ALL ON public.applications TO service_role;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own apps" ON public.applications FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "adviser reads" ON public.applications FOR SELECT TO authenticated USING (public.is_adviser_for(user_id));
CREATE POLICY "adviser comments" ON public.applications FOR UPDATE TO authenticated USING (public.is_adviser_for(user_id)) WITH CHECK (public.is_adviser_for(user_id));

CREATE TABLE public.status_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  status text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.status_records TO authenticated;
GRANT ALL ON public.status_records TO service_role;
ALTER TABLE public.status_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own status" ON public.status_records FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_adviser_for(user_id));

CREATE OR REPLACE FUNCTION public.log_status() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' OR NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.status_records (application_id, user_id, status) VALUES (NEW.id, NEW.user_id, NEW.status);
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END $$;
CREATE TRIGGER apps_status_ins AFTER INSERT ON public.applications FOR EACH ROW EXECUTE FUNCTION public.log_status();
CREATE OR REPLACE FUNCTION public.log_status_upd() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.status_records (application_id, user_id, status) VALUES (NEW.id, NEW.user_id, NEW.status);
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END $$;
CREATE TRIGGER apps_status_upd BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION public.log_status_upd();

CREATE TABLE public.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  doc_type text NOT NULL DEFAULT 'other',
  status text NOT NULL DEFAULT 'not_started',
  link text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.documents TO authenticated;
GRANT ALL ON public.documents TO service_role;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own docs" ON public.documents FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "adviser reads docs" ON public.documents FOR SELECT TO authenticated USING (public.is_adviser_for(user_id));

CREATE TABLE public.application_documents (
  application_id uuid NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  document_id uuid NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  PRIMARY KEY (application_id, document_id)
);
GRANT SELECT, INSERT, DELETE ON public.application_documents TO authenticated;
GRANT ALL ON public.application_documents TO service_role;
ALTER TABLE public.application_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own links" ON public.application_documents FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "adviser reads links" ON public.application_documents FOR SELECT TO authenticated USING (public.is_adviser_for(user_id));

CREATE TABLE public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  application_id uuid REFERENCES public.applications(id) ON DELETE CASCADE,
  title text NOT NULL,
  due_date date,
  done boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tasks TO authenticated;
GRANT ALL ON public.tasks TO service_role;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own tasks" ON public.tasks FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "adviser reads tasks" ON public.tasks FOR SELECT TO authenticated USING (public.is_adviser_for(user_id));

CREATE TABLE public.notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  application_id uuid NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notes TO authenticated;
GRANT ALL ON public.notes TO service_role;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own notes" ON public.notes FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "adviser reads notes" ON public.notes FOR SELECT TO authenticated USING (public.is_adviser_for(user_id));

-- Fictional demo catalogue
INSERT INTO public.universities (id, name, country, city) VALUES
 ('00000000-0000-0000-0000-000000000a01','Northbridge University (fictional)','United Kingdom','Northbridge'),
 ('00000000-0000-0000-0000-000000000a02','Harbourline Institute of Technology (fictional)','Netherlands','Harbourline'),
 ('00000000-0000-0000-0000-000000000a03','Aldermere College London (fictional)','United Kingdom','London'),
 ('00000000-0000-0000-0000-000000000a04','Kestrel Bay University (fictional)','Australia','Kestrel Bay'),
 ('00000000-0000-0000-0000-000000000a05','Lumen Graduate School (fictional)','Canada','Vancouver');

INSERT INTO public.programmes (id, university_id, name, degree, duration_months, tuition, currency, intake, study_mode, min_gpa, english_test, references_required, portfolio_required, interview, application_fee, summary) VALUES
 ('00000000-0000-0000-0000-000000000b01','00000000-0000-0000-0000-000000000a01','Marketing Analytics','MSc',12,28500,'GBP','September 2027','Full-time',3.3,'IELTS 7.0 (6.5 each)',2,false,false,75,'Quantitative marketing, consumer data and campaign measurement.'),
 ('00000000-0000-0000-0000-000000000b02','00000000-0000-0000-0000-000000000a01','Digital Business Strategy','MA',12,26000,'GBP','September 2027','Full-time',3.0,'IELTS 6.5 (6.0 each)',2,false,true,75,'Platform strategy, digital transformation and innovation management.'),
 ('00000000-0000-0000-0000-000000000b03','00000000-0000-0000-0000-000000000a02','Data Science for Society','MSc',24,18900,'EUR','September 2027','Full-time',3.5,'TOEFL iBT 95',2,false,true,100,'Applied machine learning with public-interest research projects.'),
 ('00000000-0000-0000-0000-000000000b04','00000000-0000-0000-0000-000000000a03','Brand Management','MSc',12,31200,'GBP','January 2027','Full-time',3.2,'IELTS 7.0',1,true,false,0,'Brand building, creative strategy and a live client portfolio.'),
 ('00000000-0000-0000-0000-000000000b05','00000000-0000-0000-0000-000000000a04','International Business','Master',18,45000,'AUD','February 2027','Full-time',3.0,'IELTS 6.5',2,false,false,120,'Global trade, cross-cultural management and an industry placement.'),
 ('00000000-0000-0000-0000-000000000b06','00000000-0000-0000-0000-000000000a05','Management (Sustainability)','MSc',16,39000,'CAD','September 2027','Full-time or part-time',3.3,'IELTS 7.0 or Duolingo 120',3,false,true,150,'Responsible management with a sustainability consultancy capstone.');

INSERT INTO public.requirements (programme_id, label, detail, doc_type) VALUES
 ('00000000-0000-0000-0000-000000000b01','Academic transcript','Final or interim transcript','transcript'),
 ('00000000-0000-0000-0000-000000000b01','Personal statement','Max 1,000 words','statement'),
 ('00000000-0000-0000-0000-000000000b01','Two references','At least one academic','reference'),
 ('00000000-0000-0000-0000-000000000b01','CV','Up to 2 pages','cv'),
 ('00000000-0000-0000-0000-000000000b02','Academic transcript','','transcript'),
 ('00000000-0000-0000-0000-000000000b02','Personal statement','Max 800 words','statement'),
 ('00000000-0000-0000-0000-000000000b02','Two references','','reference'),
 ('00000000-0000-0000-0000-000000000b03','Academic transcript','Including course descriptions','transcript'),
 ('00000000-0000-0000-0000-000000000b03','Motivation letter','Max 2 pages','statement'),
 ('00000000-0000-0000-0000-000000000b03','English test result','TOEFL iBT 95','english'),
 ('00000000-0000-0000-0000-000000000b03','CV','','cv'),
 ('00000000-0000-0000-0000-000000000b04','Academic transcript','','transcript'),
 ('00000000-0000-0000-0000-000000000b04','Portfolio','3–5 brand or creative projects','portfolio'),
 ('00000000-0000-0000-0000-000000000b04','One reference','','reference'),
 ('00000000-0000-0000-0000-000000000b05','Academic transcript','','transcript'),
 ('00000000-0000-0000-0000-000000000b05','Personal statement','','statement'),
 ('00000000-0000-0000-0000-000000000b05','English test result','IELTS 6.5','english'),
 ('00000000-0000-0000-0000-000000000b06','Academic transcript','','transcript'),
 ('00000000-0000-0000-0000-000000000b06','Statement of purpose','Max 1,200 words','statement'),
 ('00000000-0000-0000-0000-000000000b06','Three references','','reference'),
 ('00000000-0000-0000-0000-000000000b06','CV','','cv');

INSERT INTO public.deadlines (programme_id, label, due_date) VALUES
 ('00000000-0000-0000-0000-000000000b01','Priority application round','2026-11-30'),
 ('00000000-0000-0000-0000-000000000b01','Final application deadline','2027-03-31'),
 ('00000000-0000-0000-0000-000000000b02','Application deadline','2027-02-28'),
 ('00000000-0000-0000-0000-000000000b03','Scholarship deadline','2026-12-01'),
 ('00000000-0000-0000-0000-000000000b03','Application deadline','2027-01-15'),
 ('00000000-0000-0000-0000-000000000b04','Application deadline','2026-11-15'),
 ('00000000-0000-0000-0000-000000000b05','Application deadline','2026-12-10'),
 ('00000000-0000-0000-0000-000000000b06','Round 1 deadline','2026-12-15'),
 ('00000000-0000-0000-0000-000000000b06','Round 2 deadline','2027-02-15');

```

# supabase/migrations/20261004122341_b8eadba6-cf84-46f7-86ef-3749456736de.sql

```sql

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_status() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_status_upd() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_adviser_for(uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_adviser_for(uuid) TO authenticated;

```

# supabase/migrations/20261005051924_555aa07c-3c95-4859-9421-a66c4f6f0684.sql

```sql
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS gpa_scale text NOT NULL DEFAULT '4.0', ADD COLUMN IF NOT EXISTS target_intake text NOT NULL DEFAULT 'September 2027', ADD COLUMN IF NOT EXISTS currency text NOT NULL DEFAULT 'GBP', ADD COLUMN IF NOT EXISTS gpa text NOT NULL DEFAULT '';
ALTER TABLE public.applications ADD COLUMN IF NOT EXISTS tier text NOT NULL DEFAULT 'target';
```

# supabase/migrations/20261006052245_c4ab007c-0b22-4e6f-b8d7-7a21be201349.sql

```sql
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS file_path text NOT NULL DEFAULT '', ADD COLUMN IF NOT EXISTS file_name text NOT NULL DEFAULT '';
CREATE POLICY "Own document files read" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Own document files insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Own document files delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);
```

# Task_list.md

```md
# Task List — GradPath Atlas

## Sprint 1 — Foundation
- [x] Project setup, database tables, privacy rules, demo catalogue
- [x] Email + Google sign-in

## Sprint 2 — Design & layout
- [x] Academic design system, shared UI kit
- [x] Landing, pricing, auth pages, workspace sidebar

## Sprint 3 — Core workspace
- [x] Dashboard and Compare programmes
- [x] Add programme (catalogue + custom), free-plan limit

## Sprint 4 — Feature pages
- [x] Programme detail
- [x] Deadlines & timeline
- [x] Document vault
- [x] Task board
- [x] Shortlist & strategy summary
- [x] Adviser review
- [x] Settings

## Sprint 5 — Smart auto-fill & docs
- [x] Keyword search with suggestions dropdown in Add programme
- [x] Auto-fill fields from pre-loaded mock programme records (HK, UK, US, SG)
- [x] Manual override of any auto-filled field / fully custom entry
- [x] PRD.md and TASK_LIST.md
- [x] Rename README title to GradPath Atlas

## Sprint 6 — Usability & polish
- [x] Upload document files from device (PDF, Word, images, up to 20 MB) to private storage
- [x] Programme filter and "Documents this programme needs" card in Document vault
- [x] "Link to programme" dropdown in the document add/edit form
- [x] Timeline / Calendar switch on Deadlines, with .ics calendar download
- [x] Tuition currency conversion (7 currencies) on Compare and Programme detail
- [x] Soft GPA warning when the saved GPA is below a programme minimum
- [x] "My notes" column on Compare programmes
- [x] "Save changes" / Discard buttons on the Programme detail status editor
- [x] Rename Compare column to "Required documents"
- [x] Delete-programme (trash) button per row on Compare
- [x] CSV and calendar export downloads fixed
- [x] "Already registered" email warning with one-click sign in
- [x] Pricing page with "Show prices in" selector, defaulting to HKD (HK$0 / HK$150 / HK$60)
- [ ] Invite instructor as GitHub collaborator (repo is public, so optional)

## Backlog
- [ ] Email deadline reminders
- [ ] Adviser comment threads
- [ ] Live exchange rates instead of fixed approximate rates
- [ ] Real payment for plan upgrades (currently test-only)

```

# TASK_LIST.md

```md
# Task List — GradPath Atlas

## Sprint 1 — Foundation
- [x] Project setup, database tables, privacy rules, demo catalogue
- [x] Email + Google sign-in

## Sprint 2 — Design & layout
- [x] Academic design system, shared UI kit
- [x] Landing, pricing, auth pages, workspace sidebar

## Sprint 3 — Core workspace
- [x] Dashboard and Compare programmes
- [x] Add programme (catalogue + custom), free-plan limit

## Sprint 4 — Feature pages
- [x] Programme detail
- [x] Deadlines & timeline
- [x] Document vault
- [x] Task board
- [x] Shortlist & strategy summary
- [x] Adviser review
- [x] Settings

## Sprint 5 — Smart auto-fill & docs
- [x] Keyword search with suggestions dropdown in Add programme
- [x] Auto-fill fields from pre-loaded mock programme records (HK, UK, US, SG)
- [x] Manual override of any auto-filled field / fully custom entry
- [x] PRD.md and TASK_LIST.md
- [x] Rename README title to GradPath Atlas

## Sprint 6 — Usability & polish
- [x] Upload document files from device (PDF, Word, images, up to 20 MB) to private storage
- [x] Programme filter and "Documents this programme needs" card in Document vault
- [x] "Link to programme" dropdown in the document add/edit form
- [x] Timeline / Calendar switch on Deadlines, with .ics calendar download
- [x] Tuition currency conversion (7 currencies) on Compare and Programme detail
- [x] Soft GPA warning when the saved GPA is below a programme minimum
- [x] "My notes" column on Compare programmes
- [x] "Save changes" / Discard buttons on the Programme detail status editor
- [x] Rename Compare column to "Required documents"
- [x] Delete-programme (trash) button per row on Compare
- [x] CSV and calendar export downloads fixed
- [x] "Already registered" email warning with one-click sign in
- [x] Pricing page with "Show prices in" selector, defaulting to HKD (HK$0 / HK$150 / HK$60)
- [ ] Invite instructor as GitHub collaborator (repo is public, so optional)

## Backlog
- [ ] Email deadline reminders
- [ ] Adviser comment threads
- [ ] Live exchange rates instead of fixed approximate rates
- [ ] Real payment for plan upgrades (currently test-only)

```

# tasklist.md

```md
# GradPath Atlas — Phase 1 Task List

**Execution plan:** Sequential, Phase 1 only
**Source:** `PRD.md` and `@codebase.md`
**Architecture assumption:** The assignment mandates Next.js App Router, TypeScript, Tailwind CSS, Drizzle ORM, Neon PostgreSQL, Clerk Auth, Stripe Checkout, ImageKit, and Gemini API. The current prototype uses TanStack Start and Supabase. This plan assumes the required-stack migration is approved; do not treat the prototype stack as the target.

> Complete modules in order. Do not start the next module until the current module’s verification gate passes. Run database commands only against a development database. Never print or commit secret values.

## Module 1: Environment & Secret Key Setup (.env.local)

### Repository and runtime
- [x] Confirm the working repository is `wendylai0320-cloud/GradPath-Atlas` (verified: Git origin and GitHub repository name match).
- [x] Create a migration branch for the Next.js and Neon implementation (verified: active branch is `migration/nextjs-neon`).
- [ ] Confirm the supported Node.js version and record it in `.nvmrc` or the project’s runtime configuration.
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

```

# tsconfig.json

```json
{
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "vite.config.ts",
    "vitest.config.ts",
    "eslint.config.js"
  ],
  "compilerOptions": {
    "target": "ES2022",
    "jsx": "react-jsx",
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["vite/client", "vitest/globals"],

    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": false,
    "noEmit": true,

    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noPropertyAccessFromIndexSignature": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedSideEffectImports": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

```

# vite.config.ts

```ts
// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});

```

# vitest.config.ts

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});

```

