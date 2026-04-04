import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export function LessonSkeleton() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Navbar />
      <div className="aspect-video bg-bg-2 skeleton" />
      <div className="px-6 lg:px-10 py-5 border-b border-gold bg-bg-2">
        <div className="h-3 w-48 skeleton rounded-sm mb-3" />
        <div className="h-7 w-2/3 skeleton rounded-sm" />
      </div>
    </div>
  );
}

export function LessonError({ courseId }: { courseId: string }) {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center flex-col gap-4">
        <p className="font-display text-[20px] text-muted">Lesson not found</p>
        <Link href={`/courses/${courseId}`} className="font-mono text-[11px] tracking-widest text-gold uppercase hover:underline">
          ← Back to Course
        </Link>
      </div>
    </div>
  );
}
