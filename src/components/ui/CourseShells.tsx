import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export function CourseSkeleton() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Navbar />
      <div className="px-8 lg:px-14 py-12 max-w-3xl">
        <div className="h-3 w-24 skeleton rounded-sm mb-8" />
        <div className="h-10 w-2/3 skeleton rounded-sm mb-4" />
        <div className="h-4 w-full skeleton rounded-sm mb-2" />
        <div className="h-4 w-3/4 skeleton rounded-sm mb-8" />
        <div className="h-10 w-36 skeleton rounded-sm" />
      </div>
    </div>
  );
}

export function CourseError() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center flex-col gap-4">
        <p className="font-display text-[20px] text-muted">Course not found</p>
        <Link href="/" className="font-mono text-[11px] tracking-widest text-gold uppercase hover:underline">
          ← Back to Library
        </Link>
      </div>
    </div>
  );
}
