"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/provider";
import { makeRequestId, submitRetreatRequest } from "@/lib/supabase";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export function IceBathRegisterModal({ open, onClose, onSuccess }: Props) {
  const { t } = useI18n();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !busy) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, busy, onClose]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const fullName = String(fd.get("fullName") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const notes = String(fd.get("notes") || "").trim();
    if (!fullName || !phone) return;

    setBusy(true);
    try {
      const now = new Date().toISOString();
      await submitRetreatRequest({
        id: makeRequestId("ice-book"),
        source: "ice-bath-registration",
        retreatType: "Day Retreat | Between Calm & Strength",
        submittedAt: now,
        fullName,
        phone,
        age: "",
        city: "",
        reason: notes || "Ice Bath day retreat booking",
        expectation: "",
        yogaExperience: "",
        healthStatus: "",
        healthDetails: "",
        activities: [],
        freeNote: "Booking from /events/ice-bath",
        status: "pending",
        createdAt: now,
      });
      (e.target as HTMLFormElement).reset();
      onClose();
      onSuccess();
    } catch {
      setError(t("events_ib_register_error"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="ib-register-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget && !busy) onClose();
          }}
        >
          <motion.div
            className="ib-register-card"
            role="dialog"
            aria-modal
            aria-labelledby="ib-register-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ib-register-head">
              <h3 id="ib-register-title">{t("events_ib_register_title")}</h3>
              <button
                type="button"
                className="ib-register-close"
                aria-label={t("close")}
                disabled={busy}
                onClick={onClose}
              >
                ×
              </button>
            </div>
            <p className="ib-register-event">{t("events_ib_register_event")}</p>
            <form className="ib-register-form" onSubmit={onSubmit}>
              <label className="ib-register-label" htmlFor="ib-register-name">
                {t("events_ib_register_name")}
              </label>
              <input
                id="ib-register-name"
                name="fullName"
                className="ib-register-input"
                required
                autoComplete="name"
                autoFocus
              />
              <label className="ib-register-label" htmlFor="ib-register-phone">
                {t("events_ib_register_phone")}
              </label>
              <input
                id="ib-register-phone"
                name="phone"
                className="ib-register-input"
                type="tel"
                required
                autoComplete="tel"
              />
              <label className="ib-register-label" htmlFor="ib-register-notes">
                {t("events_ib_register_notes")}
              </label>
              <textarea
                id="ib-register-notes"
                name="notes"
                className="ib-register-input ib-register-textarea"
                rows={3}
              />
              {error && (
                <p className="text-sm text-rose-700" role="alert">
                  {error}
                </p>
              )}
              <button type="submit" className="ib-register-submit" disabled={busy}>
                <span>{busy ? "…" : t("events_ib_register_confirm")}</span>
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
