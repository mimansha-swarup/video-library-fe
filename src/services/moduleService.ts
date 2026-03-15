import { collections } from '../config/firebase';
import { Module, CreateModuleDto } from '../types';
import { AppError } from '../middleware/errorHandler';

export class ModuleService {
  /**
   * Create a new module
   */
  async createModule(data: CreateModuleDto): Promise<Module> {
    const now = new Date();
    const docRef = await collections.modules.add({
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
   * Get all modules for a course
   */
  async getModulesByCourse(courseId: string): Promise<Module[]> {
    const snapshot = await collections.modules
      .where('courseId', '==', courseId)
      .orderBy('order')
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as Module[];
  }

  /**
   * Get a module by ID
   */
  async getModuleById(id: string): Promise<Module> {
    const doc = await collections.modules.doc(id).get();

    if (!doc.exists) {
      throw new AppError('Module not found', 404);
    }

    const data = doc.data()!;
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    } as Module;
  }

  /**
   * Update a module
   */
  async updateModule(id: string, data: Partial<CreateModuleDto>): Promise<Module> {
    const docRef = collections.modules.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new AppError('Module not found', 404);
    }

    await docRef.update({
      ...data,
      updatedAt: new Date(),
    });

    return this.getModuleById(id);
  }

  /**
   * Delete a module
   */
  async deleteModule(id: string): Promise<void> {
    const doc = await collections.modules.doc(id).get();

    if (!doc.exists) {
      throw new AppError('Module not found', 404);
    }

    await collections.modules.doc(id).delete();
  }
}

export const moduleService = new ModuleService();
