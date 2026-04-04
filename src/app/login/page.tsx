"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useAuth } from "@/providers/AuthProvider";
import Logo from "@/components/ui/Logo";
import BackgroundDecor from "@/components/ui/BackgroundDecor";

const ButtonSpinner     = dynamic(() => import("@/assets/icons/ButtonSpinner"),     { loading: () => null });
const GoogleIcon        = dynamic(() => import("@/assets/icons/GoogleIcon"),        { loading: () => null });
const ErrorCircleIcon   = dynamic(() => import("@/assets/icons/ErrorCircleIcon"),   { loading: () => null });
const ReelWatermarkIcon = dynamic(() => import("@/assets/icons/ReelWatermarkIcon"), { loading: () => null });

export default function LoginPage() {
  const { user, loading, approved } = useAuth();
  const router = useRouter();
  const [signing, setSigning] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      router.replace(approved ? "/" : "/pending");
    }
  }, [user, loading, approved, router]);

  async function handleGoogle() {
    setSigning(true);
    setError(null);
    try {
      const [{ getFirebaseAuth, getGoogleProvider }, { signInWithPopup }] = await Promise.all([
        import("@/lib/firebase"),
        import("firebase/auth"),
      ]);
      const { user: signedInUser } = await signInWithPopup(getFirebaseAuth(), getGoogleProvider());
      const tokenResult = await signedInUser.getIdTokenResult(true);
      router.replace(tokenResult.claims.approved ? "/" : "/pending");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Sign-in failed. Please try again.";
      setError(msg);
      setSigning(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-bg flex overflow-hidden">

      {/* ── Left panel — branding ───────────────────────────── */}
      <div className="hidden lg:flex flex-col justify-between w-[52%] border-r border-gold p-12 relative overflow-hidden">
        <BackgroundDecor linesOpacity="opacity-60" />
        {/* Decorative reel watermark */}
        <div className="absolute -bottom-24 -left-24 opacity-[0.04] pointer-events-none">
          <ReelWatermarkIcon />
        </div>

        <div className="relative flex items-center gap-3 anim-fade-in">
          <Logo size={28} />
          <span className="font-display text-[17px] text-cream-DEFAULT tracking-widest">VIDEOLIB</span>
        </div>

        {/* Hero copy */}
        <div className="relative">
          <p className="gold-rule font-mono text-[10px] tracking-[0.22em] text-gold uppercase mb-6 anim-fade-in" style={{ animationDelay: "80ms" }}>
            Private Learning
          </p>
          <h1 className="font-display text-[clamp(2.4rem,4vw,3.6rem)] text-cream-DEFAULT leading-[1.08] mb-6 anim-fade-up" style={{ animationDelay: "140ms" }}>
            Your courses.<br />
            Your pace.<br />
            <em className="not-italic text-gold">Your library.</em>
          </h1>
          <p className="text-[13px] text-muted leading-relaxed max-w-sm anim-fade-up" style={{ animationDelay: "220ms" }}>
            A private, secure space to learn from curated video courses —
            streamed directly to you, at any time.
          </p>
        </div>

        {/* Bottom tagline */}
        <div className="relative flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-gold to-transparent opacity-25" />
          <p className="font-mono text-[10px] tracking-widest text-muted-2 uppercase">
            Secure · Private · Yours
          </p>
        </div>
      </div>

      {/* ── Right panel — sign-in ────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 relative">
        <div className="lg:hidden flex items-center gap-3 mb-12 anim-fade-in">
          <Logo size={24} corners={false} />
          <span className="font-display text-[16px] text-cream-DEFAULT tracking-widest">VIDEOLIB</span>
        </div>

        <div className="w-full max-w-[380px]">
          {/* Heading */}
          <div className="mb-10 anim-fade-up">
            <p className="font-mono text-[10px] tracking-[0.22em] text-gold uppercase mb-3">Access</p>
            <h2 className="font-display text-[2rem] text-cream-DEFAULT leading-tight">Welcome back</h2>
            <p className="mt-2 text-[13px] text-muted">Sign in to continue to your library.</p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-8 anim-fade-up" style={{ animationDelay: "60ms" }}>
            <div className="flex-1 h-px bg-gold opacity-20" />
            <span className="font-mono text-[9px] tracking-widest text-muted-2 uppercase">Continue with</span>
            <div className="flex-1 h-px bg-gold opacity-20" />
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogle}
            disabled={signing}
            className="anim-fade-up w-full flex items-center justify-center gap-3 bg-bg-2 border border-gold-md hover:border-gold-hi hover:bg-bg-3 rounded-sm px-5 py-3.5 text-[13px] font-semibold text-cream-DEFAULT transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group shadow-card"
            style={{ animationDelay: "100ms" }}
          >
            {signing ? <ButtonSpinner size={18} /> : <GoogleIcon size={18} />}
            {signing ? "Signing in…" : "Continue with Google"}
          </button>

          {/* Error */}
          {error && (
            <div className="mt-4 flex items-start gap-2.5 border border-red-900/60 bg-red-950/30 rounded-sm px-4 py-3 anim-fade-in">
              <ErrorCircleIcon size={14} className="shrink-0 mt-0.5" />
              <p className="text-[12px] text-red-400 leading-relaxed">{error}</p>
            </div>
          )}

          {/* Fine print */}
          <p className="mt-8 text-center text-[11px] text-muted-2 leading-relaxed anim-fade-up" style={{ animationDelay: "160ms" }}>
            Access is restricted to invited members.<br />
            Contact your administrator to request access.
          </p>
        </div>
      </div>
    </div>
  );
}

