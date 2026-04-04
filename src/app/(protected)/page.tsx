"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { getCourses, getProgressSummary, QUERY_KEYS } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import CourseGrid from "@/components/course/CourseGrid";
import LibraryHero from "@/components/course/LibraryHero";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const { user, loading: authLoading } = useAuth();

  const { data: courses = [], isLoading: coursesLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.courses,
    queryFn: getCourses,
    enabled: !!user,
  });

  const { data: progressSummaries = [] } = useQuery({
    queryKey: QUERY_KEYS.progressSummary,
    queryFn: getProgressSummary,
    enabled: !!user,
  });

  const loading = authLoading || coursesLoading;

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <LibraryHero courseCount={!loading && !isError ? courses.length : undefined} />

      <main className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
        <CourseGrid
          courses={courses}
          isLoading={loading}
          isError={isError}
          progressSummaries={progressSummaries}
        />
      </main>

      <Footer />
    </div>
  );
}
