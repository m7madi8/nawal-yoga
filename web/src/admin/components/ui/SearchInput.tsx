"use client";

import { clsx } from "clsx";

export function SearchInput({
  value,
  onChange,
  placeholder = "Search…",
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={clsx("relative block", className)}>
      <span className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-[var(--border-soft)] bg-white pe-3 ps-9 text-sm text-ink outline-none placeholder:text-[var(--text-soft)] focus:border-olive/40"
      />
    </label>
  );
}
