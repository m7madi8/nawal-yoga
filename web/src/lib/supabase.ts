const SUPABASE_URL = "https://xzxyskufrqansbhsbdkt.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_V9_4QWGDFv6Vm-4DQifYGA_1xdoKkph";
const SUPABASE_TABLE = "retreat_requests";

export async function submitRetreatRequest(payload: Record<string, unknown>) {
  const url = `${SUPABASE_URL}/rest/v1/${encodeURIComponent(SUPABASE_TABLE)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify([payload]),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Supabase error ${res.status}`);
  }
}

export function makeRequestId(prefix: string) {
  return `req-${prefix}-${Date.now()}`;
}
