"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/provider";
import { makeRequestId, submitRetreatRequest } from "@/lib/supabase";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export function DahabBookModal({ open, onClose, onSuccess }: Props) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "err">("idle");

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setName("");
      setPhone("");
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setStatus("loading");
    try {
      const now = new Date();
      await submitRetreatRequest({
        id: makeRequestId("dahab"),
        source: "dahab-retreat-reserve",
        retreatType: "Dahab Retreat",
        submittedAt: now.toISOString(),
        fullName: name.trim(),
        phone: phone.trim(),
        age: "",
        city: "",
        reason: "",
        expectation: "",
        yogaExperience: "",
        healthStatus: "",
        healthDetails: "",
        activities: [],
        freeNote: "Dahab retreat reservation request",
        status: "pending",
        createdAt: now.toISOString(),
      });
      onSuccess();
      onClose();
    } catch {
      setStatus("err");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" className="absolute inset-0" aria-label={t("close")} onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dahab-book-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md rounded-2xl border border-brass/30 bg-[#fafaf8] p-5 shadow-2xl sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 id="dahab-book-title" className="font-display text-xl text-ink">
                {t("dahab_book_form_title")}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-brass/30 bg-[#fafaf8] text-lg text-[#5a4632]"
                aria-label={t("close")}
              >
                ×
              </button>
            </div>
            <form onSubmit={onSubmit} className="grid gap-3">
              <label className="text-sm text-[#6a5547]">
                {t("dahab_book_name")}
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-brass/35 bg-white px-3 py-2.5 outline-none focus:border-olive"
                />
              </label>
              <label className="text-sm text-[#6a5547]">
                {t("dahab_book_phone")}
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-brass/35 bg-white px-3 py-2.5 outline-none focus:border-olive"
                />
              </label>
              {status === "err" && (
                <p className="text-sm text-red-700/80">{t("retreat_form_error")}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#8b6b4a] px-6 text-[0.75rem] tracking-[0.12em] text-[#fafaf8] uppercase disabled:opacity-60"
              >
                {status === "loading" ? t("submitting") : t("dahab_book_confirm")}
                <span aria-hidden>→</span>
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
