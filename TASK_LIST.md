# Task List — GradPath Atlas

> **Canonical current release checklist.** This file tracks the live Vercel prototype and limited team pilot. The detailed future target-stack migration plan remains in [`tasklist.md`](tasklist.md). `Task_list.md` is retained only as a pointer to this canonical file.

**Production URL:** `https://grad-path-atlas.vercel.app/`
**Release status (19 October 2026):** PR #3 is merged to `main` at `67b1f67f2eabe0d92164e119163222dc51bd7d46`. Vercel checks succeeded. The additive team-pilot migration was applied to Lovable Cloud; read-only metadata checks confirmed RLS and least-privilege RPC/table access. `/teams`, `/team-join`, and `/reset-password` return HTTP 200. These checks establish deployment and metadata availability, not full end-to-end acceptance.

**Authentication:** Email/password remains the production UI. The Google sign-in UI/handler was removed after its Vercel OAuth route returned 404; this does not claim the backend Google provider is disabled. The exact Vercel redirect `https://grad-path-atlas.vercel.app/reset-password` is now allowlisted in Lovable Cloud. A fresh reset-email flow still needs a user test; older emails may retain the previous redirect.

## Sprint 1 — Foundation
- [x] Project setup, database tables, privacy rules, demo catalogue
- [x] Email/password authentication; Google sign-in removed from the Vercel auth UI

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
- [x] Remove the broken Google sign-in option from the Vercel auth page while retaining email/password auth (18 Oct 2026)

## Sprint 7 — Adviser / University team pilot release
- [x] Implement limited read-only team workspace, one-use email-bound invitations, explicit student consent, and revocation controls.
- [x] Merge PR #3 into `main` and apply the additive migration to the correct Lovable Cloud project after approval.
- [x] Verify five team tables have RLS, direct client table grants are absent, RPC execute is limited to authenticated users, and private helpers are not client-exposed.
- [x] Confirm Vercel checks succeeded and `/teams` and `/team-join` return HTTP 200.
- [x] Add the exact Vercel `/reset-password` redirect to the Lovable Auth allowlist; confirm the route returns HTTP 200.
- [ ] Test password reset end-to-end with a new email requested after the allowlist change.
- [ ] Test invitation acceptance with separate adviser and student accounts, including confirmed-email matching, expiry, replay, and revoked/invalid links.
- [ ] Test explicit student consent, consent withdrawal, cross-organization isolation, read-only enforcement, and exclusion of files/private notes.
- [ ] Complete production accessibility, privacy, and permission review before describing the pilot as fully accepted.

## Backlog — not active in this prototype
- [ ] Email deadline reminders
- [ ] Adviser comment threads and two-way collaboration
- [ ] Expand the limited pilot into full team seat/role administration and university cohort management.
- [ ] Real Stripe payments, official invoice issuance, refunds, and commercial billing (currently demo/test only; no charge is made).
- [ ] Live exchange rates instead of fixed approximate rates
- [ ] Complete production-readiness audit, including data accuracy, WCAG conformance, privacy operations, backups, and monitoring
