"use client";

import { clsx } from "clsx";

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-[1.75rem] font-light tracking-[-0.02em] text-ink sm:text-[2rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-1 max-w-xl text-sm text-[var(--text-soft)]">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("rounded-2xl border border-[var(--border-soft)] bg-white", className)}>
      {children}
    </div>
  );
}

export function StatTile({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "default" | "alert" | "olive";
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-[var(--border-soft)] px-5 py-4",
        tone === "default" && "bg-white",
        tone === "alert" && "border-amber-200/80 bg-amber-50/50",
        tone === "olive" && "border-olive/15 bg-olive/[0.04]",
      )}
    >
      <p className="text-[0.65rem] tracking-[0.16em] text-[var(--text-soft)] uppercase">{label}</p>
      <p className="mt-2 font-display text-3xl font-light text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-[var(--text-soft)]">{hint}</p>}
    </div>
  );
}

export function FilterChips({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={clsx(
            "rounded-full px-3 py-1.5 text-xs transition",
            value === o.id
              ? "bg-ink text-bone"
              : "bg-black/[0.04] text-[var(--text-soft)] hover:text-ink",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
