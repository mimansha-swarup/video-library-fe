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
  approved: boolean;
}

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true, approved: false });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]         = useState<User | null>(null);
  const [loading, setLoading]   = useState(true);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let unsub: (() => void) | undefined;

    Promise.all([
      import("@/lib/firebase"),
      import("firebase/auth"),
    ]).then(([{ getFirebaseAuth }, { onAuthStateChanged }]) => {
      if (cancelled) return;
      unsub = onAuthStateChanged(getFirebaseAuth(), async (u) => {
        if (u) {
          const tokenResult = await u.getIdTokenResult(true);
          if (!cancelled) setApproved(!!tokenResult.claims.approved);
        } else {
          if (!cancelled) setApproved(false);
        }
        if (!cancelled) {
          setUser(u);
          setLoading(false);
        }
      });
    });

    return () => {
      cancelled = true;
      unsub?.();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, approved }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
