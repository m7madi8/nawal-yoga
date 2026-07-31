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
import { clearSession, getSession, setSession, validateCredentials } from "@/admin/lib/auth";

type AuthCtx = {
  ready: boolean;
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const s = getSession();
    setUsername(s?.isLoggedIn ? s.username : null);
    setReady(true);
  }, []);

  const login = useCallback((u: string, p: string) => {
    if (!validateCredentials(u, p)) return false;
    setSession();
    setUsername("nawal");
    return true;
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUsername(null);
  }, []);

  const value = useMemo(
    () => ({
      ready,
      isAuthenticated: Boolean(username),
      username,
      login,
      logout,
    }),
    [ready, username, login, logout],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
