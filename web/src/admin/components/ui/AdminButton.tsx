"use client";

import { clsx } from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "soft";
  size?: "sm" | "md";
  children: ReactNode;
};

export function AdminButton({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition duration-200 disabled:opacity-50",
        size === "sm" ? "min-h-8 px-3 text-xs" : "min-h-10 px-4 text-sm",
        variant === "primary" && "bg-olive text-bone",
        variant === "secondary" && "border border-[var(--border-soft)] bg-white text-ink",
        variant === "ghost" && "text-[var(--text-soft)] hover:bg-black/[0.03] hover:text-ink",
        variant === "danger" && "bg-red-600/90 text-white",
        variant === "soft" && "bg-olive/10 text-olive",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
