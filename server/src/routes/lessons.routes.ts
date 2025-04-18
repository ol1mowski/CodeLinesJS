import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { updateProgressController } from '../api/controllers/progress/index.js';
import {
  getLessonsController,
  getLessonByIdController,
  completeLessonController,
} from '../api/controllers/lessons/index.js';

const router = Router();

router.get('/', authMiddleware, getLessonsController);

router.get('/:id', authMiddleware, getLessonByIdController);

router.post('/:id/complete', authMiddleware, completeLessonController);

router.put('/:id/progress', authMiddleware, updateProgressController);

export default router; 