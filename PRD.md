# Product Requirements Document (PRD): GradPath Atlas

*Tailored to the actual codebase architecture using `@codebase.md` (generated with `npx ai-digest`).*

---

## 1. Executive Overview & Personas

### Core Value Proposition
**GradPath Atlas** is a centralized master's application planning workspace that replaces fragmented spreadsheets and notes. Students compare entry requirements side-by-side, manage deadlines via a timeline and calendar, attach and reuse supporting documents (transcripts, personal statements, CVs, references) across programmes, and collaborate securely with advisers.

### Target User Personas
- **Final-Year Undergraduate Student (Primary User):** Juggling multiple postgraduate applications across global universities, tracking English test minimums (IELTS/TOEFL), deadlines, tuition in different currencies, document versions and GPA gaps.
- **Careers Service / Education Adviser (Secondary User):** Counselors and consultants needing authorized visibility into student portfolios to give timely feedback.
- **Institutional Department / University Partner (Enterprise User):** Institutions seeking cohort tracking and bulk student licences.

### Revenue Model
| Plan | Price | Includes |
| --- | --- | --- |
| Basic | HK$0 / £0 / US$0 forever | Up to 4 programmes, comparison table, deadline tracking |
| Application-Season Pass (B2C) | HK$150 / £15 / US$19 one-off, 12 months | Unlimited programmes, CSV + print exports, Reach/Target/Safety strategy, share with 1 adviser |
| Adviser / University (B2B) | HK$60 / £6 / US$8 per student per season | Multi-student dashboard, team onboarding, invoice billing |

---

## 2. Phased Scope Isolation

### Phase 1: Core Product (Shipped in Current Prototype)
- **Authentication:** Email/password and Google sign-in via Lovable Cloud Auth, with "account already registered" detection and one-click switch to sign in.
- **Programme Comparison Matrix (`/compare`):** Side-by-side table (tuition, min GPA, English test, references, portfolio, interview, deadlines, status, required documents), currency conversion (HKD, USD, GBP, EUR, SGD, AUD, CNY), soft GPA warnings, inline "My notes", delete with confirmation, CSV export.
- **Smart Auto-Fill (`AddProgramme`):** Keyword search over 13 preset programmes (CUHK, HKU, HKUST, LSE, Imperial, UCL, Edinburgh, Columbia, NUS) that auto-fills the form, with full manual override.
- **Deadline Hub (`/deadlines`):** Timeline and monthly calendar views, urgency colours, CSV and `.ics` calendar export.
- **Document Vault (`/documents`):** Device uploads (PDF, Word, images up to 20 MB) in private storage, programme linking, programme filter, status tracking.
- **Programme Detail (`/programmes/$id`):** Requirements checklist, readiness score, status/priority/shortlist editing with Save/Discard, currency conversion and GPA warning.
- **Tasks (`/tasks`), Strategy Summary (`/summary`), Adviser Sharing (`/adviser`), Settings (`/settings`).**
- **Marketing Pages:** `/` landing and `/pricing` with HKD/GBP/USD currency selector.
- **Upgrade Flow:** Test-only plan switching (no real payment yet).

### Phase 2: Post-Launch Expansion (Backlog)
- Real payment checkout (Stripe or Paddle) for the Season Pass.
- Automated email deadline reminders.
- Two-way adviser comment threads.
- Live exchange rates replacing fixed reference rates.
- Multi-tenant institutional cohort dashboards.

---

## 3. Interface & UI Layout

### Page Routes Structure (TanStack Router, file-based)
- `/` — Landing page: hero, value props, preview table, pricing entry points.
- `/auth` — Sign in / sign up (email + Google), duplicate-account warning.
- `/reset-password` — Password recovery.
- `/pricing` — Plan tiers with currency selector.
- `/dashboard` — Overview of upcoming deadlines and readiness.
- `/compare` — Programme comparison matrix.
- `/deadlines` — Timeline / calendar.
- `/documents` — Document Vault.
- `/programmes/$id` — Programme detail.
- `/tasks` — Application to-dos.
- `/summary` — Reach / Target / Safety strategy.
- `/adviser` — Adviser sharing.
- `/settings` — GPA, GPA scale, target intake, display currency, plan.

All workspace pages sit behind an authenticated layout (`_authenticated/route.tsx`) with a sidebar.

### Design System & Responsive Constraints
- Calm academic aesthetic using semantic OKLCH tokens in `src/styles.css` (ivory background, navy text, sage accents).
- Typography: *Newsreader* serif headings, *IBM Plex Sans* body.
- Desktop-first workspace; wide tables scroll horizontally on small screens.
- Landing page headline, primary CTA ("Start planning") and top navigation render above the mobile fold.

---

## 4. Technical Stack & Architectural Constraints
- **Framework:** TanStack Start v1 (React 19, SSR, Vite 7), deployed to edge workers.
- **Language:** TypeScript (strict).
- **Routing:** `@tanstack/react-router` file-based routes in `src/routes`.
- **Data fetching:** `@tanstack/react-query`.
- **Backend:** Lovable Cloud — PostgreSQL with Row-Level Security, Auth, and private file storage.
- **Styling:** Tailwind CSS v4 with CSS theme tokens.
- **UI:** Custom component kit (`src/components/ui-kit.tsx`), `lucide-react` icons, `sonner` toasts.
- **Exports:** Client-side UTF-8 CSV generator and iCalendar (`.ics`) builder.

---

## 5. Database Schema & Entity Design

```text
profiles 1─N applications N─1 programmes N─1 universities
              │                  │
              ├─N notes          ├─N requirements
              └─N application_documents N─1 documents
profiles 1─N adviser_links, tasks, documents
```

### `profiles`
`id` (UUID, PK → auth user), `display_name`, `role` (default `student`), `plan` (default `basic`), `gpa`, `gpa_scale`, `target_intake`, `currency` (default `HKD`), `created_at`.

### `universities`
`id`, `name`, `country`, `city`, `website`, `owner_id` (NULL = shared catalogue).

### `programmes`
`id`, `university_id` → universities, `name`, `degree`, `duration_months`, `tuition`, `currency`, `application_fee`, `intake`, `study_mode`, `min_gpa`, `english_test`, `references_required`, `portfolio_required`, `interview`, `summary`, `owner_id`.

### `requirements`
`id`, `programme_id` → programmes, `label`, `detail`, `doc_type`, `owner_id`.

### `deadlines`
`id`, `programme_id` → programmes (nullable for personal milestones), `label`, `due_date`, `owner_id`.

### `applications`
`id`, `user_id`, `programme_id` → programmes, `status`, `priority`, `shortlisted`, `tier` (reach / target / safety), `adviser_comment`, `created_at`, `updated_at`.

### `documents`
`id`, `user_id`, `title`, `doc_type`, `status` (draft / review / ready), `file_name`, `file_path` (private storage path), `link`, `notes`, `created_at`.

### `application_documents` (junction)
`application_id` → applications (cascade), `document_id` → documents (cascade), `user_id`.

### `notes`
`id`, `application_id` → applications (cascade), `user_id`, `body`, `created_at`.

### `tasks`
User-owned to-do items linked optionally to an application, with due date and done flag.

### `adviser_links`
`id`, `student_id`, `adviser_email`, `created_at`; unique `(student_id, adviser_email)`.

### Row-Level Security
- Users can only read/write their own rows (`auth.uid() = user_id`).
- Catalogue rows (`owner_id IS NULL`) are readable by all signed-in users; custom rows only by their owner.
- Advisers get read/comment access via a `SECURITY DEFINER` function `is_adviser_for(student_id)`.
- Storage bucket `documents` is private; each user can only access files in their own folder; downloads use 5-minute signed URLs.

---

## 6. Third-Party API & Security Boundaries
- **Client-safe variables:** `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (publishable key, protected by RLS).
- **Server-only secrets:** never exposed to the browser; read only inside server functions.
- **Auth token middleware:** `src/start.ts` attaches the user's session token to server function calls.
- **Payments:** not yet integrated; Phase 2 will add a checkout plus a verified webhook under `/api/public/*` to grant the Season Pass.

---

## 7. Quality, Accessibility & Compliance Standards

### Accessibility (WCAG 2.2 AA)
- Text contrast at least 4.5:1.
- Visible keyboard focus rings on all controls.
- Semantic landmarks (`header`, `main`, `nav`, `footer`) and labelled form fields.

### Privacy & Compliance (GDPR / HK PDPO)
- Strict per-user data isolation; advisers see only portfolios explicitly shared with them.
- Students can export their data at any time (CSV).
- Programme data in the prototype is fictional demo data with disclaimers; the app is a planning tool, not an admissions predictor.
- Planned: PICS disclaimer at signup, cookie consent banner, and account deletion with cascading erasure.
