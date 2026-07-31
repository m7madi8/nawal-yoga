"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/provider";
import { makeRequestId, submitRetreatRequest } from "@/lib/supabase";
import type { DictKey } from "@/lib/i18n/dictionaries";

const PKG_KEYS: Record<string, DictKey> = {
  trial: "haifa_pkg_trial",
  pack4: "haifa_pkg_pack4",
  single: "haifa_pkg_single",
  private1: "haifa_pkg_private1",
  private2: "haifa_pkg_private2",
  gift: "haifa_pkg_gift",
};

type Props = {
  open: boolean;
  packageId: string;
  onClose: () => void;
};

export function HaifaRegisterSheet({ open, packageId, onClose }: Props) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setName("");
      setPhone("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
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
      const pkgKey = PKG_KEYS[packageId] || PKG_KEYS.trial;
      await submitRetreatRequest({
        id: makeRequestId("haifa"),
        source: "yoga-class-registration",
        retreatType: t(pkgKey),
        submittedAt: now.toISOString(),
        fullName: name.trim(),
        phone: phone.trim(),
        age: "",
        city: "Haifa",
        reason: "Haifa yoga class registration",
        expectation: "",
        yogaExperience: "",
        healthStatus: "",
        healthDetails: "",
        activities: [],
        freeNote: "Registration from Haifa page",
        status: "pending",
        createdAt: now.toISOString(),
      });
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label={t("close")}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="haifa-register-title"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md rounded-t-[1.5rem] bg-[#fafaf8] p-6 shadow-2xl sm:rounded-[1.5rem] sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 id="haifa-register-title" className="font-display text-2xl text-ink">
                  {t("haifa_register_title")}
                </h2>
                <p className="mt-3 text-sm text-[var(--text-soft)]">
                  <strong>{t("haifa_register_selected_label")}</strong>{" "}
                  {t(PKG_KEYS[packageId] || PKG_KEYS.trial)}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="text-2xl leading-none text-[var(--text-soft)]"
                aria-label={t("close")}
              >
                ×
              </button>
            </div>

            {status === "ok" ? (
              <p className="py-6 text-center text-olive">{t("haifa_register_success")}</p>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-sm text-[var(--text-soft)]">
                    {t("haifa_register_name")}
                  </span>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className="w-full rounded-xl border border-[var(--border-soft)] bg-white px-4 py-3 outline-none focus:border-olive"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm text-[var(--text-soft)]">
                    {t("haifa_register_phone")}
                  </span>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    className="w-full rounded-xl border border-[var(--border-soft)] bg-white px-4 py-3 outline-none focus:border-olive"
                  />
                </label>
                {status === "err" && (
                  <p className="text-sm text-red-700/80">{t("haifa_register_error")}</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#8b6b4a] px-6 text-[0.7rem] tracking-[0.12em] text-[#fafaf8] uppercase disabled:opacity-60"
                >
                  {status === "loading" ? t("submitting") : t("haifa_register_confirm")}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
