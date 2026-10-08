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
