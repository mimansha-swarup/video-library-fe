import { Router } from 'express';
import { videoController, upload } from '../controllers';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Video streaming routes
router.get('/stream', (req, res, next) => videoController.getStreamUrl(req, res, next));
router.get('/lesson/:lessonId/stream', (req, res, next) => videoController.getStreamUrlByLesson(req, res, next));

// Video upload/delete routes
router.post('/upload', upload.single('video'), (req, res, next) => videoController.uploadVideo(req, res, next));
router.delete('/:videoKey', (req, res, next) => videoController.deleteVideo(req, res, next));

export default router;
