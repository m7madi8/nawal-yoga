export type RequestStatus = "pending" | "completed";

export type RequestSource =
  | "mountain-voice"
  | "mountain-voice-registration"
  | "ice-bath-health"
  | "ice-bath-registration"
  | "dahab-retreat-reserve"
  | "wadi-rum-registration"
  | "zanzibar-retreat-reserve"
  | "yoga-class-registration"
  | "yoga-class-request"
  | string;

export type RetreatRequest = {
  id: string;
  source: RequestSource;
  retreatType: string;
  submittedAt: string;
  fullName: string;
  phone: string;
  age: string;
  city: string;
  reason: string;
  expectation: string;
  yogaExperience: string;
  healthStatus: string;
  healthDetails: string;
  activities: string[];
  freeNote: string;
  status: RequestStatus;
  createdAt: string;
};

export type NavItem = {
  href: string;
  label: string;
  icon: "overview" | "retreats" | "events" | "students" | "forms" | "content" | "settings";
  badge?: number;
};

export type ManagedRetreat = {
  id: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  capacity: number;
  enrolled: number;
  status: "draft" | "open" | "full" | "completed" | "coming_soon";
  cover: string;
  priceLabel: string;
};

export type ManagedEvent = {
  id: string;
  title: string;
  type: "workshop" | "session" | "day" | "conference";
  date: string;
  place: string;
  capacity: number;
  registered: number;
  status: "draft" | "open" | "sold_out" | "completed";
  cover: string;
};

export type ContentPage = {
  id: string;
  title: string;
  kind: "homepage" | "retreat" | "event" | "practice" | "gallery" | "testimonial" | "coming_soon";
  status: "published" | "draft";
  updatedAt: string;
  note: string;
};

export type Student = {
  id: string;
  fullName: string;
  phone: string;
  city: string;
  registrations: number;
  lastSeen: string;
  sources: string[];
  notes: string;
};
