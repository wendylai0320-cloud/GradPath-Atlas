# Product Requirements Document — GradPath Atlas

Desktop-first workspace for planning master's applications. Repo: https://github.com/wendylai0320-cloud/GradPath-Atlas

## 1. Problem
Applicants juggle spreadsheets, scattered deadlines and many document versions, with no clear view of how ready each application is or whether they meet each school's requirements.

## 2. Users
- **Student applicant** (primary): tracks 3–8 programmes across countries and currencies.
- **Adviser / mentor** (secondary): reviews a student's plan and leaves feedback.

## 3. Features

### 3.1 Accounts
- Email/password and Google sign-in; password reset.
- Signing up with an already-registered email shows a warning ("An account with this email is already registered. Please sign in instead.") plus a one-click "Sign in with this email" button that switches to Sign in with the email pre-filled.
- Each user's data is private; advisers see a portfolio only when the student shares it.

### 3.2 Compare programmes (`/compare`)
- Sortable, filterable table of tracked programmes; CSV export (18 columns).
- **"Required documents"** column showing readiness % per programme.
- **"My notes"** column: add quick notes per programme (Enter or Add); shows latest 3.
- **"Show fees in"** selector converts tuition to HKD, USD, GBP, EUR, SGD, AUD or CNY (approximate fixed rates), defaulting to the currency set in Settings.
- **Soft GPA warning** (⚠) when the user's GPA is below a programme's minimum.
- Trash button per row (with confirmation) to stop tracking a programme.

### 3.3 Programme Management & Smart Auto-Fill
- *Keyword Search & Instant Auto-Fill:* typing keywords (e.g. "CUHK Business Analytics", "HKU Finance", "LSE Data Science") shows a suggestions dropdown from 13 pre-loaded mock programmes. Selecting one fills University, Country, Programme name, Degree, Tuition & currency, Intake, Standard deadline and English requirement, with an "Auto-filled from …" badge.
- *Manual Override:* every pre-filled field stays editable; users can add a fully custom programme.
- Basic plan is limited to 4 programmes.

### 3.4 Programme detail (`/programmes/$id`)
- Requirements checklist with live readiness %; document attachment card.
- Key facts with currency conversion and GPA warning.
- Status / category (Reach, Target, Safety) / priority / shortlist editor with explicit **Save changes** and Discard buttons and a confirmation toast.
- Notes; "Stop tracking" button.

### 3.5 Deadlines (`/deadlines`)
- **Timeline / Calendar switch**: list view or monthly calendar (Mon–Sun) colour-coded by urgency; click a day for details.
- Countdown badges, custom personal milestones.
- CSV export and "Add to calendar" (.ics) download.

### 3.6 Document vault (`/documents`)
- CV, SOP, transcripts, references, etc. with Draft / Ready status and "used by" list.
- **Upload files from device** (PDF, Word, images, up to 20 MB) to private storage; open via a secure temporary link.
- **"Link to programme"** dropdown in the add/edit form.
- **Programme filter** (All / Not linked / per programme) plus a "Documents this programme needs" card.

### 3.7 Task board (`/tasks`)
To-dos grouped by programme or due date, checkbox toggling, filters.

### 3.8 Shortlist & strategy (`/summary`)
Reach / Target / Safety overview, CSV export, print-ready report.

### 3.9 Adviser review (`/adviser`)
Share by email; adviser leaves feedback per application.

### 3.10 Settings (`/settings`)
GPA, GPA scale, target intake, preferred currency, plan selection.

### 3.11 Pricing (`/pricing`)
Public page with a **"Show prices in"** selector (HK$ / £ / US$), defaulting to HKD.

## 4. Plans
| Plan | Price (HKD) | Includes |
|---|---|---|
| Basic | HK$0 forever | Up to 4 programmes, no exports, no adviser sharing |
| Season Pass | HK$150 one-off (12 months) | Unlimited programmes, CSV + print exports, strategy tiers, share with 1 adviser |
| Adviser / University | HK$60 per student / season | Multi-student dashboard, team onboarding, invoice billing |

Upgrade flow is test-only; no real payment.

## 5. Non-functional
- Calm academic design (ivory / navy / sage, Newsreader + IBM Plex Sans), accessible forms and tables.
- Per-user data privacy; private file storage scoped to each user.
- All catalogue data, fees, deadlines and exchange rates are fictional/approximate demo data; the app supports planning, not admissions prediction.
- Note: downloads work best when the app is opened in its own browser tab.

## 6. Tech
TanStack Start (React 19, Vite), Tailwind CSS v4, Lovable Cloud (database, auth, file storage).
