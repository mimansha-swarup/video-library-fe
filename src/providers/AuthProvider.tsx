"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "firebase/auth";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]       = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let unsub: (() => void) | undefined;

    Promise.all([
      import("@/lib/firebase"),
      import("firebase/auth"),
    ]).then(([{ getFirebaseAuth }, { onAuthStateChanged }]) => {
      if (cancelled) return;
      unsub = onAuthStateChanged(getFirebaseAuth(), (u) => {
        setUser(u);
        setLoading(false);
      });
    });

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
