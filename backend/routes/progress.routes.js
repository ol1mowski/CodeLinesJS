import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { updateProgress } from '../controllers/progress.controller.js';

const router = Router({ mergeParams: true });

router.put('/', authMiddleware, updateProgress);

export default router; 