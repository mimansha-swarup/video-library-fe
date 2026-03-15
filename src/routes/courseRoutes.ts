import { Router } from 'express';
import { courseController } from '../controllers';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Course CRUD routes
router.post('/', (req, res, next) => courseController.createCourse(req, res, next));
router.get('/', (req, res, next) => courseController.getAllCourses(req, res, next));
router.get('/:id', (req, res, next) => courseController.getCourseById(req, res, next));
router.get('/:id/content', (req, res, next) => courseController.getCourseWithContent(req, res, next));
router.put('/:id', (req, res, next) => courseController.updateCourse(req, res, next));
router.delete('/:id', (req, res, next) => courseController.deleteCourse(req, res, next));

export default router;
