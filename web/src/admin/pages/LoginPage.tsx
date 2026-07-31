"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAdminAuth } from "@/admin/hooks/useAdminAuth";

export function LoginPage() {
  const { ready, isAuthenticated, login } = useAdminAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ready && isAuthenticated) router.replace("/admin");
  }, [ready, isAuthenticated, router]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const ok = login(String(fd.get("username") || ""), String(fd.get("password") || ""));
    setLoading(false);
    if (!ok) {
      setError("Those details don’t match. Try again.");
      return;
    }
    router.replace("/admin");
  }

  if (!ready || isAuthenticated) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#fafaf8] text-sm text-[var(--text-soft)]">
        Opening…
      </div>
    );
  }

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#fafaf8] px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(138,115,85,0.12),transparent_70%)]"
      />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md rounded-3xl border border-[var(--border-soft)] bg-white p-8 shadow-[0_20px_60px_rgba(44,41,37,0.06)]"
      >
        <p className="mb-2 text-[0.65rem] tracking-[0.22em] text-brass uppercase">Nawal Omar</p>
        <h1 className="font-display mb-2 text-3xl font-light text-ink">Operations</h1>
        <p className="mb-8 text-sm text-[var(--text-soft)]">
          Sign in to manage practice, retreats, and community care.
        </p>

        <form onSubmit={onSubmit} className="space-y-4" autoComplete="off">
          <label className="block">
            <span className="mb-1.5 block text-xs text-[var(--text-soft)]">Username</span>
            <input
              name="username"
              required
              className="h-11 w-full rounded-xl border border-[var(--border-soft)] bg-[#fafaf8] px-3 text-sm outline-none focus:border-olive/40"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs text-[var(--text-soft)]">Password</span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="h-11 w-full rounded-xl border border-[var(--border-soft)] bg-[#fafaf8] px-3 text-sm outline-none focus:border-olive/40"
            />
          </label>
          {error && (
            <p className="text-sm text-rose-700" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex h-11 w-full items-center justify-center rounded-xl bg-olive text-sm font-medium text-bone transition disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
