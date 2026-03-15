import { Router } from 'express';
import { lessonController } from '../controllers';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Lesson CRUD routes
router.post('/', (req, res, next) => lessonController.createLesson(req, res, next));
router.get('/module/:moduleId', (req, res, next) => lessonController.getLessonsByModule(req, res, next));
router.get('/:id', (req, res, next) => lessonController.getLessonById(req, res, next));
router.put('/:id', (req, res, next) => lessonController.updateLesson(req, res, next));
router.delete('/:id', (req, res, next) => lessonController.deleteLesson(req, res, next));

export default router;
