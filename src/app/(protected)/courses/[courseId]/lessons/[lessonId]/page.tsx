"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { getCourse, getLesson, getProgress, getStreamUrl, QUERY_KEYS } from "@/lib/api";
import type { ModuleWithLessons, UserProgress } from "@/lib/types";
import Navbar from "@/components/layout/Navbar";
import ModuleSidebar from "@/components/course/ModuleSidebar";
import VideoArea from "@/components/lesson/VideoArea";
import LessonInfoBar from "@/components/lesson/LessonInfoBar";
import LessonNavBar from "@/components/lesson/LessonNavBar";
import { LessonSkeleton, LessonError } from "@/components/ui/LessonShells";

export default function LessonPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const { user, loading: authLoading } = useAuth();

  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: QUERY_KEYS.course(courseId),
    queryFn: () => getCourse(courseId),
    enabled: !!user,
  });

  const { data: lesson, isLoading: lessonLoading } = useQuery({
    queryKey: QUERY_KEYS.lesson(lessonId),
    queryFn: () => getLesson(lessonId),
    enabled: !!user,
  });

  const { data: streamUrl = "" } = useQuery({
    queryKey: QUERY_KEYS.stream(lessonId),
    queryFn: () => getStreamUrl(lesson!.videoKey),
    enabled: !!user && !!lesson,
    staleTime: 1000 * 60 * 50,
    retry: false,
  });

  const { data: allProgress = [] } = useQuery({
    queryKey: QUERY_KEYS.progress,
    queryFn: getProgress,
    enabled: !!user,
  });

  const isLoading = authLoading || courseLoading || lessonLoading;

  if (isLoading)          return <LessonSkeleton />;
  if (!course || !lesson) return <LessonError courseId={courseId} />;

  const allLessons   = course.modules.flatMap((m) => m.lessons);
  const idx          = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson   = idx > 0 ? allLessons[idx - 1] : null;
  const nextLesson   = idx < allLessons.length - 1 ? allLessons[idx + 1] : null;
  const parentModule = course.modules.find((m: ModuleWithLessons) =>
    m.lessons.some((l) => l.id === lessonId)
  );

  const progressByLessonId = Object.fromEntries(
    allProgress.map((p: UserProgress) => [p.lessonId, p])
  );
  const lastWatchedSecond = progressByLessonId[lessonId]?.lastWatchedSecond ?? 0;

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <VideoArea streamUrl={streamUrl} lessonId={lessonId} lastWatchedSecond={lastWatchedSecond} />
          <LessonInfoBar courseId={courseId} course={course} lesson={lesson} parentModule={parentModule} idx={idx} total={allLessons.length} />
          <LessonNavBar courseId={courseId} allLessons={allLessons} lessonId={lessonId} prevLesson={prevLesson} nextLesson={nextLesson} />
        </div>
        <div className="hidden lg:flex w-[300px] xl:w-[340px] border-l border-gold shrink-0 overflow-y-auto">
          <ModuleSidebar courseId={courseId} modules={course.modules} activeLessonId={lessonId} progress={progressByLessonId} />
        </div>
      </div>
    </div>
  );
}
