import VideoPlayer from "@/components/video/VideoPlayer";

interface Props {
  streamUrl: string;
  lessonId: string;
}

export default function VideoArea({ streamUrl, lessonId }: Props) {
  return (
    <div className="bg-black border-b border-gold">
      {streamUrl ? (
        <VideoPlayer streamUrl={streamUrl} lessonId={lessonId} />
      ) : (
        <div className="aspect-video flex flex-col items-center justify-center bg-bg-2 gap-4">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="opacity-20">
            <circle cx="24" cy="24" r="23" stroke="#D4A84B" strokeWidth="1.2"/>
            <path d="M18 16L32 24L18 32V16Z" fill="#D4A84B"/>
          </svg>
          <p className="font-mono text-[11px] tracking-widest text-muted uppercase">Stream unavailable</p>
          <p className="text-[12px] text-muted-2">Check API connection and video key</p>
        </div>
      )}
    </div>
  );
}
