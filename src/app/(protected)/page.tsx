"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { getCourses, QUERY_KEYS } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import CourseGrid from "@/components/course/CourseGrid";

export default function HomePage() {
  const { user, loading: authLoading } = useAuth();

  const { data: courses = [], isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.courses,
    queryFn: getCourses,
    enabled: !!user,
  });

  const loading = authLoading || isLoading;

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      <section className="relative overflow-hidden border-b border-gold">
        <div className="absolute inset-0 bg-hero-lines pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gold pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <p className="gold-rule font-mono text-[11px] tracking-[0.22em] text-gold uppercase mb-5 anim-fade-in">
            Your Library
          </p>
          <h1 className="font-display text-[clamp(2.6rem,6vw,5rem)] text-cream-DEFAULT leading-[1.05] tracking-tight anim-fade-up" style={{ animationDelay: "60ms" }}>
            Every lesson,<br />
            <em className="not-italic text-gold">ready to watch.</em>
          </h1>
          <p className="mt-5 text-[14px] text-muted max-w-md leading-relaxed anim-fade-up" style={{ animationDelay: "140ms" }}>
            Your private course library. Pick up where you left off, or start something new.
          </p>

          {!loading && !isError && courses.length > 0 && (
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-gold anim-fade-up" style={{ animationDelay: "200ms" }}>
              <div>
                <p className="font-display text-[28px] text-gold leading-none">{courses.length}</p>
                <p className="font-mono text-[10px] tracking-widest text-muted uppercase mt-1">Courses</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
        <CourseGrid courses={courses} isLoading={loading} isError={isError} />
      </main>

      <footer className="border-t border-gold mt-16 px-10 py-6 max-w-[1400px] mx-auto flex items-center justify-between">
        <p className="font-mono text-[10px] tracking-widest text-muted-2 uppercase">VideoLib</p>
        <p className="font-mono text-[10px] text-muted-2">Private · Secure · Yours</p>
      </footer>
    </div>
  );
}
