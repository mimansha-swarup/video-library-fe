import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { videoService, lessonService } from '../services';
import { config } from '../config/env';
import { AppError } from '../middleware/errorHandler';
import multer from 'multer';

// Configure multer for memory storage
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB limit
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only video files are allowed.'));
    }
  },
});

export class VideoController {
  /**
   * Get a signed URL for streaming a video
   * GET /video/stream?videoKey=...
   */
  async getStreamUrl(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { videoKey } = req.query;

      if (!videoKey || typeof videoKey !== 'string') {
        throw new AppError('videoKey is required', 400);
      }

      const streamUrl = await videoService.getSignedStreamUrl(videoKey);

      res.json({
        success: true,
        data: {
          streamUrl,
          expiresIn: config.signedUrlExpirySeconds,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get stream URL by lesson ID
   * GET /video/lesson/:lessonId/stream
   */
  async getStreamUrlByLesson(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const lessonId = req.params.lessonId as string;
      const lesson = await lessonService.getLessonById(lessonId);

      const streamUrl = await videoService.getSignedStreamUrl(lesson.videoKey);

      res.json({
        success: true,
        data: {
          streamUrl,
          expiresIn: config.signedUrlExpirySeconds,
          lesson,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Upload a video file
   * POST /video/upload
   */
  async uploadVideo(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const file = req.file;
      const { courseSlug, moduleOrder, lessonOrder } = req.body;

      if (!file) {
        throw new AppError('No video file provided', 400);
      }

      if (!courseSlug || !moduleOrder || !lessonOrder) {
        throw new AppError('courseSlug, moduleOrder, and lessonOrder are required', 400);
      }

      const videoKey = videoService.generateVideoKey(
        courseSlug,
        parseInt(moduleOrder, 10),
        parseInt(lessonOrder, 10),
        file.originalname
      );

      await videoService.uploadVideo(videoKey, file.buffer, file.mimetype);

      res.status(201).json({
        success: true,
        data: {
          videoKey,
          message: 'Video uploaded successfully',
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a video
   * DELETE /video/:videoKey
   */
  async deleteVideo(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const videoKey = req.params.videoKey as string;

      if (!videoKey) {
        throw new AppError('videoKey is required', 400);
      }

      await videoService.deleteVideo(videoKey);

      res.json({
        success: true,
        message: 'Video deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const videoController = new VideoController();
