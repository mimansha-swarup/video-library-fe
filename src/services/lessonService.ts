import { collections } from '../config/firebase';
import { Lesson, CreateLessonDto } from '../types';
import { AppError } from '../middleware/errorHandler';

export class LessonService {
  /**
   * Create a new lesson
   */
  async createLesson(data: CreateLessonDto): Promise<Lesson> {
    const now = new Date();
    const docRef = await collections.lessons.add({
      ...data,
      createdAt: now,
      updatedAt: now,
    });

    return {
      id: docRef.id,
      ...data,
      createdAt: now,
      updatedAt: now,
    };
  }

  /**
   * Get all lessons for a module
   */
  async getLessonsByModule(moduleId: string): Promise<Lesson[]> {
    const snapshot = await collections.lessons
      .where('moduleId', '==', moduleId)
      .orderBy('order')
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as Lesson[];
  }

  /**
   * Get a lesson by ID
   */
  async getLessonById(id: string): Promise<Lesson> {
    const doc = await collections.lessons.doc(id).get();

    if (!doc.exists) {
      throw new AppError('Lesson not found', 404);
    }

    const data = doc.data()!;
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as Lesson;
  }

  /**
   * Update a lesson
   */
  async updateLesson(id: string, data: Partial<CreateLessonDto>): Promise<Lesson> {
    const docRef = collections.lessons.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new AppError('Lesson not found', 404);
    }

    await docRef.update({
      ...data,
      updatedAt: new Date(),
    });

    return this.getLessonById(id);
  }

  /**
   * Delete a lesson
   */
  async deleteLesson(id: string): Promise<void> {
    const doc = await collections.lessons.doc(id).get();

    if (!doc.exists) {
      throw new AppError('Lesson not found', 404);
    }

    await collections.lessons.doc(id).delete();
  }
}

export const lessonService = new LessonService();
