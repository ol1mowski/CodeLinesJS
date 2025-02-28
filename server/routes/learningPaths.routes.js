import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {
  getLearningPaths,
  getLearningPathById
} from '../controllers/learningPath.controller.js';

const router = Router();

router.get('/', authMiddleware, getLearningPaths);

router.get('/:id', authMiddleware, getLearningPathById);

export default router;