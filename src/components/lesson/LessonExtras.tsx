"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Lesson } from "@/lib/types";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";

const NoteIcon       = dynamic(() => import("@/assets/icons/NoteIcon"),       { loading: () => null });
const TranscriptIcon = dynamic(() => import("@/assets/icons/TranscriptIcon"), { loading: () => null });
const AiNotesIcon    = dynamic(() => import("@/assets/icons/AiNotesIcon"),    { loading: () => null });

interface Props {
  lesson: Lesson;
}

type OpenPanel = "transcript" | "aiNotes" | null;

export default function LessonExtras({ lesson }: Props) {
  const [open, setOpen] = useState<OpenPanel>(null);

  const hasTranscript = !!lesson.transcript;
  const hasAiNotes    = !!lesson.aiNotes;

  if (!hasTranscript && !hasAiNotes) return null;

  function toggle(panel: OpenPanel) {
    setOpen((prev) => (prev === panel ? null : panel));
  }

  return (
    <div className="border-b border-gold bg-bg">
      <div className="px-6 lg:px-10 py-5">
        {/* Toggle buttons */}
        <div className="flex items-center gap-3 mb-4">
          {hasTranscript && (
            <button
              onClick={() => toggle("transcript")}
              className={`inline-flex items-center gap-2 border rounded-sm px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-all duration-200 ${
                open === "transcript"
                  ? "bg-gold text-bg border-gold"
                  : "bg-bg-2 border-gold-md text-cream-DEFAULT hover:border-gold-hi hover:bg-bg-3"
              }`}
            >
              <TranscriptIcon size={12} />
              Transcript
            </button>
          )}

          {hasAiNotes && (
            <button
              onClick={() => toggle("aiNotes")}
              className={`inline-flex items-center gap-2 border rounded-sm px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-all duration-200 ${
                open === "aiNotes"
                  ? "bg-gold text-bg border-gold"
                  : "bg-bg-2 border-gold-md text-cream-DEFAULT hover:border-gold-hi hover:bg-bg-3"
              }`}
            >
              <AiNotesIcon size={12} />
              AI Notes
            </button>
          )}
        </div>

        {/* Panels */}
        {open === "transcript" && lesson.transcript && (
          <div className="bg-bg-2 border border-gold rounded-sm px-4 py-4">
            <p className="font-mono text-[10px] tracking-[0.18em] text-gold uppercase mb-3">Full Transcript</p>
            <p className="text-[13px] text-muted leading-relaxed font-mono whitespace-pre-wrap">
              {lesson.transcript}
            </p>
          </div>
        )}

        {open === "aiNotes" && lesson.aiNotes && (
          <div className="bg-bg-2 border border-gold rounded-sm px-4 py-4">
            <div className="flex items-center gap-2 mb-4">
              <NoteIcon size={12} />
              <p className="font-mono text-[10px] tracking-[0.18em] text-gold uppercase">AI Notes</p>
            </div>
            <MarkdownRenderer content={lesson.aiNotes} />
          </div>
        )}
      </div>
    </div>
  );
}
