import { collections } from '../config/firebase';
import { Course, CreateCourseDto, Module, Lesson } from '../types';
import { AppError } from '../middleware/errorHandler';

export class CourseService {
  /**
   * Create a new course
   */
  async createCourse(data: CreateCourseDto): Promise<Course> {
    const now = new Date();
    const docRef = await collections.courses.add({
      ...data,
      thumbnail: data.thumbnail || '',
      createdAt: now,
      updatedAt: now,
    });

    return {
      id: docRef.id,
      ...data,
      thumbnail: data.thumbnail || '',
      createdAt: now,
      updatedAt: now,
    };
  }

  /**
   * Get all courses
   */
  async getAllCourses(): Promise<Course[]> {
    const snapshot = await collections.courses.orderBy('createdAt', 'desc').get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as Course[];
  }

  /**
   * Get a course by ID
   */
  async getCourseById(id: string): Promise<Course> {
    const doc = await collections.courses.doc(id).get();

    if (!doc.exists) {
      throw new AppError('Course not found', 404);
    }

    const data = doc.data()!;
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as Course;
  }

  /**
   * Get a course with all its modules and lessons
   */
  async getCourseWithContent(courseId: string): Promise<{
    course: Course;
    modules: (Module & { lessons: Lesson[] })[];
  }> {
    const course = await this.getCourseById(courseId);

    const modulesSnapshot = await collections.modules
      .where('courseId', '==', courseId)
      .orderBy('order')
      .get();

    const modules = await Promise.all(
      modulesSnapshot.docs.map(async (moduleDoc) => {
        const moduleData = moduleDoc.data();
        const lessonsSnapshot = await collections.lessons
          .where('moduleId', '==', moduleDoc.id)
          .orderBy('order')
          .get();

        const lessons = lessonsSnapshot.docs.map((lessonDoc) => {
          const lessonData = lessonDoc.data();
          return {
            id: lessonDoc.id,
            ...lessonData,
            createdAt: lessonData.createdAt.toDate(),
            updatedAt: lessonData.updatedAt.toDate(),
          } as Lesson;
        });

        return {
          id: moduleDoc.id,
          ...moduleData,
          createdAt: moduleData.createdAt.toDate(),
          updatedAt: moduleData.updatedAt.toDate(),
          lessons,
        } as Module & { lessons: Lesson[] };
      })
    );

    return { course, modules };
  }

  /**
   * Update a course
   */
  async updateCourse(id: string, data: Partial<CreateCourseDto>): Promise<Course> {
    const docRef = collections.courses.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new AppError('Course not found', 404);
    }

    await docRef.update({
      ...data,
      updatedAt: new Date(),
    });

    return this.getCourseById(id);
  }

  /**
   * Delete a course
   */
  async deleteCourse(id: string): Promise<void> {
    const doc = await collections.courses.doc(id).get();

    if (!doc.exists) {
      throw new AppError('Course not found', 404);
    }

    await collections.courses.doc(id).delete();
  }
}

export const courseService = new CourseService();
