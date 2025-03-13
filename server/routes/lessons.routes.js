import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { updateProgress } from '../controllers/progress.controller.js';
import {
  getLessonsController,
  getLessonByIdController,
  completeLessonController,
} from '../controllers/lessons/index.js';

const router = Router();

router.get('/', authMiddleware, getLessonsController);

router.get('/:id', authMiddleware, getLessonByIdController);

router.post('/:id/complete', authMiddleware, completeLessonController);

router.put('/:id/progress', authMiddleware, updateProgress);

export default router; 