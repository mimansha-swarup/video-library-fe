import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { Course } from "@/lib/types";

const PlayCircleIcon = dynamic(() => import("@/assets/icons/PlayCircleIcon"), { loading: () => null });
const PlayIcon       = dynamic(() => import("@/assets/icons/PlayIcon"),       { loading: () => null });
const ArrowRightIcon = dynamic(() => import("@/assets/icons/ArrowRightIcon"), { loading: () => null });

interface Props {
  course: Course;
  index?: number;
}

export default function CourseCard({ course, index = 0 }: Props) {
  return (
    <Link
      href={`/courses/${course.id}`}
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
          <span className="font-mono text-[10px] tracking-widest text-gold-dim uppercase">
            Watch
          </span>
          <ArrowRightIcon className="text-gold-dim" />
        </div>
      </div>
    </Link>
  );
}
