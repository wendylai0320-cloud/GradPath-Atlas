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
