"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNote, saveNote, QUERY_KEYS } from "@/lib/api";

const NoteIcon      = dynamic(() => import("@/assets/icons/NoteIcon"),      { loading: () => null });
const ButtonSpinner = dynamic(() => import("@/assets/icons/ButtonSpinner"), { loading: () => null });

interface Props {
  lessonId: string;
}

type SaveState = "idle" | "saving" | "saved" | "error";

export default function LessonNotes({ lessonId }: Props) {
  const queryClient = useQueryClient();
  const [content, setContent]     = useState("");
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const initialised = useRef(false);

  const { data: note, isLoading } = useQuery({
    queryKey: QUERY_KEYS.note(lessonId),
    queryFn: () => getNote(lessonId),
  });

  // Populate textarea once note loads
  useEffect(() => {
    if (!isLoading && !initialised.current) {
      setContent(note?.content ?? "");
      initialised.current = true;
    }
  }, [isLoading, note]);

  // Reset when navigating to a different lesson
  useEffect(() => {
    initialised.current = false;
    setContent("");
    setSaveState("idle");
  }, [lessonId]);

  function handleChange(value: string) {
    setContent(value);
    if (saveState === "saved" || saveState === "error") setSaveState("idle");
  }

  async function handleSave() {
    setSaveState("saving");
    try {
      const saved = await saveNote(lessonId, content);
      queryClient.setQueryData(QUERY_KEYS.note(lessonId), saved);
      setSaveState("saved");
    } catch {
      setSaveState("error");
    }
  }

  const isDirty = content !== (note?.content ?? "");

  return (
    <div className="border-b border-gold bg-bg">
      <div className="px-6 lg:px-10 py-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <NoteIcon size={14} />
          <p className="font-mono text-[10px] tracking-[0.18em] text-gold uppercase">
            Lesson Notes
          </p>
          {saveState === "saved" && (
            <span className="ml-2 font-mono text-[10px] tracking-widest text-muted-2 uppercase">
              Saved
            </span>
          )}
          {saveState === "error" && (
            <span className="ml-2 font-mono text-[10px] tracking-widest text-red-400 uppercase">
              Failed to save
            </span>
          )}
        </div>

        {/* Textarea */}
        {isLoading ? (
          <div className="h-32 skeleton rounded-sm" />
        ) : (
          <>
            <textarea
              value={content}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Write your notes for this lesson…"
              rows={6}
              className="w-full bg-bg-2 border border-gold rounded-sm px-4 py-3 text-[13px] text-cream-DEFAULT placeholder:text-muted-2 leading-relaxed resize-y focus:outline-none focus:border-gold-hi transition-colors font-mono"
            />

            <div className="flex items-center justify-end mt-3">
              <button
                onClick={handleSave}
                disabled={saveState === "saving" || !isDirty}
                className="inline-flex items-center gap-2 bg-bg-2 border border-gold-md hover:border-gold-hi hover:bg-bg-3 rounded-sm px-4 py-2 font-mono text-[10px] tracking-widest text-cream-DEFAULT uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {saveState === "saving" && <ButtonSpinner size={12} />}
                {saveState === "saving" ? "Saving…" : "Save note"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
