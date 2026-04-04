import Link from "next/link";
import type { Lesson } from "@/lib/types";

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
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M12 4H2M5 1L2 4L5 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
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
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M0 4H10M7 1L10 4L7 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Link>
      ) : (
        <div className="flex items-center gap-2 text-[12px] text-gold">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#D4A84B" strokeWidth="1"/>
            <path d="M4.5 7L6.5 9L9.5 5" stroke="#D4A84B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-mono text-[10px] tracking-widest uppercase">Course complete</span>
        </div>
      )}
    </div>
  );
}
