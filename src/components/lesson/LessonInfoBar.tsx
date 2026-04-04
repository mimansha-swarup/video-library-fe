"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useQueryClient } from "@tanstack/react-query";
import { updateProgress, QUERY_KEYS } from "@/lib/api";
import type { CourseWithModules, Lesson, ModuleWithLessons } from "@/lib/types";
import { padIndex } from "@/lib/utils";

const TickIcon = dynamic(() => import("@/assets/icons/TickIcon"), { loading: () => null });

interface Props {
  courseId: string;
  course: CourseWithModules;
  lesson: Lesson;
  parentModule: ModuleWithLessons | undefined;
  idx: number;
  total: number;
  completed?: boolean;
  lastWatchedSecond?: number;
}

export default function LessonInfoBar({
  courseId,
  course,
  lesson,
  parentModule,
  idx,
  total,
  completed = false,
  lastWatchedSecond = 0,
}: Props) {
  const queryClient = useQueryClient();
  const [isCompleted, setIsCompleted] = useState(completed);
  const [saving, setSaving] = useState(false);

  async function toggleComplete() {
    setSaving(true);
    const next = !isCompleted;
    try {
      await updateProgress(lesson.id, lastWatchedSecond, next);
      setIsCompleted(next);
      // Refresh progress cache so sidebar checkmarks + home page card update
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.progress }),
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.progressSummary }),
      ]);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="border-b border-gold bg-bg-2">
      <div className="px-6 lg:px-10 py-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Link href={`/courses/${courseId}`} className="font-mono text-[10px] tracking-widest text-muted uppercase hover:text-gold transition-colors">
              {course.title}
            </Link>
            {parentModule && (
              <>
                <span className="text-muted-2 text-[10px]">/</span>
                <span className="font-mono text-[10px] tracking-widest text-muted uppercase">{parentModule.title}</span>
              </>
            )}
          </div>
          <h1 className="font-display text-[clamp(1.2rem,3vw,1.8rem)] text-cream-DEFAULT leading-tight">
            {lesson.title}
          </h1>

          {/* Mark as complete */}
          <button
            onClick={toggleComplete}
            disabled={saving}
            className={`mt-4 inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
              isCompleted
                ? "text-gold hover:text-muted"
                : "text-muted hover:text-gold"
            }`}
          >
            <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
              isCompleted ? "border-gold bg-gold/20" : "border-muted-2"
            }`}>
              {isCompleted && <TickIcon size={7} />}
            </span>
            {saving ? "Saving…" : isCompleted ? "Completed" : "Mark as complete"}
          </button>
        </div>

        <div className="shrink-0 text-right">
          <p className="font-mono text-[10px] text-muted uppercase tracking-widest">Lesson</p>
          <p className="font-display text-[24px] text-gold leading-none mt-0.5">
            {padIndex(idx + 1)}
            <span className="text-muted-2 text-[16px]">/{padIndex(total)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
