import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { Course, CourseProgressSummary } from "@/lib/types";

const PlayCircleIcon = dynamic(() => import("@/assets/icons/PlayCircleIcon"), { loading: () => null });
const PlayIcon       = dynamic(() => import("@/assets/icons/PlayIcon"),       { loading: () => null });
const ArrowRightIcon = dynamic(() => import("@/assets/icons/ArrowRightIcon"), { loading: () => null });

interface Props {
  course: Course;
  index?: number;
  progress?: CourseProgressSummary;
}

export default function CourseCard({ course, index = 0, progress }: Props) {
  const hasProgress = !!(progress && (progress.completedLessons > 0 || progress.lastWatchedSecond > 0));
  const progressPct = progress && progress.totalLessons > 0
    ? Math.round((progress.completedLessons / progress.totalLessons) * 100)
    : 0;

  const href = hasProgress && progress?.lastWatchedLessonId
    ? `/courses/${course.id}/lessons/${progress.lastWatchedLessonId}`
    : `/courses/${course.id}`;

  return (
    <Link
      href={href}
      className="course-card group relative flex flex-col bg-bg-2 border border-gold rounded-sm overflow-hidden anim-fade-up shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="card-shine pointer-events-none" />

      <div className="relative aspect-video bg-bg-3 overflow-hidden">
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(212,168,75,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,75,0.3) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <PlayCircleIcon size={40} className="opacity-40" />
          </div>
        )}

        <div className="absolute inset-0 bg-card-gradient opacity-80" />

        <div className="card-play absolute inset-0 flex items-center justify-center">
          <div className="w-11 h-11 rounded-full border border-gold-hi bg-bg/70 backdrop-blur-sm flex items-center justify-center shadow-gold-sm">
            <PlayIcon size={14} />
          </div>
        </div>

        <div className="absolute top-0 right-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-gold-dim opacity-60" />

        {/* Progress bar */}
        {hasProgress && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-bg-3/80">
            <div
              className="h-full bg-gold transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 gap-2.5">
        <h3
          className="font-display text-[15px] text-cream-DEFAULT leading-snug group-hover:text-gold transition-colors duration-200 line-clamp-2"
          style={{ letterSpacing: "0.01em" }}
        >
          {course.title}
        </h3>

        {course.description && (
          <p className="text-[12px] text-muted leading-relaxed line-clamp-2 flex-1">
            {course.description}
          </p>
        )}

        <div className="flex items-center gap-2 pt-2 mt-auto border-t border-gold">
          <span className={`font-mono text-[10px] tracking-widest uppercase ${hasProgress ? "text-gold" : "text-gold-dim"}`}>
            {hasProgress ? "Resume" : "Watch"}
          </span>
          {hasProgress && progress && (
            <span className="font-mono text-[10px] text-muted-2 ml-1">
              {progress.completedLessons}/{progress.totalLessons}
            </span>
          )}
          <ArrowRightIcon className={`ml-auto ${hasProgress ? "text-gold" : "text-gold-dim"}`} />
        </div>
      </div>
    </Link>
  );
}
