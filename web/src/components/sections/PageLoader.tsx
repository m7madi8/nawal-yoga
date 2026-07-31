"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/provider";

export function PageLoader() {
  const { t } = useI18n();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ms = reduced ? 400 : 1600;
    const id = window.setTimeout(() => setShow(false), ms);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.clearTimeout(id);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!show) document.documentElement.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bone"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_48%,rgba(156,133,104,0.06),transparent_70%)]" />

          <div className="relative flex flex-col items-center px-6">
            <motion.div
              className="overflow-hidden"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <motion.img
                src="/media/brand/logo.png"
                alt=""
                width={480}
                height={168}
                className="h-[7.5rem] w-auto max-w-[88vw] object-contain brightness-0 sm:h-40 md:h-48"
                initial={{ opacity: 0, scale: 1.08, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
              />
            </motion.div>

            <motion.div
              className="mt-8 h-px w-16 origin-center bg-brass/50 sm:w-20"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.p
              className="mt-5 text-[0.75rem] tracking-[0.36em] text-olive/55 uppercase sm:text-[0.8125rem]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            >
              {t("loader_breath")}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
