"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/provider";
import { waLink } from "@/lib/i18n/dictionaries";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { clsx } from "clsx";

const links = [
  { href: "/#about", key: "nav_about" as const, index: "01" },
  { href: "/practice", key: "nav_practice" as const, index: "02" },
  { href: "/events", key: "nav_events" as const, index: "03" },
  { href: "/retreats", key: "nav_retreats" as const, index: "04" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const { t, dir } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 border-b border-[var(--border-soft)] bg-[#fafaf8]/95 sm:bg-[#fafaf8]/90 sm:backdrop-blur-md",
          open ? "z-[80]" : "z-50",
        )}
      >
        <div className="mx-auto flex h-14 max-w-[70rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0" aria-label={t("brand")} onClick={() => setOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/brand/logo.png"
              alt={t("brand")}
              className="h-9 w-auto object-contain brightness-0"
              width={140}
              height={48}
            />
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <LanguageSwitcher />
            <button
              type="button"
              className="group relative inline-flex h-11 w-11 items-center justify-center text-olive"
              aria-expanded={open}
              aria-controls="side-nav"
              aria-label={open ? t("close") : t("menu")}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? t("close") : t("menu")}</span>
              <span className="relative flex h-9 w-9 items-center justify-center">
                <span
                  className={clsx(
                    "absolute h-px w-4 bg-olive transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    open ? "translate-y-0 rotate-45" : "-translate-y-[3px]",
                  )}
                />
                <span
                  className={clsx(
                    "absolute h-px w-4 bg-olive transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    open ? "translate-y-0 -rotate-45" : "translate-y-[3px]",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label={t("close")}
              className="fixed inset-0 z-[60] bg-ink/20 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setOpen(false)}
            />

            <motion.aside
              id="side-nav"
              role="dialog"
              aria-modal="true"
              aria-label={t("menu")}
              className="fixed inset-y-0 end-0 z-[70] flex w-[min(100vw,28rem)] flex-col overflow-hidden bg-[#fafaf8] shadow-[-24px_0_80px_rgba(44,41,37,0.12)] rtl:shadow-[24px_0_80px_rgba(44,41,37,0.12)]"
              initial={{ x: dir === "rtl" ? "-105%" : "105%" }}
              animate={{ x: 0 }}
              exit={{ x: dir === "rtl" ? "-105%" : "105%" }}
              transition={{ duration: 0.75, ease }}
            >
              {/* Unexpected diagonal veil */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -end-16 top-0 h-full w-40 origin-top bg-olive/[0.04]"
                initial={{ skewX: dir === "rtl" ? 18 : -18, opacity: 0 }}
                animate={{ skewX: dir === "rtl" ? 12 : -12, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease }}
              />

              {/* Cascading reveal bands */}
              <div className="pointer-events-none absolute inset-0 z-20 flex flex-col" aria-hidden>
                {[0, 1, 2, 3, 4].map((band) => (
                  <motion.div
                    key={band}
                    className="flex-1 bg-[#fafaf8]"
                    initial={{ scaleX: 1 }}
                    animate={{ scaleX: 0 }}
                    exit={{ scaleX: 1 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.04 * band,
                      ease,
                    }}
                    style={{ transformOrigin: dir === "rtl" ? "left" : "right" }}
                  />
                ))}
              </div>

              <div className="relative z-10 flex h-full flex-col px-7 pb-8 pt-6 sm:px-10">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <motion.p
                    className="text-[0.65rem] tracking-[0.35em] text-brass uppercase"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5, ease }}
                  >
                    {t("brand")}
                  </motion.p>
                  <motion.button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={t("close")}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-olive/30 px-4 text-olive"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.45, ease }}
                  >
                    <span className="text-[0.65rem] font-medium tracking-[0.22em] uppercase">
                      {t("close")}
                    </span>
                    <span aria-hidden className="relative h-3.5 w-3.5">
                      <span className="absolute start-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
                      <span className="absolute start-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
                    </span>
                  </motion.button>
                </div>

                <nav className="flex flex-1 flex-col justify-center gap-1" aria-label={t("a11y_main_nav")}>
                  {links.map((l, i) => {
                    const active = pathname === l.href;
                    return (
                      <motion.div
                        key={l.href}
                        initial={{ opacity: 0, x: dir === "rtl" ? -36 : 36, filter: "blur(8px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: dir === "rtl" ? -20 : 20 }}
                        transition={{ delay: 0.28 + i * 0.08, duration: 0.65, ease }}
                      >
                        <Link
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className="group flex items-baseline gap-4 border-b border-[var(--border-soft)] py-4 transition-colors"
                        >
                          <span className="w-7 shrink-0 text-[0.65rem] tracking-[0.18em] text-brass/80">
                            {l.index}
                          </span>
                          <span
                            className={clsx(
                              "font-display text-[clamp(2rem,7vw,2.75rem)] leading-none transition-all duration-500",
                              active ? "text-olive" : "text-ink group-hover:text-olive",
                            )}
                          >
                            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                              {t(l.key)}
                            </span>
                          </span>
                          <span
                            aria-hidden
                            className="ms-auto text-olive opacity-0 transition duration-500 group-hover:opacity-100"
                          >
                            {dir === "rtl" ? "←" : "→"}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <motion.div
                  className="mt-8 space-y-5 border-t border-[var(--border-soft)] pt-6"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.55, ease }}
                >
                  <a
                    href={waLink(t("wa_prefill"))}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="inline-flex min-h-12 w-full items-center justify-center bg-olive px-6 text-[0.7rem] tracking-[0.16em] text-[#fafaf8] uppercase"
                  >
                    {t("nav_join")}
                  </a>
                  <div className="flex items-center justify-end gap-4">
                    <p className="text-[0.7rem] tracking-[0.08em] text-[var(--text-soft)]">
                      {t("footer_tagline")}
                    </p>
                  </div>
                </motion.div>

                {/* Vertical whisper label */}
                <motion.span
                  aria-hidden
                  className={clsx(
                    "pointer-events-none absolute top-1/2 hidden -translate-y-1/2 text-[0.6rem] tracking-[0.55em] text-ink/10 uppercase sm:block",
                    dir === "rtl" ? "end-3 rotate-90 origin-center" : "start-3 -rotate-90 origin-center",
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85 }}
                >
                  Sanctuary
                </motion.span>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
