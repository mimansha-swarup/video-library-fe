import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { progressService } from '../services';
import { UpdateProgressDto } from '../types';
import { AppError } from '../middleware/errorHandler';

export class ProgressController {
  /**
   * Update progress for a lesson
   * POST /progress
   */
  async updateProgress(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.uid;
      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      const data: UpdateProgressDto = req.body;
      const progress = await progressService.updateProgress(userId, data);

      res.json({
        success: true,
        data: progress,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all progress for the current user
   * GET /progress
   */
  async getUserProgress(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.uid;
      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      const progress = await progressService.getUserProgress(userId);

      res.json({
        success: true,
        data: progress,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get progress for a specific lesson
   * GET /progress/lesson/:lessonId
   */
  async getLessonProgress(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.user?.uid;
      if (!userId) {
        throw new AppError('User not authenticated', 401);
      }

      const lessonId = req.params.lessonId as string;
      const progress = await progressService.getOrCreateProgress(userId, lessonId);

      res.json({
        success: true,
        data: progress,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const progressController = new ProgressController();
