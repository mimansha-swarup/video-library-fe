import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { courseService } from '../services';
import { CreateCourseDto } from '../types';

export class CourseController {
  async createCourse(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: CreateCourseDto = req.body;
      const course = await courseService.createCourse(data);

      res.status(201).json({
        success: true,
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllCourses(
    _req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const courses = await courseService.getAllCourses();

      res.json({
        success: true,
        data: courses,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCourseById(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id as string;
      const course = await courseService.getCourseById(id);

      res.json({
        success: true,
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCourseWithContent(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id as string;
      const courseWithContent = await courseService.getCourseWithContent(id);

      res.json({
        success: true,
        data: courseWithContent,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCourse(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id as string;
      const data: Partial<CreateCourseDto> = req.body;
      const course = await courseService.updateCourse(id, data);

      res.json({
        success: true,
        data: course,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCourse(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id as string;
      await courseService.deleteCourse(id);

      res.json({
        success: true,
        message: 'Course deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const courseController = new CourseController();
