"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, approved } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
    } else if (!approved) {
      router.replace("/pending");
    }
  }, [user, loading, approved]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            className="animate-spin"
            style={{ animationDuration: "1.4s" }}
          >
            <circle cx="18" cy="18" r="16" stroke="#D4A84B" strokeWidth="1" opacity="0.2"/>
            <circle cx="18" cy="18" r="16" stroke="#D4A84B" strokeWidth="1"
              strokeDasharray="40 60" strokeLinecap="round"/>
            <circle cx="18" cy="18" r="6" stroke="#D4A84B" strokeWidth="1" opacity="0.5"/>
            <circle cx="18" cy="4"  r="2.5" fill="#D4A84B" opacity="0.6"/>
            <circle cx="18" cy="32" r="2.5" fill="#D4A84B" opacity="0.6"/>
            <circle cx="4"  cy="18" r="2.5" fill="#D4A84B" opacity="0.6"/>
            <circle cx="32" cy="18" r="2.5" fill="#D4A84B" opacity="0.6"/>
          </svg>
          <p className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
            Loading
          </p>
        </div>
      </div>
    );
  }

  if (!user || !approved) return null;

  return <>{children}</>;
}
