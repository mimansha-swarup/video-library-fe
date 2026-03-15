import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { moduleService } from '../services';
import { CreateModuleDto } from '../types';

export class ModuleController {
  async createModule(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: CreateModuleDto = req.body;
      const module = await moduleService.createModule(data);

      res.status(201).json({
        success: true,
        data: module,
      });
    } catch (error) {
      next(error);
    }
  }

  async getModulesByCourse(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const courseId = req.params.courseId as string;
      const modules = await moduleService.getModulesByCourse(courseId);

      res.json({
        success: true,
        data: modules,
      });
    } catch (error) {
      next(error);
    }
  }

  async getModuleById(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id as string;
      const module = await moduleService.getModuleById(id);

      res.json({
        success: true,
        data: module,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateModule(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id as string;
      const data: Partial<CreateModuleDto> = req.body;
      const module = await moduleService.updateModule(id, data);

      res.json({
        success: true,
        data: module,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteModule(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id as string;
      await moduleService.deleteModule(id);

      res.json({
        success: true,
        message: 'Module deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const moduleController = new ModuleController();
