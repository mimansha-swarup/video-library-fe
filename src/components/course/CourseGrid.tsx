import dynamic from "next/dynamic";
import CourseCard from "@/components/course/CourseCard";
import type { Course, CourseProgressSummary } from "@/lib/types";

const PlayCircleIcon = dynamic(() => import("@/assets/icons/PlayCircleIcon"), { loading: () => null });

interface Props {
  courses: Course[];
  isLoading: boolean;
  isError: boolean;
  progressSummaries?: CourseProgressSummary[];
}

export default function CourseGrid({ courses, isLoading, isError, progressSummaries = [] }: Props) {
  if (isError) {
    return (
      <div className="flex items-start gap-3 rounded-sm border border-gold bg-bg-2 px-5 py-4 mb-8 anim-fade-in">
        <span className="font-mono text-[10px] tracking-widest text-gold uppercase shrink-0 mt-0.5">Error</span>
        <p className="text-[13px] text-muted leading-relaxed">Could not load courses. Check your API connection.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-sm border border-gold overflow-hidden">
            <div className="aspect-video skeleton" />
            <div className="p-4 space-y-2.5">
              <div className="h-4 w-3/4 skeleton rounded-sm" />
              <div className="h-3 w-full skeleton rounded-sm" />
              <div className="h-3 w-2/3 skeleton rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <PlayCircleIcon size={48} className="opacity-20 mb-5" />
        <p className="font-display text-[20px] text-muted">No courses found</p>
        <p className="text-[12px] text-muted-2 mt-2 font-mono">Add courses through the backend API</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          All Courses — {courses.length}
        </p>
        <div className="flex-1 ml-6 h-px bg-gradient-to-r from-gold to-transparent opacity-20" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 stagger">
        {courses.map((course, i) => (
          <CourseCard
            key={course.id}
            course={course}
            index={i}
            progress={progressSummaries.find((p) => p.courseId === course.id)}
          />
        ))}
      </div>
    </>
  );
}
