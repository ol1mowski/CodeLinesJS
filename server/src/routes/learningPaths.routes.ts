import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {
  getLearningPathsController,
  getLearningPathByIdController
} from '../api/controllers/learningPath/index.js';

const router = Router();

router.get('/', authMiddleware, getLearningPathsController);

router.get('/:id', authMiddleware, getLearningPathByIdController);

export default router;