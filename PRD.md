# Product Requirements Document — GradPath Atlas

Desktop-first workspace for planning master's applications. Repo: https://github.com/wendylai0320-cloud/GradPath-Atlas

## 1. Problem
Applicants juggle spreadsheets, scattered deadlines and many document versions, with no clear view of how ready each application is.

## 2. Users
- **Student applicant** (primary): tracks 3–8 programmes across countries.
- **Adviser / mentor** (secondary): reviews a student's plan and leaves feedback.

## 3. Features
- **Compare programmes** (`/compare`): sortable, filterable table; CSV export.
- **Programme Management & Smart Auto-Fill**
  - *Keyword Search & Instant Auto-Fill:* typing keywords (e.g. "CUHK Business Analytics", "HKU Finance", "LSE Data Science") shows a suggestions dropdown. Selecting one auto-fills University, Country, Programme name, Degree, Tuition & currency, Intake, Standard deadline and English requirement from pre-loaded mock records.
  - *Manual Override:* every pre-filled field stays editable; users can also add a fully custom programme.
- **Programme detail** (`/programmes/$id`): requirements checklist, live readiness %, document links, notes, status/tier updater.
- **Deadlines** (`/deadlines`): month timeline, countdown badges, custom milestones, CSV + .ics export.
- **Document vault** (`/documents`): CV, SOP, transcripts, references with Draft/Ready status and "used by" list.
- **Task board** (`/tasks`): to-dos grouped by programme or due date, checkbox toggling, filters.
- **Shortlist & strategy** (`/summary`): Reach / Target / Safety, print-ready report.
- **Adviser review** (`/adviser`): share by email, adviser feedback per application.
- **Settings** (`/settings`): GPA, GPA scale, target intake, currency, plan.

## 4. Plans
Basic £0 (max 4 programmes) · Season Pass £19 one-off · Adviser £6/student/season (test upgrade flow, no payment).

## 5. Non-functional
Calm academic design (ivory / navy / sage, Newsreader + IBM Plex Sans), accessible forms, per-user data privacy with adviser access only when shared. All catalogue data is fictional demo data.

## 6. Tech
TanStack Start (React 19, Vite), Tailwind CSS v4, Lovable Cloud (database + auth).
