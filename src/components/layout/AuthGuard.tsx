"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useAuth } from "@/providers/AuthProvider";

const SpinnerIcon = dynamic(() => import("@/assets/icons/SpinnerIcon"), { loading: () => null });

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
          <SpinnerIcon size={36} style={{ animationDuration: "1.4s" }} />
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
