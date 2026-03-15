import { collections } from '../config/firebase';
import { UserProgress, UpdateProgressDto } from '../types';

export class ProgressService {
  /**
   * Get or create user progress for a lesson
   */
  async getOrCreateProgress(userId: string, lessonId: string): Promise<UserProgress> {
    const snapshot = await collections.userProgress
      .where('userId', '==', userId)
      .where('lessonId', '==', lessonId)
      .limit(1)
      .get();

    if (!snapshot.empty) {
      const doc = snapshot.docs[0]!;
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        updatedAt: data.updatedAt.toDate(),
      } as UserProgress;
    }

    const now = new Date();
    const docRef = await collections.userProgress.add({
      userId,
      lessonId,
      lastWatchedSecond: 0,
      completed: false,
      updatedAt: now,
    });

    return {
      id: docRef.id,
      userId,
      lessonId,
      lastWatchedSecond: 0,
      completed: false,
      updatedAt: now,
    };
  }

  /**
   * Update user progress for a lesson
   */
  async updateProgress(userId: string, data: UpdateProgressDto): Promise<UserProgress> {
    const snapshot = await collections.userProgress
      .where('userId', '==', userId)
      .where('lessonId', '==', data.lessonId)
      .limit(1)
      .get();

    const now = new Date();

    if (snapshot.empty) {
      const docRef = await collections.userProgress.add({
        userId,
        lessonId: data.lessonId,
        lastWatchedSecond: data.lastWatchedSecond,
        completed: data.completed || false,
        updatedAt: now,
      });

      return {
        id: docRef.id,
        userId,
        lessonId: data.lessonId,
        lastWatchedSecond: data.lastWatchedSecond,
        completed: data.completed || false,
        updatedAt: now,
      };
    }

    const doc = snapshot.docs[0]!;
    await collections.userProgress.doc(doc.id).update({
      lastWatchedSecond: data.lastWatchedSecond,
      completed: data.completed ?? doc.data().completed,
      updatedAt: now,
    });

    return {
      id: doc.id,
      userId,
      lessonId: data.lessonId,
      lastWatchedSecond: data.lastWatchedSecond,
      completed: data.completed ?? doc.data().completed,
      updatedAt: now,
    };
  }

  /**
   * Get all progress for a user
   */
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    const snapshot = await collections.userProgress
      .where('userId', '==', userId)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as UserProgress[];
  }

  /**
   * Get user progress for a specific course
   */
  async getCourseProgress(userId: string, lessonIds: string[]): Promise<UserProgress[]> {
    if (lessonIds.length === 0) return [];

    const snapshot = await collections.userProgress
      .where('userId', '==', userId)
      .where('lessonId', 'in', lessonIds)
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as UserProgress[];
  }
}

export const progressService = new ProgressService();
