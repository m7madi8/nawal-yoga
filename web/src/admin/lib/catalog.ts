import type { ContentPage, ManagedEvent, ManagedRetreat } from "./types";

const RETREATS_KEY = "nawal-admin-retreats";
const EVENTS_KEY = "nawal-admin-events";
const CONTENT_KEY = "nawal-admin-content";
const NOTES_KEY = "nawal-admin-student-notes";

export const SEED_RETREATS: ManagedRetreat[] = [
  {
    id: "dahab",
    title: "Dahab Retreat",
    location: "Dahab, Egypt",
    startDate: "2026-08-19",
    endDate: "2026-08-24",
    capacity: 16,
    enrolled: 0,
    status: "open",
    cover: "/media/dahab/cover.jpeg",
    priceLabel: "From ₪2,450",
  },
  {
    id: "zanzibar",
    title: "Zanzibar Retreat",
    location: "Zanzibar",
    startDate: "2026-11-01",
    endDate: "2026-11-07",
    capacity: 14,
    enrolled: 0,
    status: "coming_soon",
    cover: "/media/zanzibar/pexels-taryn-elliott-5859002.jpg",
    priceLabel: "Coming soon",
  },
  {
    id: "wadi-rum",
    title: "Wadi Rum Retreat",
    location: "Wadi Rum, Jordan",
    startDate: "2027-03-10",
    endDate: "2027-03-14",
    capacity: 12,
    enrolled: 0,
    status: "coming_soon",
    cover: "/media/wadi-rum/cover.jpg",
    priceLabel: "Coming soon",
  },
];

export const SEED_EVENTS: ManagedEvent[] = [
  {
    id: "sound-healing",
    title: "Sound Healing",
    type: "day",
    date: "2026-09-12",
    place: "Haifa",
    capacity: 24,
    registered: 0,
    status: "open",
    cover: "/media/events/sound-healing-01.jpg",
  },
  {
    id: "ice-bath",
    title: "Ice Bath Day Retreat",
    type: "day",
    date: "2026-10-04",
    place: "Haifa region",
    capacity: 18,
    registered: 0,
    status: "open",
    cover: "/media/events/ice-bath/hero.jpg",
  },
  {
    id: "nature-chocolate",
    title: "Nature & Chocolate",
    type: "day",
    date: "2026-10-25",
    place: "Nature",
    capacity: 20,
    registered: 0,
    status: "open",
    cover: "/media/events/nature-chocolate-hero.jpg",
  },
  {
    id: "haifa-power",
    title: "Power Yoga · Tuesday",
    type: "session",
    date: "Weekly",
    place: "Khayat St. 1, Haifa",
    capacity: 16,
    registered: 0,
    status: "open",
    cover: "/media/haifa/hero.jpg",
  },
  {
    id: "haifa-calm",
    title: "Calm & Deep Rest · Saturday",
    type: "session",
    date: "Weekly",
    place: "Hecht Park, Haifa",
    capacity: 20,
    registered: 0,
    status: "open",
    cover: "/media/haifa/sunset-01.jpg",
  },
];

export const SEED_CONTENT: ContentPage[] = [
  {
    id: "home",
    title: "Homepage",
    kind: "homepage",
    status: "published",
    updatedAt: new Date().toISOString(),
    note: "Hero, about, feel, pathways, join",
  },
  {
    id: "practice",
    title: "Haifa Yoga",
    kind: "practice",
    status: "published",
    updatedAt: new Date().toISOString(),
    note: "Weekly classes, pricing, register sheet",
  },
  {
    id: "dahab-page",
    title: "Dahab retreat page",
    kind: "retreat",
    status: "published",
    updatedAt: new Date().toISOString(),
    note: "Program, FAQ, gallery, booking",
  },
  {
    id: "events-hub",
    title: "Events hub",
    kind: "event",
    status: "published",
    updatedAt: new Date().toISOString(),
    note: "Sound healing, ice bath, nature & chocolate",
  },
  {
    id: "gallery",
    title: "Galleries",
    kind: "gallery",
    status: "published",
    updatedAt: new Date().toISOString(),
    note: "Home / Haifa / Dahab / Events media",
  },
  {
    id: "voices",
    title: "Testimonials",
    kind: "testimonial",
    status: "draft",
    updatedAt: new Date().toISOString(),
    note: "Community voices — ready to publish when curated",
  },
  {
    id: "horizon",
    title: "Coming soon experiences",
    kind: "coming_soon",
    status: "draft",
    updatedAt: new Date().toISOString(),
    note: "Mats, conference, pregnancy yoga interest",
  },
];

function read<T>(key: string, seed: T): T {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return seed;
    return JSON.parse(raw) as T;
  } catch {
    return seed;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadRetreats() {
  return read(RETREATS_KEY, SEED_RETREATS);
}

export function saveRetreats(rows: ManagedRetreat[]) {
  write(RETREATS_KEY, rows);
}

export function loadEvents() {
  return read(EVENTS_KEY, SEED_EVENTS);
}

export function saveEvents(rows: ManagedEvent[]) {
  write(EVENTS_KEY, rows);
}

export function loadContent() {
  return read(CONTENT_KEY, SEED_CONTENT);
}

export function saveContent(rows: ContentPage[]) {
  write(CONTENT_KEY, rows);
}

export function loadStudentNotes(): Record<string, string> {
  return read(NOTES_KEY, {});
}

export function saveStudentNote(studentId: string, note: string) {
  const all = loadStudentNotes();
  all[studentId] = note;
  write(NOTES_KEY, all);
}
