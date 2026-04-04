"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { ModuleWithLessons } from "@/lib/types";
import { formatDuration, padIndex } from "@/lib/utils";

const ChevronDownIcon = dynamic(() => import("@/assets/icons/ChevronDownIcon"), { loading: () => null });
const PlayIcon        = dynamic(() => import("@/assets/icons/PlayIcon"),        { loading: () => null });

interface Props {
  courseId: string;
  modules: ModuleWithLessons[];
  activeLessonId?: string;
}

export default function ModuleSidebar({ courseId, modules, activeLessonId }: Props) {
  const [openModules, setOpenModules] = useState<Record<string, boolean>>(
    Object.fromEntries(modules.map((m) => [m.id, true]))
  );

  function toggle(id: string) {
    setOpenModules((p) => ({ ...p, [id]: !p[id] }));
  }

  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);

  return (
    <aside className="flex flex-col h-full bg-bg-2 overflow-hidden">
      <div className="px-5 py-4 border-b border-gold shrink-0">
        <p className="font-mono text-[10px] tracking-[0.18em] text-gold uppercase">
          Course Content
        </p>
        <p className="mt-1 text-[11px] text-muted">
          {modules.length} modules &middot; {totalLessons} lessons
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {modules.map((mod, modIdx) => (
          <div key={mod.id} className="border-b border-gold">
            <button
              onClick={() => toggle(mod.id)}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-bg-3 transition-colors group/mod"
            >
              <span className="font-mono text-[10px] text-gold-dim shrink-0 w-5">
                {padIndex(modIdx + 1)}
              </span>
              <span className="text-[12px] font-semibold text-cream-dim group-hover/mod:text-cream-DEFAULT transition-colors leading-snug flex-1">
                {mod.title}
              </span>
              <ChevronDownIcon
                size={12}
                className={`shrink-0 text-muted transition-transform duration-200 ${openModules[mod.id] ? "rotate-180" : ""}`}
              />
            </button>

            {openModules[mod.id] && (
              <ul className="py-1">
                {mod.lessons.map((lesson, lesIdx) => {
                  const isActive = lesson.id === activeLessonId;
                  return (
                    <li key={lesson.id}>
                      <Link
                        href={`/courses/${courseId}/lessons/${lesson.id}`}
                        className={`relative flex items-center gap-3 pl-10 pr-5 py-2.5 text-[12px] transition-all duration-150 ${
                          isActive
                            ? "bg-bg-3 text-gold"
                            : "text-muted hover:bg-bg-3 hover:text-cream-DEFAULT"
                        }`}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-gold rounded-r-full" />
                        )}

                        <span className={`font-mono text-[10px] shrink-0 w-4 text-right ${isActive ? "text-gold" : "text-muted-2"}`}>
                          {padIndex(lesIdx + 1)}
                        </span>

                        <span className="flex-1 leading-snug line-clamp-2">
                          {lesson.title}
                        </span>

                        {lesson.duration > 0 && (
                          <span className="font-mono text-[10px] shrink-0 text-muted-2 tabular-nums">
                            {formatDuration(lesson.duration)}
                          </span>
                        )}

                        {isActive && (
                          <span className="shrink-0">
                            <PlayIcon size={10} />
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
