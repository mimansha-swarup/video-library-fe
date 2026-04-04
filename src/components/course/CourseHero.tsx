import Link from "next/link";
import Image from "next/image";
import type { CourseWithModules } from "@/lib/types";

interface Props {
  course: CourseWithModules;
  courseId: string;
  totalLessons: number;
}

export default function CourseHero({ course, courseId, totalLessons }: Props) {
  const firstLesson = course.modules[0]?.lessons[0];

  return (
    <div className="relative border-b border-gold overflow-hidden">
      {course.thumbnail && (
        <div className="absolute inset-0">
          <Image src={course.thumbnail} alt="" fill className="object-cover opacity-10 blur-xl scale-110" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-bg/60 to-bg" />
      <div className="absolute inset-0 bg-hero-lines opacity-40 pointer-events-none" />

      <div className="relative max-w-3xl px-8 lg:px-14 py-12">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted uppercase hover:text-gold transition-colors mb-8">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M12 4H2M5 1L2 4L5 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Library
        </Link>

        <p className="font-mono text-[10px] tracking-[0.2em] text-gold uppercase mb-3 anim-fade-in">Course</p>
        <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] text-cream-DEFAULT leading-tight mb-4 anim-fade-up">
          {course.title}
        </h1>

        {course.description && (
          <p className="text-[13px] text-muted leading-relaxed max-w-xl mb-7 anim-fade-up" style={{ animationDelay: "80ms" }}>
            {course.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-8 anim-fade-up" style={{ animationDelay: "120ms" }}>
          <span className="inline-flex items-center gap-1.5 border border-gold rounded-sm px-3 py-1 font-mono text-[10px] tracking-widest text-gold uppercase">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <rect x="1" y="1" width="8" height="8" rx="1" stroke="#D4A84B" strokeWidth="1"/>
              <path d="M3 4H7M3 6H5" stroke="#D4A84B" strokeWidth="0.8" strokeLinecap="round"/>
            </svg>
            {course.modules.length} Modules
          </span>
          <span className="inline-flex items-center gap-1.5 border border-gold rounded-sm px-3 py-1 font-mono text-[10px] tracking-widest text-gold uppercase">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 2L8 5L2 8V2Z" fill="#D4A84B"/>
            </svg>
            {totalLessons} Lessons
          </span>
        </div>

        {firstLesson && (
          <Link
            href={`/courses/${courseId}/lessons/${firstLesson.id}`}
            className="inline-flex items-center gap-3 bg-gold text-bg font-semibold text-[13px] px-6 py-3 rounded-sm hover:bg-gold-bright transition-colors shadow-gold-glow group anim-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M3 2L11 7L3 12V2Z" fill="currentColor"/>
            </svg>
            Start Course
          </Link>
        )}
      </div>
    </div>
  );
}
