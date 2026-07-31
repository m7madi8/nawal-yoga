const AUTH_KEY = "yogaAdminSession";
const USERNAME = "nawal";
const PASSWORD = "nawalll";

export type AdminSession = {
  isLoggedIn: boolean;
  username: string;
};

export function getSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(AUTH_KEY) || "null");
  } catch {
    return null;
  }
}

export function setSession() {
  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify({ isLoggedIn: true, username: USERNAME } satisfies AdminSession),
  );
}

export function clearSession() {
  localStorage.removeItem(AUTH_KEY);
}

export function validateCredentials(username: string, password: string) {
  return username.trim() === USERNAME && password.trim() === PASSWORD;
}

export { AUTH_KEY };
