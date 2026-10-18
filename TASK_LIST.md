# Task List — GradPath Atlas

**Current deployment:** `https://grad-path-atlas.vercel.app/`. The public app currently offers email/password authentication; Google sign-in was removed from the Vercel auth UI on 18 October 2026. The homepage and signup page were spot-checked after deployment; this is not a full production-readiness audit.

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
- [ ] Invite instructor as GitHub collaborator (repo is public, so optional)

## Backlog
- [ ] Email deadline reminders
- [ ] Adviser comment threads
- [ ] Live exchange rates instead of fixed approximate rates
- [ ] Real payment for plan upgrades (currently test-only)
