"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  STORE_EVENT,
  createAccount,
  getAccounts,
  getSessionId,
  seedIfEmpty,
  setSessionId,
  updateAccount,
} from "@/lib/store";
import type { Account, Role } from "@/lib/types";

type AuthCtx = {
  ready: boolean;
  account: Account | null;
  allAccounts: Account[];
  signIn: (email: string, password: string) => Promise<Account>;
  signUp: (
    input: {
      name: string;
      email: string;
      password: string;
      role: Role;
      therapist?: NonNullable<Account["therapist"]>;
    }
  ) => Promise<Account>;
  signOut: () => void;
  refresh: () => void;
  updateProfile: (patch: Partial<Account>) => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [allAccounts, setAllAccounts] = useState<Account[]>([]);
  const [sessionId, setSessId] = useState<string | null>(null);

  const refresh = useCallback(() => {
    setAllAccounts(getAccounts());
    setSessId(getSessionId());
  }, []);

  useEffect(() => {
    seedIfEmpty();
    refresh();
    setReady(true);
    const onStore = () => refresh();
    window.addEventListener(STORE_EVENT, onStore);
    window.addEventListener("storage", onStore);
    return () => {
      window.removeEventListener(STORE_EVENT, onStore);
      window.removeEventListener("storage", onStore);
    };
  }, [refresh]);

  const account = useMemo(
    () => allAccounts.find((a) => a.id === sessionId) ?? null,
    [allAccounts, sessionId]
  );

  const signIn = useCallback(async (email: string, password: string) => {
    const match = getAccounts().find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );
    if (!match) throw new Error("Invalid email or password.");
    setSessionId(match.id);
    refresh();
    return match;
  }, [refresh]);

  const signUp = useCallback<AuthCtx["signUp"]>(
    async (input) => {
      const acc = createAccount({
        name: input.name,
        email: input.email,
        password: input.password,
        role: input.role,
        therapist: input.therapist,
      });
      setSessionId(acc.id);
      refresh();
      return acc;
    },
    [refresh]
  );

  const signOut = useCallback(() => {
    setSessionId(null);
    refresh();
  }, [refresh]);

  const updateProfile = useCallback(
    (patch: Partial<Account>) => {
      if (!account) return;
      updateAccount(account.id, patch);
      refresh();
    },
    [account, refresh]
  );

  const value = useMemo<AuthCtx>(
    () => ({ ready, account, allAccounts, signIn, signUp, signOut, refresh, updateProfile }),
    [ready, account, allAccounts, signIn, signUp, signOut, refresh, updateProfile]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
