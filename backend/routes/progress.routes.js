import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { updateProgress, updateUserProgress } from '../controllers/progress.controller.js';

const router = Router();

router.put('/:id/progress', authMiddleware, updateProgress);
router.put('/points', authMiddleware, updateUserProgress);

export default router; 