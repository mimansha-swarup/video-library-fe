import { Router } from 'express';
import { moduleController } from '../controllers';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Module CRUD routes
router.post('/', (req, res, next) => moduleController.createModule(req, res, next));
router.get('/course/:courseId', (req, res, next) => moduleController.getModulesByCourse(req, res, next));
router.get('/:id', (req, res, next) => moduleController.getModuleById(req, res, next));
router.put('/:id', (req, res, next) => moduleController.updateModule(req, res, next));
router.delete('/:id', (req, res, next) => moduleController.deleteModule(req, res, next));

export default router;
