"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import BackgroundDecor from "@/components/ui/BackgroundDecor";

export default function PendingPage() {
  const router = useRouter();
  const [signing, setSigning]     = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [denied, setDenied]       = useState(false);

  async function handleRefresh() {
    setRefreshing(true);
    setDenied(false);
    try {
      const { getFirebaseAuth } = await import("@/lib/firebase");
      const user = getFirebaseAuth().currentUser;
      if (!user) {
        router.replace("/login");
        return;
      }
      const tokenResult = await user.getIdTokenResult(true);
      if (tokenResult.claims.approved) {
        router.replace("/");
      } else {
        setDenied(true);
      }
    } finally {
      setRefreshing(false);
    }
  }

  async function handleSignOut() {
    setSigning(true);
    const [{ getFirebaseAuth }, { signOut }] = await Promise.all([
      import("@/lib/firebase"),
      import("firebase/auth"),
    ]);
    await signOut(getFirebaseAuth());
    router.replace("/login");
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6">
      {/* Grid lines + gold bloom (mirrors login page) */}
      <BackgroundDecor position="fixed" linesOpacity="opacity-40" />

      <div className="relative flex flex-col items-center text-center max-w-sm w-full">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12 anim-fade-in">
          <Logo size={24} corners={false} />
          <span className="font-display text-[16px] text-cream-DEFAULT tracking-widest">VIDEOLIB</span>
        </div>

        {/* Icon */}
        <div className="mb-8 anim-fade-up">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto">
            <circle cx="24" cy="24" r="23" stroke="#D4A84B" strokeWidth="1" opacity="0.3" />
            <circle cx="24" cy="24" r="14" stroke="#D4A84B" strokeWidth="1" opacity="0.5" />
            <path
              d="M24 16v9M24 29v2"
              stroke="#D4A84B"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Copy */}
        <div className="mb-10 anim-fade-up" style={{ animationDelay: "60ms" }}>
          <p className="font-mono text-[10px] tracking-[0.22em] text-gold uppercase mb-3">
            Access Pending
          </p>
          <h1 className="font-display text-[1.75rem] text-cream-DEFAULT leading-tight mb-4">
            Awaiting approval
          </h1>
          <p className="text-[13px] text-muted leading-relaxed">
            Your account has been created but access hasn&apos;t been granted yet.
            Contact your administrator to request approval.
          </p>
        </div>

        {/* Divider */}
        <div className="w-full flex items-center gap-3 mb-8 anim-fade-up" style={{ animationDelay: "100ms" }}>
          <div className="flex-1 h-px bg-gold opacity-15" />
        </div>

        {/* Refresh */}
        <button
          onClick={handleRefresh}
          disabled={refreshing || signing}
          className="anim-fade-up w-full flex items-center justify-center gap-2 bg-gold/10 border border-gold-md hover:border-gold-hi hover:bg-gold/20 rounded-sm px-5 py-3.5 text-[13px] font-semibold text-gold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-card mb-3"
          style={{ animationDelay: "140ms" }}
        >
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            className={refreshing ? "animate-spin" : ""}
          >
            <path
              d="M12.5 7A5.5 5.5 0 1 1 9.4 2.1"
              stroke="#D4A84B" strokeWidth="1.2" strokeLinecap="round" fill="none"
            />
            <path d="M9 1v3.5H12.5" stroke="#D4A84B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {refreshing ? "Checking…" : "Check approval status"}
        </button>

        {denied && (
          <p className="text-[11px] text-muted mb-3 anim-fade-in">
            Not approved yet. Contact your administrator.
          </p>
        )}

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          disabled={signing || refreshing}
          className="anim-fade-up w-full flex items-center justify-center gap-2 bg-bg-2 border border-gold-md hover:border-gold-hi hover:bg-bg-3 rounded-sm px-5 py-3.5 text-[13px] font-semibold text-cream-DEFAULT transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-card"
          style={{ animationDelay: "140ms" }}
        >
          {signing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="animate-spin">
              <circle cx="7" cy="7" r="5.5" stroke="#D4A84B" strokeWidth="1" opacity="0.2" />
              <circle cx="7" cy="7" r="5.5" stroke="#D4A84B" strokeWidth="1" strokeDasharray="10 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 7h7M9 5l2 2-2 2" stroke="#D4A84B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4" stroke="#D4A84B" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          )}
          {signing ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </div>
  );
}
