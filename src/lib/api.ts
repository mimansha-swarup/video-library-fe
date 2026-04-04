import type { Course, CourseWithModules, CourseProgressSummary, Lesson, LessonNote, ModuleWithLessons, StreamResponse, UserProgress } from "./types";

export const QUERY_KEYS = {
  courses: ["courses"] as const,
  course: (id: string) => ["course", id] as const,
  lesson: (id: string) => ["lesson", id] as const,
  stream: (id: string) => ["stream", id] as const,
  progress: ["progress"] as const,
  progressSummary: ["progressSummary"] as const,
  note: (lessonId: string) => ["note", lessonId] as const,
} as const;

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "https://video-library-be.onrender.com") + "/api";

/** Get the current user's Firebase ID token (browser only). */
async function getIdToken(): Promise<string | null> {
  try {
    const [{ getFirebaseAuth }, { getIdToken: firebaseGetIdToken }] = await Promise.all([
      import("@/lib/firebase"),
      import("firebase/auth"),
    ]);
    const user = getFirebaseAuth().currentUser;
    if (!user) return null;
    return firebaseGetIdToken(user);
  } catch {
    return null;
  }
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = await getIdToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`);
  }

  const json = await res.json() as ApiResponse<T>;

  // All backend responses are wrapped in { success, data }
  return json.data;
}

export async function getCourses(): Promise<Course[]> {
  return apiFetch<Course[]>("/courses");
}

export async function getCourse(courseId: string): Promise<CourseWithModules> {
  // /courses/:id/content returns { course: Course, modules: ModuleWithLessons[] }
  const { course, modules } = await apiFetch<{
    course: Course;
    modules: ModuleWithLessons[];
  }>(`/courses/${courseId}/content`);
  return { ...course, modules };
}

export async function getLesson(lessonId: string): Promise<Lesson> {
  return apiFetch<Lesson>(`/lessons/${lessonId}`);
}

export async function getStreamUrl(videoKey: string): Promise<string> {
  const data = await apiFetch<StreamResponse>(
    `/video/stream?videoKey=${encodeURIComponent(videoKey)}`
  );
  return data.streamUrl;
}

export async function getProgress(): Promise<UserProgress[]> {
  return apiFetch<UserProgress[]>("/progress");
}

export async function getProgressSummary(): Promise<CourseProgressSummary[]> {
  return apiFetch<CourseProgressSummary[]>("/progress/summary");
}

export async function getNote(lessonId: string): Promise<LessonNote | null> {
  return apiFetch<LessonNote | null>(`/notes/${lessonId}`);
}

export async function saveNote(lessonId: string, content: string): Promise<LessonNote> {
  return apiFetch<LessonNote>(`/notes/${lessonId}`, {
    method: "PUT",
    body: JSON.stringify({ content }),
  });
}

export async function updateProgress(
  lessonId: string,
  lastWatchedSecond: number,
  completed: boolean
): Promise<UserProgress> {
  return apiFetch<UserProgress>(`/progress/${lessonId}`, {
    method: "PATCH",
    body: JSON.stringify({ lastWatchedSecond, completed }),
  });
}
