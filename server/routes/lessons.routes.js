import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { updateProgress } from '../controllers/progress.controller.js';
import {
  getLessons,
  getLessonById,
  completeLesson,
} from '../controllers/lessons.controller.js';

const router = Router();

router.get('/', authMiddleware, getLessons);

router.get('/:id', authMiddleware, getLessonById);

router.post('/:id/complete', authMiddleware, completeLesson);

router.put('/:id/progress', authMiddleware, updateProgress);

export default router; 