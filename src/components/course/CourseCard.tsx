import Link from "next/link";
import Image from "next/image";
import type { Course } from "@/lib/types";

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
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-40">
              <circle cx="20" cy="20" r="19" stroke="#D4A84B" strokeWidth="1"/>
              <path d="M15 12L30 20L15 28V12Z" fill="#D4A84B" opacity="0.8"/>
            </svg>
          </div>
        )}

        <div className="absolute inset-0 bg-card-gradient opacity-80" />

        <div className="card-play absolute inset-0 flex items-center justify-center">
          <div className="w-11 h-11 rounded-full border border-gold-hi bg-bg/70 backdrop-blur-sm flex items-center justify-center shadow-gold-sm">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M4 2.5L11.5 7L4 11.5V2.5Z" fill="#D4A84B"/>
            </svg>
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
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-gold-dim">
            <path d="M0 4H10M7 1L10 4L7 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}
