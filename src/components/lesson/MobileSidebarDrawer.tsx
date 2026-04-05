"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import type { ModuleWithLessons, UserProgress } from "@/lib/types";

const ModuleSidebar = dynamic(() => import("@/components/course/ModuleSidebar"));

interface Props {
  courseId: string;
  modules: ModuleWithLessons[];
  activeLessonId: string;
  progress: Record<string, UserProgress>;
}

export default function MobileSidebarDrawer({ courseId, modules, activeLessonId, progress }: Props) {
  const [open, setOpen] = useState(false);

  // Close drawer when navigating to a different lesson
  useEffect(() => {
    setOpen(false);
  }, [activeLessonId]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Fixed bottom bar — mobile only */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-gold bg-bg-2 shadow-inset-top">
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center justify-between px-6 py-3 hover:bg-bg-3 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <svg width={13} height={13} viewBox="0 0 14 14" fill="none">
              <path d="M2 3.5h10M2 7h10M2 10.5h10" stroke="#D4A84B" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-[10px] tracking-[0.18em] text-gold uppercase">
              Course Content
            </span>
          </div>
          <svg width={12} height={12} viewBox="0 0 14 14" fill="none">
            <path d="M3 9l4-4 4 4" stroke="#D4A84B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 z-50 w-[85vw] max-w-[340px] flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer close bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-gold bg-bg-2 shrink-0">
          <span className="font-mono text-[10px] tracking-[0.18em] text-gold uppercase">
            Course Content
          </span>
          <button
            onClick={() => setOpen(false)}
            className="p-1 text-muted hover:text-cream-DEFAULT transition-colors"
            aria-label="Close"
          >
            <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
              <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Sidebar content — reuse the same component */}
        <div className="flex-1 overflow-hidden">
          <ModuleSidebar
            courseId={courseId}
            modules={modules}
            activeLessonId={activeLessonId}
            progress={progress}
            hideHeader
          />
        </div>
      </div>
    </>
  );
}
