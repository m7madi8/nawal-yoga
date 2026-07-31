"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  dictionaries,
  type DictKey,
  type Dictionary,
  type Locale,
} from "./dictionaries";

const STORAGE_KEY = "nawal-lang";

type I18nContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: (key: DictKey) => string;
  setLocale: (locale: Locale) => void;
  dict: Dictionary;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "ar") setLocaleState(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => {
    const dict = dictionaries[locale] as Dictionary;
    return {
      locale,
      dir: locale === "ar" ? "rtl" : "ltr",
      dict,
      setLocale,
      t: (key) => dict[key] ?? dictionaries.en[key] ?? key,
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
