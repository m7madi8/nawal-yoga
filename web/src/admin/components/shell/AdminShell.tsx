"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { AdminSidebar } from "@/admin/components/shell/AdminSidebar";
import { useAdminAuth } from "@/admin/hooks/useAdminAuth";
import { useRequests } from "@/admin/hooks/useRequests";
import type { RetreatRequest, Student } from "@/admin/lib/types";

type DataCtx = ReturnType<typeof useRequests>;
const DataContext = createContext<DataCtx | null>(null);

export function useAdminData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useAdminData must be used within AdminShell");
  return ctx;
}

export function AdminShell({ children }: { children: ReactNode }) {
  const { ready, isAuthenticated } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useRequests();

  useEffect(() => {
    if (ready && !isAuthenticated) router.replace("/admin/login");
  }, [ready, isAuthenticated, router]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const title = useMemo(() => {
    if (pathname.startsWith("/admin/retreats")) return "Retreats";
    if (pathname.startsWith("/admin/events")) return "Events";
    if (pathname.startsWith("/admin/students")) return "Community";
    if (pathname.startsWith("/admin/forms")) return "Medical forms";
    if (pathname.startsWith("/admin/content")) return "Content";
    if (pathname.startsWith("/admin/settings")) return "Settings";
    return "Overview";
  }, [pathname]);

  if (!ready || !isAuthenticated) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#fafaf8] text-sm text-[var(--text-soft)]">
        Loading workspace…
      </div>
    );
  }

  return (
    <DataContext.Provider value={data}>
      <div className="flex min-h-svh bg-[#fafaf8] text-ink">
        <AdminSidebar
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          pendingForms={data.stats.medicalPending}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-[var(--border-soft)] bg-[#fafaf8]/90 px-4 backdrop-blur-md lg:px-8">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-soft)] bg-white lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            </button>
            <p className="text-sm font-medium text-ink lg:hidden">{title}</p>
            <div className="ms-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => void data.reload(true)}
                className="rounded-lg border border-[var(--border-soft)] bg-white px-3 py-1.5 text-xs text-[var(--text-soft)] transition hover:text-ink"
              >
                {data.refreshing ? "Refreshing…" : "Refresh"}
              </button>
            </div>
          </header>
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
          >
            {children}
          </motion.main>
        </div>
      </div>
    </DataContext.Provider>
  );
}

export type { RetreatRequest, Student };
