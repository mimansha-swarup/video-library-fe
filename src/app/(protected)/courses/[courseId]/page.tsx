"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { getCourse, QUERY_KEYS } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import CourseHero from "@/components/course/CourseHero";
import MobileModuleList from "@/components/course/MobileModuleList";
import ModuleSidebar from "@/components/course/ModuleSidebar";
import { CourseSkeleton, CourseError } from "@/components/ui/CourseShells";

export default function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { user, loading: authLoading } = useAuth();

  const { data: course, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.course(courseId),
    queryFn: () => getCourse(courseId),
    enabled: !!user,
  });

  if (authLoading || isLoading) return <CourseSkeleton />;
  if (isError || !course)       return <CourseError />;

  const totalLessons = course.modules.reduce((s, m) => s + m.lessons.length, 0);

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <CourseHero course={course} courseId={courseId} totalLessons={totalLessons} />
          <MobileModuleList courseId={courseId} modules={course.modules} />
        </div>
        <div className="hidden lg:flex w-[300px] xl:w-[340px] border-l border-gold shrink-0 overflow-y-auto">
          <ModuleSidebar courseId={courseId} modules={course.modules} />
        </div>
      </div>
    </div>
  );
}
