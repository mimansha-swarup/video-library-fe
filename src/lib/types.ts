export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  order: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  videoKey: string;
  duration: number;
  order: number;
}

export interface ModuleWithLessons extends Module {
  lessons: Lesson[];
}

export interface CourseWithModules extends Course {
  modules: ModuleWithLessons[];
}

export interface UserProgress {
  id: string;
  userId: string;
  lessonId: string;
  lastWatchedSecond: number;
  completed: boolean;
}

export interface StreamResponse {
  streamUrl: string;
}

export interface CourseProgressSummary {
  courseId: string;
  completedLessons: number;
  totalLessons: number;
  lastWatchedLessonId: string | null;
  lastWatchedSecond: number;
}
