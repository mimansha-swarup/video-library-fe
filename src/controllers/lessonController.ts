import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { lessonService } from '../services';
import { CreateLessonDto } from '../types';

export class LessonController {
  async createLesson(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: CreateLessonDto = req.body;
      const lesson = await lessonService.createLesson(data);

      res.status(201).json({
        success: true,
        data: lesson,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLessonsByModule(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const moduleId = req.params.moduleId as string;
      const lessons = await lessonService.getLessonsByModule(moduleId);

      res.json({
        success: true,
        data: lessons,
      });
    } catch (error) {
      next(error);
    }
  }

  async getLessonById(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id as string;
      const lesson = await lessonService.getLessonById(id);

      res.json({
        success: true,
        data: lesson,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateLesson(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id as string;
      const data: Partial<CreateLessonDto> = req.body;
      const lesson = await lessonService.updateLesson(id, data);

      res.json({
        success: true,
        data: lesson,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteLesson(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id as string;
      await lessonService.deleteLesson(id);

      res.json({
        success: true,
        message: 'Lesson deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const lessonController = new LessonController();
