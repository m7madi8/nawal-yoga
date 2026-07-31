"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";
import { NavIcon } from "@/admin/components/ui/NavIcon";
import { useAdminAuth } from "@/admin/hooks/useAdminAuth";
import type { NavItem } from "@/admin/lib/types";

const NAV: NavItem[] = [
  { href: "/admin", label: "Overview", icon: "overview" },
  { href: "/admin/retreats", label: "Retreats", icon: "retreats" },
  { href: "/admin/events", label: "Events", icon: "events" },
  { href: "/admin/students", label: "Community", icon: "students" },
  { href: "/admin/forms", label: "Medical forms", icon: "forms" },
  { href: "/admin/content", label: "Content", icon: "content" },
  { href: "/admin/settings", label: "Settings", icon: "settings" },
];

export function AdminSidebar({
  open,
  onClose,
  pendingForms,
}: {
  open: boolean;
  onClose: () => void;
  pendingForms?: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, username } = useAdminAuth();

  const nav = NAV.map((item) =>
    item.href === "/admin/forms" && pendingForms
      ? { ...item, badge: pendingForms }
      : item,
  );

  const linkActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  function signOut() {
    logout();
    onClose();
    router.replace("/admin/login");
  }

  const aside = (
    <aside className="flex h-full w-[17.5rem] flex-col border-e border-[var(--border-soft)] bg-[#f7f6f3]">
      <div className="px-5 pt-6 pb-4">
        <p className="font-display text-xl font-light text-ink">Nawal Omar</p>
        <p className="mt-0.5 text-[0.65rem] tracking-[0.18em] text-brass uppercase">
          Operations
        </p>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 pb-4">
        {nav.map((item) => {
          const active = linkActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={clsx(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                active
                  ? "bg-white text-ink shadow-[0_1px_0_rgba(44,41,37,0.06)]"
                  : "text-[var(--text-soft)] hover:bg-white/60 hover:text-ink",
              )}
            >
              <span className={clsx(active ? "text-olive" : "text-[var(--text-soft)]")}>
                <NavIcon name={item.icon} />
              </span>
              <span className="flex-1">{item.label}</span>
              {typeof item.badge === "number" && item.badge > 0 && (
                <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[0.65rem] text-amber-800">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[var(--border-soft)] p-4">
        <div className="mb-3 px-1">
          <p className="text-xs text-[var(--text-soft)]">Signed in as</p>
          <p className="text-sm text-ink">{username}</p>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="w-full rounded-xl px-3 py-2 text-start text-sm text-[var(--text-soft)] transition hover:bg-white hover:text-ink"
        >
          Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden h-svh shrink-0 lg:block">{aside}</div>
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-ink/35 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.div
              className="fixed inset-y-0 start-0 z-50 lg:hidden"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {aside}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
