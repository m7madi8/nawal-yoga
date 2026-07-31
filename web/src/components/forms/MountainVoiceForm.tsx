"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/provider";
import { makeRequestId, submitRetreatRequest } from "@/lib/supabase";
import { StepFormShell } from "@/components/forms/StepFormShell";
import { SignaturePad } from "@/components/forms/SignaturePad";
import { clearFormDraft, loadFormDraft, useFormDraftSave } from "@/hooks/useFormDraft";

const DRAFT_KEY = "nawal-mountain-voice-draft";
const TOTAL = 7;

type FormState = {
  fullName: string;
  idNumber: string;
  birthDate: string;
  phone: string;
  emergencyName: string;
  emergencyPhone: string;
  relation: string;
  chronic: "" | "yes" | "no";
  chronicDetails: string;
  allergy: string;
  medications: string;
  currentInjuries: string;
  pastFractures: string;
  surgeries: string;
  activityLevel: string;
  painZones: string;
  heartIssues: string;
  breathingDizziness: string;
  notes: string;
  consentInfo: boolean;
  consentPhysical: boolean;
  consentFirstAid: boolean;
  consentPhotos: boolean;
  signature: string;
  typedSignature: string;
  signMode: "draw" | "type";
};

const empty: FormState = {
  fullName: "",
  idNumber: "",
  birthDate: "",
  phone: "",
  emergencyName: "",
  emergencyPhone: "",
  relation: "",
  chronic: "",
  chronicDetails: "",
  allergy: "",
  medications: "",
  currentInjuries: "",
  pastFractures: "",
  surgeries: "",
  activityLevel: "",
  painZones: "",
  heartIssues: "",
  breathingDizziness: "",
  notes: "",
  consentInfo: false,
  consentPhysical: false,
  consentFirstAid: false,
  consentPhotos: false,
  signature: "",
  typedSignature: "",
  signMode: "draw",
};

function fieldClass() {
  return "w-full rounded-xl border border-[var(--border-soft)] bg-white px-4 py-3 outline-none focus:border-olive";
}

export function MountainVoiceForm() {
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

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function validate(): boolean {
    if (step === 1)
      return Boolean(data.fullName && data.idNumber && data.birthDate && data.phone);
    if (step === 2) return Boolean(data.emergencyName && data.emergencyPhone && data.relation);
    if (step === 3)
      return Boolean(
        data.chronic && data.allergy.trim() && data.medications.trim() && (data.chronic === "no" || data.chronicDetails.trim()),
      );
    if (step === 4)
      return Boolean(
        data.currentInjuries && data.pastFractures && data.surgeries && data.activityLevel,
      );
    if (step === 5) return Boolean(data.painZones && data.heartIssues && data.breathingDizziness);
    if (step === 6)
      return data.consentInfo && data.consentPhysical && data.consentFirstAid && data.consentPhotos;
    if (step === 7)
      return data.signMode === "draw" ? Boolean(data.signature) : Boolean(data.typedSignature.trim());
    return true;
  }

  async function submit() {
    setStatus("loading");
    try {
      const now = new Date();
      await submitRetreatRequest({
        id: makeRequestId("mv"),
        source: "mountain-voice",
        retreatType: "Mountain Voice Retreat",
        submittedAt: now.toISOString(),
        fullName: data.fullName.trim(),
        phone: data.phone.trim(),
        age: "",
        city: "",
        reason: "",
        expectation: data.notes,
        yogaExperience: data.activityLevel,
        healthStatus: data.chronic,
        healthDetails: [
          `ID: ${data.idNumber}`,
          `Birth: ${data.birthDate}`,
          `Emergency: ${data.emergencyName} / ${data.emergencyPhone} (${data.relation})`,
          `Chronic: ${data.chronic} ${data.chronicDetails}`,
          `Allergy: ${data.allergy}`,
          `Meds: ${data.medications}`,
          `Injuries: ${data.currentInjuries}`,
          `Fractures: ${data.pastFractures}`,
          `Surgeries: ${data.surgeries}`,
          `Pain: ${data.painZones}`,
          `Heart: ${data.heartIssues}`,
          `Breath: ${data.breathingDizziness}`,
          `Signature: ${data.signMode} ${data.typedSignature || "(drawn)"}`,
        ].join("\n"),
        activities: [],
        freeNote: data.notes,
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
        <Link href="/retreats/dahab" className="mt-8 inline-flex text-olive">
          {t("mv_back")}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[70svh] bg-[#fafaf8]">
      <div className="mx-auto max-w-xl px-4 pt-8 sm:px-6">
        <Link href="/retreats/dahab" className="inline-flex text-sm text-[var(--text-soft)]">
          {dir === "rtl" ? "→" : "←"} {t("mv_back")}
        </Link>
        {draftHint && <p className="mt-2 text-xs text-brass">{t("draft_saved")}</p>}
      </div>

      <StepFormShell
        step={step}
        total={TOTAL}
        title={t("mv_title")}
        percentLabel={t("percent")}
        stepLabel={stepLabel}
      >
        <p className="mb-6 text-[var(--text-soft)]">{t("mv_subtitle")}</p>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl">{t("mv_s1")}</h2>
            {(
              [
                ["fullName", "full_name", "text"],
                ["idNumber", "mv_id", "text"],
                ["birthDate", "mv_birth", "date"],
                ["phone", "phone", "tel"],
              ] as const
            ).map(([key, label, type]) => (
              <label key={key} className="block">
                <span className="mb-1.5 block text-sm text-[var(--text-soft)]">{t(label)}</span>
                <input
                  className={fieldClass()}
                  type={type}
                  value={data[key]}
                  onChange={(e) => set(key, e.target.value)}
                />
              </label>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl">{t("mv_s2")}</h2>
            {(
              [
                ["emergencyName", "mv_emergency_name"],
                ["emergencyPhone", "phone"],
                ["relation", "mv_relation"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="block">
                <span className="mb-1.5 block text-sm text-[var(--text-soft)]">{t(label)}</span>
                <input
                  className={fieldClass()}
                  type={key === "emergencyPhone" ? "tel" : "text"}
                  value={data[key]}
                  onChange={(e) => set(key, e.target.value)}
                />
              </label>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl">{t("mv_s3")}</h2>
            <p className="text-sm text-[var(--text-soft)]">{t("mv_chronic")}</p>
            <div className="flex gap-4">
              {(["no", "yes"] as const).map((v) => (
                <label key={v} className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    checked={data.chronic === v}
                    onChange={() => set("chronic", v)}
                  />
                  {t(v)}
                </label>
              ))}
            </div>
            {data.chronic === "yes" && (
              <label className="block">
                <span className="mb-1.5 block text-sm text-[var(--text-soft)]">
                  {t("mv_chronic_details")}
                </span>
                <textarea
                  className={fieldClass()}
                  rows={3}
                  value={data.chronicDetails}
                  onChange={(e) => set("chronicDetails", e.target.value)}
                />
              </label>
            )}
            <label className="block">
              <span className="mb-1.5 block text-sm text-[var(--text-soft)]">{t("mv_allergy")}</span>
              <input className={fieldClass()} value={data.allergy} onChange={(e) => set("allergy", e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-[var(--text-soft)]">{t("mv_meds")}</span>
              <input
                className={fieldClass()}
                value={data.medications}
                onChange={(e) => set("medications", e.target.value)}
              />
            </label>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl">{t("mv_s4")}</h2>
            {(
              [
                ["currentInjuries", "mv_injuries"],
                ["pastFractures", "mv_fractures"],
                ["surgeries", "mv_surgeries"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="block">
                <span className="mb-1.5 block text-sm text-[var(--text-soft)]">{t(label)}</span>
                <textarea
                  className={fieldClass()}
                  rows={2}
                  value={data[key]}
                  onChange={(e) => set(key, e.target.value)}
                />
              </label>
            ))}
            <label className="block">
              <span className="mb-1.5 block text-sm text-[var(--text-soft)]">{t("mv_activity")}</span>
              <select
                className={fieldClass()}
                value={data.activityLevel}
                onChange={(e) => set("activityLevel", e.target.value)}
              >
                <option value="">—</option>
                <option value="low">{t("mv_activity_low")}</option>
                <option value="moderate">{t("mv_activity_mod")}</option>
                <option value="high">{t("mv_activity_high")}</option>
              </select>
            </label>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl">{t("mv_s5")}</h2>
            {(
              [
                ["painZones", "mv_pain"],
                ["heartIssues", "mv_heart"],
                ["breathingDizziness", "mv_breath"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="block">
                <span className="mb-1.5 block text-sm text-[var(--text-soft)]">{t(label)}</span>
                <textarea
                  className={fieldClass()}
                  rows={2}
                  value={data[key]}
                  onChange={(e) => set(key, e.target.value)}
                />
              </label>
            ))}
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl">{t("mv_s6")}</h2>
            <label className="block">
              <span className="mb-1.5 block text-sm text-[var(--text-soft)]">{t("mv_notes")}</span>
              <textarea
                className={fieldClass()}
                rows={3}
                value={data.notes}
                onChange={(e) => set("notes", e.target.value)}
              />
            </label>
            {(
              [
                ["consentInfo", "mv_c1"],
                ["consentPhysical", "mv_c2"],
                ["consentFirstAid", "mv_c3"],
                ["consentPhotos", "mv_c4"],
              ] as const
            ).map(([key, label]) => (
              <label key={key} className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={data[key]}
                  onChange={(e) => set(key, e.target.checked)}
                />
                <span>{t(label)}</span>
              </label>
            ))}
          </div>
        )}

        {step === 7 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl">{t("mv_s7")}</h2>
            <div className="flex gap-3">
              {(["draw", "type"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => set("signMode", mode)}
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
                onChange={(signature) => set("signature", signature)}
                clearLabel={t("clear_signature")}
              />
            ) : (
              <input
                className={fieldClass()}
                placeholder={t("ib_typed_placeholder")}
                value={data.typedSignature}
                onChange={(e) => set("typedSignature", e.target.value)}
              />
            )}
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
