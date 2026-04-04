"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Logo from "@/components/ui/Logo";
import BackgroundDecor from "@/components/ui/BackgroundDecor";
import Footer from "@/components/layout/Footer";

const PendingIcon     = dynamic(() => import("@/assets/icons/PendingIcon"),     { loading: () => null });
const RefreshIcon     = dynamic(() => import("@/assets/icons/RefreshIcon"),     { loading: () => null });
const ButtonSpinner   = dynamic(() => import("@/assets/icons/ButtonSpinner"),   { loading: () => null });
const SignOutIcon     = dynamic(() => import("@/assets/icons/SignOutIcon"),     { loading: () => null });

export default function PendingPage() {
  const router = useRouter();
  const [signing, setSigning]       = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [denied, setDenied]         = useState(false);

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
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center px-6 relative">
      <BackgroundDecor position="fixed" linesOpacity="opacity-40" />

      <div className="relative flex flex-col items-center text-center max-w-sm w-full">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12 anim-fade-in">
          <Logo size={24} corners={false} />
          <span className="font-display text-[16px] text-cream-DEFAULT tracking-widest">VIDEOLIB</span>
        </div>

        {/* Icon */}
        <div className="mb-8 anim-fade-up">
          <PendingIcon size={48} className="mx-auto" />
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
          {refreshing
            ? <ButtonSpinner size={14} />
            : <RefreshIcon size={14} />
          }
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
          {signing ? <ButtonSpinner size={14} /> : <SignOutIcon size={14} />}
          {signing ? "Signing out…" : "Sign out"}
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
}
