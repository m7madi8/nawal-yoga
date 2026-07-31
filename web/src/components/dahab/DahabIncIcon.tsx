"use client";

import type { DictKey } from "@/lib/i18n/dictionaries";

type Props = {
  name: "stay" | "meals" | "yoga" | "sea" | "breath" | "circle" | "transport" | "ice";
  className?: string;
};

const paths: Record<Props["name"], string> = {
  stay: "M3 10.5L12 4l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z",
  meals: "M4 11h16M6 11V8a2 2 0 012-2h3v5M6 11v7h12v-7M15 6h3a2 2 0 012 2v3",
  yoga: "M12 5a2 2 0 110-4 2 2 0 010 4zM12 7v3M8 20l4-4 4 4M9.5 13.5L12 11l2.5 2.5",
  sea: "M2 15c2-1 4-3 6-3s4 2 6 3 4 3 6 3M4 18c1.5-.5 3-1.5 4.5-1.5S10 17.5 12 18",
  breath: "M12 3c4 3 6 6 6 9a6 6 0 11-12 0c0-3 2-6 6-9z",
  circle: "M9 8a2.5 2.5 0 110-5 2.5 2.5 0 010 5zM16 9a2 2 0 110-4 2 2 0 010 4zM4 18c0-2.5 2.5-4 5-4s5 1.5 5 4",
  transport: "M4 16h16M6 16V8l3-2h6l3 2v8M7 16v2M17 16v2M9 11h6",
  ice: "M12 2v6M8 6h8M6 14c0-3.3 2.7-6 6-6s6 2.7 6 6v2H6v-2zM9 18h6",
};

export function DahabIncIcon({ name, className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden
    >
      <path d={paths[name]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export type DahabKey = DictKey;
