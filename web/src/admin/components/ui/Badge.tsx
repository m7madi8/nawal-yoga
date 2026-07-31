"use client";

import { clsx } from "clsx";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "pending" | "done" | "alert" | "olive" | "brass";
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium tracking-wide",
        tone === "neutral" && "bg-black/[0.04] text-[var(--text-soft)]",
        tone === "pending" && "bg-amber-500/12 text-amber-800",
        tone === "done" && "bg-emerald-500/12 text-emerald-800",
        tone === "alert" && "bg-rose-500/12 text-rose-800",
        tone === "olive" && "bg-olive/12 text-olive",
        tone === "brass" && "bg-brass/15 text-[#7a6548]",
      )}
    >
      {children}
    </span>
  );
}
