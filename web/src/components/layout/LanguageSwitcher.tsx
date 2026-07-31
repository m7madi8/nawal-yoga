"use client";

import { useI18n } from "@/lib/i18n/provider";
import { clsx } from "clsx";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className={clsx("flex items-center gap-3", className)}
      role="group"
      aria-label={t("lang_toggle")}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={clsx(
          "text-xs font-medium tracking-[0.12em] uppercase transition-colors",
          locale === "en" ? "text-ink" : "text-ink/45",
        )}
        aria-pressed={locale === "en"}
      >
        En
      </button>
      <button
        type="button"
        onClick={() => setLocale("ar")}
        className={clsx(
          "text-xs font-medium tracking-[0.12em] uppercase transition-colors",
          locale === "ar" ? "text-ink" : "text-ink/45",
        )}
        aria-pressed={locale === "ar"}
      >
        Ar
      </button>
    </div>
  );
}
