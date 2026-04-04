import Link from "next/link";
import dynamic from "next/dynamic";
import type { Lesson } from "@/lib/types";

const ArrowLeftIcon   = dynamic(() => import("@/assets/icons/ArrowLeftIcon"),   { loading: () => null });
const ArrowRightIcon  = dynamic(() => import("@/assets/icons/ArrowRightIcon"),  { loading: () => null });
const CheckCircleIcon = dynamic(() => import("@/assets/icons/CheckCircleIcon"), { loading: () => null });

interface Props {
  courseId: string;
  allLessons: Lesson[];
  lessonId: string;
  prevLesson: Lesson | null;
  nextLesson: Lesson | null;
}

export default function LessonNavBar({ courseId, allLessons, lessonId, prevLesson, nextLesson }: Props) {
  return (
    <div className="px-6 lg:px-10 py-5 flex items-center justify-between gap-4 border-b border-gold">
      {prevLesson ? (
        <Link href={`/courses/${courseId}/lessons/${prevLesson.id}`} className="group flex items-center gap-3 text-[12px] text-muted hover:text-cream-DEFAULT transition-colors">
          <div className="w-8 h-8 rounded-sm border border-gold flex items-center justify-center group-hover:bg-bg-3 transition-colors shrink-0">
            <ArrowLeftIcon />
          </div>
          <div className="text-left hidden sm:block">
            <p className="font-mono text-[9px] tracking-widest text-muted-2 uppercase">Previous</p>
            <p className="line-clamp-1 text-[12px] group-hover:text-gold transition-colors">{prevLesson.title}</p>
          </div>
        </Link>
      ) : <span />}

      <div className="hidden md:flex items-center gap-1">
        {allLessons.map((l) => (
          <Link
            key={l.id}
            href={`/courses/${courseId}/lessons/${l.id}`}
            title={l.title}
            className={`transition-all duration-200 rounded-full ${l.id === lessonId ? "w-5 h-1.5 bg-gold" : "w-1.5 h-1.5 bg-muted-2 hover:bg-gold-dim"}`}
          />
        ))}
      </div>

      {nextLesson ? (
        <Link href={`/courses/${courseId}/lessons/${nextLesson.id}`} className="group flex items-center gap-3 text-[12px] text-muted hover:text-cream-DEFAULT transition-colors">
          <div className="text-right hidden sm:block">
            <p className="font-mono text-[9px] tracking-widest text-muted-2 uppercase">Next</p>
            <p className="line-clamp-1 text-[12px] group-hover:text-gold transition-colors">{nextLesson.title}</p>
          </div>
          <div className="w-8 h-8 rounded-sm border border-gold flex items-center justify-center group-hover:bg-bg-3 transition-colors shrink-0">
            <ArrowRightIcon />
          </div>
        </Link>
      ) : (
        <div className="flex items-center gap-2 text-[12px] text-gold">
          <CheckCircleIcon size={14} />
          <span className="font-mono text-[10px] tracking-widest uppercase">Course complete</span>
        </div>
      )}
    </div>
  );
}
