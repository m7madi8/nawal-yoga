import type { RequestSource } from "./types";

export const MEDICAL_SOURCES: RequestSource[] = [
  "mountain-voice",
  "mountain-voice-registration",
  "ice-bath-health",
];

export const RETREAT_SOURCES: RequestSource[] = [
  "dahab-retreat-reserve",
  "wadi-rum-registration",
  "zanzibar-retreat-reserve",
];

export const YOGA_SOURCES: RequestSource[] = [
  "yoga-class-registration",
  "yoga-class-request",
];

export function sourceLabel(source: string): string {
  const map: Record<string, string> = {
    "mountain-voice": "Mountain Voice Health",
    "mountain-voice-registration": "Mountain Voice Health",
    "ice-bath-health": "Ice Bath Health",
    "dahab-retreat-reserve": "Dahab Retreat",
    "wadi-rum-registration": "Wadi Rum Retreat",
    "zanzibar-retreat-reserve": "Zanzibar Retreat",
    "yoga-class-registration": "Haifa Yoga",
    "yoga-class-request": "Yoga Class",
  };
  return map[source] || source || "Unknown";
}

export function sourceKind(
  source: string,
): "medical" | "retreat" | "yoga" | "event" | "other" {
  if (MEDICAL_SOURCES.includes(source)) return "medical";
  if (RETREAT_SOURCES.includes(source)) return "retreat";
  if (YOGA_SOURCES.includes(source)) return "yoga";
  return "other";
}

export function formatDate(value: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function formatShortDate(value: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function relativeTime(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatShortDate(value);
}

export function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "");
}

export function waHref(phone: string) {
  const digits = phoneDigits(phone);
  if (!digits) return "#";
  const normalized = digits.startsWith("0") ? `972${digits.slice(1)}` : digits;
  return `https://wa.me/${normalized}`;
}
