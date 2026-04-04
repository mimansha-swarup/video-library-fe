"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  const { user } = useAuth();
  const router   = useRouter();

  async function handleSignOut() {
    const [{ getFirebaseAuth }, { signOut }] = await Promise.all([
      import("@/lib/firebase"),
      import("firebase/auth"),
    ]);
    await signOut(getFirebaseAuth());
    router.replace("/login");
  }

  return (
    <header className="sticky top-0 z-50 h-[60px] flex items-center border-b border-gold bg-bg/90 backdrop-blur-md shadow-inset-top">
      <nav className="max-w-[1400px] mx-auto w-full px-6 lg:px-10 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3 group">
          <Logo size={28} className="shrink-0" />
          <span
            className="font-display text-[17px] tracking-wide text-cream-DEFAULT group-hover:text-gold transition-colors duration-200"
            style={{ letterSpacing: "0.06em" }}
          >
            VIDEOLIB
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-1.5 font-mono text-[11px] tracking-widest text-muted uppercase hover:text-gold transition-colors duration-200 border border-transparent hover:border-gold rounded-sm"
          >
            Library
          </Link>

          {user && (
            <div className="flex items-center gap-3 pl-3 border-l border-gold">
              {user.photoURL ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.photoURL}
                  alt={user.displayName ?? ""}
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-full border border-gold opacity-90"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-bg-4 border border-gold flex items-center justify-center font-mono text-[11px] text-gold">
                  {(user.displayName ?? user.email ?? "?")[0].toUpperCase()}
                </div>
              )}

              <button
                onClick={handleSignOut}
                className="px-3 py-1.5 font-mono text-[10px] tracking-widest text-muted uppercase hover:text-gold transition-colors border border-transparent hover:border-gold rounded-sm"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
