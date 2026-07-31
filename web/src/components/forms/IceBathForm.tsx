"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
import { makeRequestId, submitRetreatRequest } from "@/lib/supabase";
import { StepFormShell } from "@/components/forms/StepFormShell";
import { SignaturePad } from "@/components/forms/SignaturePad";
import { clearFormDraft, loadFormDraft, useFormDraftSave } from "@/hooks/useFormDraft";
import type { DictKey } from "@/lib/i18n/dictionaries";

const DRAFT_KEY = "nawal-ice-bath-draft";
const TOTAL = 5;
const SQ_KEYS = Array.from({ length: 14 }, (_, i) => `ib_sq${i + 1}` as DictKey);

type FormState = {
  consent: boolean;
  fullName: string;
  phone: string;
  birthDate: string;
  emergencyContact: string;
  formDate: string;
  answers: Record<string, "yes" | "no" | "">;
  details: Record<string, string>;
  signature: string;
  typedSignature: string;
  signMode: "draw" | "type";
  signConfirm: boolean;
};

const empty: FormState = {
  consent: false,
  fullName: "",
  phone: "",
  birthDate: "",
  emergencyContact: "",
  formDate: "",
  answers: Object.fromEntries(Array.from({ length: 14 }, (_, i) => [`sq${i + 1}`, ""])),
  details: Object.fromEntries(Array.from({ length: 14 }, (_, i) => [`sq${i + 1}`, ""])),
  signature: "",
  typedSignature: "",
  signMode: "draw",
  signConfirm: false,
};

function fieldClass() {
  return "w-full rounded-xl border border-[var(--border-soft)] bg-white px-4 py-3 outline-none focus:border-olive";
}

export function IceBathForm() {
  const { t, dir } = useI18n();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormState>(empty);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [ready, setReady] = useState(false);
  const draftHint = useFormDraftSave(DRAFT_KEY, step, data, ready);

  useEffect(() => {
    const parsed = loadFormDraft<FormState>(DRAFT_KEY);
    if (parsed?.data) setData({ ...empty, ...parsed.data, signature: "" });
    if (parsed?.__step) setStep(Math.min(TOTAL, Math.max(1, parsed.__step)));
    setReady(true);
  }, []);

  const stepLabel = useMemo(
    () =>
      t("step_of")
        .replace("{current}", String(step))
        .replace("{total}", String(TOTAL)),
    [step, t],
  );

  function validate(): boolean {
    if (step === 1) return data.consent;
    if (step === 2)
      return Boolean(
        data.fullName.trim() &&
          data.phone.trim() &&
          data.birthDate &&
          data.emergencyContact.trim() &&
          data.formDate,
      );
    if (step === 3)
      return [1, 2, 3, 4, 5, 6, 7].every((n) => data.answers[`sq${n}`] === "yes" || data.answers[`sq${n}`] === "no");
    if (step === 4)
      return [8, 9, 10, 11, 12, 13, 14].every(
        (n) => data.answers[`sq${n}`] === "yes" || data.answers[`sq${n}`] === "no",
      );
    if (step === 5) {
      const signed =
        data.signMode === "draw" ? Boolean(data.signature) : Boolean(data.typedSignature.trim());
      return signed && data.signConfirm;
    }
    return true;
  }

  async function submit() {
    setStatus("loading");
    try {
      const yesFlags = Object.values(data.answers).filter((v) => v === "yes").length;
      const screening = Array.from({ length: 14 }, (_, i) => {
        const n = i + 1;
        return `Q${n}: ${data.answers[`sq${n}`] || "-"}${
          data.details[`sq${n}`] ? ` | ${data.details[`sq${n}`]}` : ""
        }`;
      });
      const now = new Date();
      await submitRetreatRequest({
        id: makeRequestId("ice"),
        source: "ice-bath-health",
        retreatType: "Ice Bath Health Declaration",
        submittedAt: now.toISOString(),
        fullName: data.fullName.trim(),
        phone: data.phone.trim(),
        age: "",
        city: "",
        reason: "",
        expectation: "",
        yogaExperience: "",
        healthStatus: yesFlags > 0 ? "yes" : "no",
        healthDetails: `${yesFlags} yes answer(s) in screening`,
        activities: [],
        freeNote: [
          `Birth Date: ${data.birthDate || "-"}`,
          `Emergency Contact: ${data.emergencyContact || "-"}`,
          `Form Date: ${data.formDate || "-"}`,
          `Declaration Confirmed: ${data.consent ? "yes" : "no"}`,
          ...screening,
          `Signature Mode: ${data.signMode}`,
          `Typed Signature: ${data.typedSignature || "-"}`,
          data.signature ? "Drawn signature: attached (data URL omitted from note length)" : "",
        ]
          .filter(Boolean)
          .join("\n"),
        status: "pending",
        createdAt: now.toISOString(),
      });
      clearFormDraft(DRAFT_KEY);
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  }

  function next() {
    if (!validate()) return;
    if (step === TOTAL) {
      void submit();
      return;
    }
    setStep((s) => Math.min(TOTAL, s + 1));
  }

  if (status === "ok") {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="font-display text-3xl text-ink">{t("form_success")}</p>
        <Link href="/events/ice-bath" className="mt-8 inline-flex text-olive">
          {t("ib_back_event")}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fafaf8] min-h-[70svh]">
      <div className="mx-auto max-w-xl px-4 pt-8 sm:px-6">
        <Link href="/events/ice-bath" className="inline-flex text-sm text-[var(--text-soft)]">
          {dir === "rtl" ? "→" : "←"} {t("ib_back_event")}
        </Link>
        {draftHint && <p className="mt-2 text-xs text-brass">{t("draft_saved")}</p>}
      </div>

      <StepFormShell
        step={step}
        total={TOTAL}
        title={t("ib_form_title")}
        percentLabel={t("percent")}
        stepLabel={stepLabel}
      >
        <p className="mb-6 text-[var(--text-soft)]">{t("ib_form_subtitle")}</p>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl text-ink">{t("ib_step1_title")}</h2>
            {(["ib_decl_p1", "ib_decl_p2", "ib_decl_p3", "ib_decl_p4"] as DictKey[]).map((k) => (
              <p key={k} className="text-sm leading-relaxed text-[var(--text-soft)]">
                {t(k)}
              </p>
            ))}
            <label className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                checked={data.consent}
                onChange={(e) => setData((d) => ({ ...d, consent: e.target.checked }))}
                className="mt-1"
              />
              <span>{t("ib_consent")}</span>
            </label>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl text-ink">{t("ib_step2_title")}</h2>
            {(
              [
                ["fullName", "full_name"],
                ["phone", "phone"],
                ["birthDate", "ib_birth"],
                ["emergencyContact", "ib_emergency"],
                ["formDate", "ib_form_date"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="block">
                <span className="mb-1.5 block text-sm text-[var(--text-soft)]">{t(label)}</span>
                <input
                  className={fieldClass()}
                  type={key.includes("Date") ? "date" : key === "phone" ? "tel" : "text"}
                  value={data[key]}
                  onChange={(e) => setData((d) => ({ ...d, [key]: e.target.value }))}
                  required
                />
              </label>
            ))}
          </div>
        )}

        {(step === 3 || step === 4) && (
          <div className="space-y-6">
            <h2 className="font-display text-xl text-ink">
              {t(step === 3 ? "ib_step3_title" : "ib_step4_title")}
            </h2>
            {(step === 3 ? [1, 2, 3, 4, 5, 6, 7] : [8, 9, 10, 11, 12, 13, 14]).map((n) => (
              <div key={n} className="border-b border-[var(--border-soft)] pb-5">
                <p className="mb-3 text-ink">
                  <span className="text-brass">{n}. </span>
                  {t(SQ_KEYS[n - 1])}
                </p>
                <div className="mb-3 flex gap-4">
                  {(["yes", "no"] as const).map((v) => (
                    <label key={v} className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name={`sq${n}`}
                        checked={data.answers[`sq${n}`] === v}
                        onChange={() =>
                          setData((d) => ({
                            ...d,
                            answers: { ...d.answers, [`sq${n}`]: v },
                          }))
                        }
                      />
                      {t(v)}
                    </label>
                  ))}
                </div>
                <label className="block">
                  <span className="mb-1.5 block text-sm text-[var(--text-soft)]">{t("details")}</span>
                  <input
                    className={fieldClass()}
                    value={data.details[`sq${n}`] || ""}
                    onChange={(e) =>
                      setData((d) => ({
                        ...d,
                        details: { ...d.details, [`sq${n}`]: e.target.value },
                      }))
                    }
                  />
                </label>
              </div>
            ))}
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl text-ink">{t("ib_step5_title")}</h2>
            <div className="flex gap-3">
              {(["draw", "type"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setData((d) => ({ ...d, signMode: mode }))}
                  className={`rounded-full px-4 py-2 text-[0.65rem] tracking-[0.1em] uppercase ${
                    data.signMode === mode
                      ? "bg-olive text-[#fafaf8]"
                      : "border border-[var(--border-soft)] text-ink"
                  }`}
                >
                  {t(mode === "draw" ? "ib_sign_draw" : "ib_sign_type")}
                </button>
              ))}
            </div>
            {data.signMode === "draw" ? (
              <SignaturePad
                value={data.signature}
                onChange={(signature) => setData((d) => ({ ...d, signature }))}
                clearLabel={t("clear_signature")}
              />
            ) : (
              <input
                className={fieldClass()}
                placeholder={t("ib_typed_placeholder")}
                value={data.typedSignature}
                onChange={(e) => setData((d) => ({ ...d, typedSignature: e.target.value }))}
              />
            )}
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={data.signConfirm}
                onChange={(e) => setData((d) => ({ ...d, signConfirm: e.target.checked }))}
                className="mt-1"
              />
              <span>{t("ib_sign_confirm")}</span>
            </label>
          </div>
        )}

        {status === "err" && <p className="mt-4 text-sm text-red-700/80">{t("form_error")}</p>}

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            disabled={step === 1}
            className="text-sm tracking-[0.08em] text-olive uppercase disabled:opacity-30"
          >
            {t("back_step")}
          </button>
          <button
            type="button"
            onClick={next}
            disabled={status === "loading"}
            className="inline-flex min-h-12 items-center rounded-full bg-olive px-7 text-[0.7rem] tracking-[0.12em] text-[#fafaf8] uppercase disabled:opacity-60"
          >
            {status === "loading" ? t("submitting") : step === TOTAL ? t("submit") : t("continue")}
          </button>
        </div>
      </StepFormShell>
    </div>
  );
}
