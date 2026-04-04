import Link from "next/link";
import type { CourseWithModules, Lesson, ModuleWithLessons } from "@/lib/types";
import { padIndex } from "@/lib/utils";

interface Props {
  courseId: string;
  course: CourseWithModules;
  lesson: Lesson;
  parentModule: ModuleWithLessons | undefined;
  idx: number;
  total: number;
}

export default function LessonInfoBar({ courseId, course, lesson, parentModule, idx, total }: Props) {
  return (
    <div className="border-b border-gold bg-bg-2">
      <div className="px-6 lg:px-10 py-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Link href={`/courses/${courseId}`} className="font-mono text-[10px] tracking-widest text-muted uppercase hover:text-gold transition-colors">
              {course.title}
            </Link>
            {parentModule && (
              <>
                <span className="text-muted-2 text-[10px]">/</span>
                <span className="font-mono text-[10px] tracking-widest text-muted uppercase">{parentModule.title}</span>
              </>
            )}
          </div>
          <h1 className="font-display text-[clamp(1.2rem,3vw,1.8rem)] text-cream-DEFAULT leading-tight">
            {lesson.title}
          </h1>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-mono text-[10px] text-muted uppercase tracking-widest">Lesson</p>
          <p className="font-display text-[24px] text-gold leading-none mt-0.5">
            {padIndex(idx + 1)}
            <span className="text-muted-2 text-[16px]">/{padIndex(total)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
