import type { RetreatRequest, RequestStatus } from "./types";

const SUPABASE_URL = "https://xzxyskufrqansbhsbdkt.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_V9_4QWGDFv6Vm-4DQifYGA_1xdoKkph";
const SUPABASE_TABLE = "retreat_requests";

function headers(extra?: HeadersInit): HeadersInit {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    ...extra,
  };
}

function asArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

export function normalizeRequest(raw: Record<string, unknown>): RetreatRequest {
  return {
    id: String(raw.id ?? ""),
    source: String(raw.source ?? ""),
    retreatType: String(raw.retreatType ?? raw.retreat_type ?? ""),
    submittedAt: String(raw.submittedAt ?? raw.submitted_at ?? raw.createdAt ?? ""),
    fullName: String(raw.fullName ?? raw.full_name ?? raw["الاسم"] ?? ""),
    phone: String(raw.phone ?? raw["الهاتف"] ?? ""),
    age: String(raw.age ?? ""),
    city: String(raw.city ?? ""),
    reason: String(raw.reason ?? ""),
    expectation: String(raw.expectation ?? ""),
    yogaExperience: String(raw.yogaExperience ?? raw.yoga_experience ?? ""),
    healthStatus: String(raw.healthStatus ?? raw.health_status ?? ""),
    healthDetails: String(raw.healthDetails ?? raw.health_details ?? ""),
    activities: asArray(raw.activities),
    freeNote: String(raw.freeNote ?? raw.free_note ?? ""),
    status: (String(raw.status || "pending") === "completed" ? "completed" : "pending") as RequestStatus,
    createdAt: String(raw.createdAt ?? raw.created_at ?? raw.submittedAt ?? ""),
  };
}

export async function fetchAllRequests(): Promise<RetreatRequest[]> {
  const url = `${SUPABASE_URL}/rest/v1/${encodeURIComponent(SUPABASE_TABLE)}?select=*&order=submittedAt.desc`;
  const res = await fetch(url, { headers: headers(), cache: "no-store" });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Failed to load requests (${res.status})`);
  }
  const rows = (await res.json()) as Record<string, unknown>[];
  return rows.map(normalizeRequest);
}

export async function updateRequestStatus(id: string, status: RequestStatus) {
  const url = `${SUPABASE_URL}/rest/v1/${encodeURIComponent(SUPABASE_TABLE)}?id=eq.${encodeURIComponent(id)}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: headers({ "Content-Type": "application/json", Prefer: "return=minimal" }),
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Failed to update status (${res.status})`);
  }
}

export async function deleteRequest(id: string) {
  const url = `${SUPABASE_URL}/rest/v1/${encodeURIComponent(SUPABASE_TABLE)}?id=eq.${encodeURIComponent(id)}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: headers({ Prefer: "return=minimal" }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Failed to delete (${res.status})`);
  }
}
