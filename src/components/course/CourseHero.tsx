import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { CourseWithModules } from "@/lib/types";

const ArrowLeftIcon  = dynamic(() => import("@/assets/icons/ArrowLeftIcon"),  { loading: () => null });
const ModuleDocIcon  = dynamic(() => import("@/assets/icons/ModuleDocIcon"),  { loading: () => null });
const PlayIcon       = dynamic(() => import("@/assets/icons/PlayIcon"),       { loading: () => null });

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
          <ArrowLeftIcon />
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
            <ModuleDocIcon size={10} />
            {course.modules.length} Modules
          </span>
          <span className="inline-flex items-center gap-1.5 border border-gold rounded-sm px-3 py-1 font-mono text-[10px] tracking-widest text-gold uppercase">
            <PlayIcon size={10} />
            {totalLessons} Lessons
          </span>
        </div>

        {firstLesson && (
          <Link
            href={`/courses/${courseId}/lessons/${firstLesson.id}`}
            className="inline-flex items-center gap-3 bg-gold text-bg font-semibold text-[13px] px-6 py-3 rounded-sm hover:bg-gold-bright transition-colors shadow-gold-glow group anim-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            <PlayIcon size={14} fill="currentColor" className="group-hover:translate-x-0.5 transition-transform" />
            Start Course
          </Link>
        )}
      </div>
    </div>
  );
}
