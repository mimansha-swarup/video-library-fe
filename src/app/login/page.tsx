"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import Logo from "@/components/ui/Logo";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [signing, setSigning] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) router.replace("/");
  }, [user, loading, router]);

  async function handleGoogle() {
    setSigning(true);
    setError(null);
    try {
      const [{ getFirebaseAuth, getGoogleProvider }, { signInWithPopup }] = await Promise.all([
        import("@/lib/firebase"),
        import("firebase/auth"),
      ]);
      await signInWithPopup(getFirebaseAuth(), getGoogleProvider());
      router.replace("/");
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
        {/* Grid lines */}
        <div className="absolute inset-0 bg-hero-lines opacity-60 pointer-events-none" />
        {/* Gold radial bloom */}
        <div className="absolute inset-0 bg-radial-gold pointer-events-none" />
        {/* Decorative reel watermark */}
        <div className="absolute -bottom-24 -left-24 opacity-[0.04] pointer-events-none">
          <svg width="480" height="480" viewBox="0 0 480 480" fill="none">
            <circle cx="240" cy="240" r="238" stroke="#D4A84B" strokeWidth="2"/>
            <circle cx="240" cy="240" r="160" stroke="#D4A84B" strokeWidth="2"/>
            <circle cx="240" cy="240" r="80"  stroke="#D4A84B" strokeWidth="2"/>
            <circle cx="240" cy="240" r="30"  stroke="#D4A84B" strokeWidth="2"/>
            {[0,60,120,180,240,300].map((deg) => (
              <circle
                key={deg}
                cx={240 + 160 * Math.cos((deg * Math.PI) / 180)}
                cy={240 + 160 * Math.sin((deg * Math.PI) / 180)}
                r="18"
                fill="#D4A84B"
              />
            ))}
          </svg>
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
            {signing ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="animate-spin">
                <circle cx="9" cy="9" r="7.5" stroke="#D4A84B" strokeWidth="1.2" opacity="0.2"/>
                <circle cx="9" cy="9" r="7.5" stroke="#D4A84B" strokeWidth="1.2" strokeDasharray="18 30" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
            )}
            {signing ? "Signing in…" : "Continue with Google"}
          </button>

          {/* Error */}
          {error && (
            <div className="mt-4 flex items-start gap-2.5 border border-red-900/60 bg-red-950/30 rounded-sm px-4 py-3 anim-fade-in">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
                <circle cx="7" cy="7" r="6" stroke="#f87171" strokeWidth="1"/>
                <path d="M7 4v3M7 9.5v.5" stroke="#f87171" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
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
