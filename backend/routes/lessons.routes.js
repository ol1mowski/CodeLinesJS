import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {
  getLessons,
  getLessonById,
  completeLesson
} from '../controllers/lessons.controller.js';

const router = Router();

router.get('/', authMiddleware, getLessons);

router.get('/:id', authMiddleware, getLessonById);

router.post('/:id/complete', authMiddleware, completeLesson);

export default router; 