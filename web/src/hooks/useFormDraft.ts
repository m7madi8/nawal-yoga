"use client";

import { useEffect, useRef, useState } from "react";

type DraftPayload<T> = { __step?: number; data?: T };

export function loadFormDraft<T>(key: string): DraftPayload<T> | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as DraftPayload<T>;
  } catch {
    return null;
  }
}

export function clearFormDraft(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

/** Debounced draft save — skips heavy signature data URLs to keep typing smooth. */
export function useFormDraftSave<T extends { signature?: string }>(
  key: string,
  step: number,
  data: T,
  enabled: boolean,
) {
  const [draftHint, setDraftHint] = useState(false);
  const skipFirst = useRef(true);
  const hintTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (skipFirst.current) {
      skipFirst.current = false;
      return;
    }

    const id = window.setTimeout(() => {
      try {
        const rest = { ...data };
        delete rest.signature;
        localStorage.setItem(
          key,
          JSON.stringify({ __step: step, data: { ...rest, signature: "" } }),
        );
        setDraftHint(true);
        if (hintTimer.current) window.clearTimeout(hintTimer.current);
        hintTimer.current = window.setTimeout(() => setDraftHint(false), 800);
      } catch {
        /* ignore */
      }
    }, 1000);

    return () => window.clearTimeout(id);
  }, [data, step, key, enabled]);

  useEffect(
    () => () => {
      if (hintTimer.current) window.clearTimeout(hintTimer.current);
    },
    [],
  );

  return draftHint;
}
