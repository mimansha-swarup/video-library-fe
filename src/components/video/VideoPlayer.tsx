"use client";

import { useEffect, useRef, useCallback } from "react";
import { updateProgress } from "@/lib/api";

interface Props {
  streamUrl: string;
  lessonId: string;
  lastWatchedSecond?: number;
}

export default function VideoPlayer({ streamUrl, lessonId, lastWatchedSecond = 0 }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Resume playback position */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onMeta = () => {
      if (lastWatchedSecond > 0) vid.currentTime = lastWatchedSecond;
    };
    vid.addEventListener("loadedmetadata", onMeta);
    return () => vid.removeEventListener("loadedmetadata", onMeta);
  }, [lastWatchedSecond, streamUrl]);

  const save = useCallback(
    (completed = false) => {
      const vid = videoRef.current;
      if (!vid) return;
      updateProgress(lessonId, Math.floor(vid.currentTime), completed).catch(() => {});
    },
    [lessonId]
  );

  /* Auto-save every 15 s while playing */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const onPlay   = () => { timerRef.current = setInterval(() => save(), 15_000); };
    const onPause  = () => { if (timerRef.current) clearInterval(timerRef.current); save(); };
    const onEnded  = () => { if (timerRef.current) clearInterval(timerRef.current); save(true); };

    vid.addEventListener("play",  onPlay);
    vid.addEventListener("pause", onPause);
    vid.addEventListener("ended", onEnded);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      vid.removeEventListener("play",  onPlay);
      vid.removeEventListener("pause", onPause);
      vid.removeEventListener("ended", onEnded);
    };
  }, [save]);

  return (
    <div className="relative w-full bg-black group/player">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-40 z-10" />

      <video
        ref={videoRef}
        src={streamUrl}
        controls
        playsInline
        className="w-full aspect-video block"
        style={{ maxHeight: "70vh" }}
      />

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-30 z-10" />
    </div>
  );
}
