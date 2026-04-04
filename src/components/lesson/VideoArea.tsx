import dynamic from "next/dynamic";
import VideoPlayer from "@/components/video/VideoPlayer";

const PlayCircleIcon = dynamic(() => import("@/assets/icons/PlayCircleIcon"), { loading: () => null });

interface Props {
  streamUrl: string;
  lessonId: string;
  lastWatchedSecond?: number;
}

export default function VideoArea({ streamUrl, lessonId, lastWatchedSecond }: Props) {
  return (
    <div className="bg-black border-b border-gold">
      {streamUrl ? (
        <VideoPlayer streamUrl={streamUrl} lessonId={lessonId} lastWatchedSecond={lastWatchedSecond} />
      ) : (
        <div className="aspect-video flex flex-col items-center justify-center bg-bg-2 gap-4">
          <PlayCircleIcon size={48} className="opacity-20" />
          <p className="font-mono text-[11px] tracking-widest text-muted uppercase">Stream unavailable</p>
          <p className="text-[12px] text-muted-2">Check API connection and video key</p>
        </div>
      )}
    </div>
  );
}
