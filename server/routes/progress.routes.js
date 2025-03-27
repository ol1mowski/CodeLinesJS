import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { updateProgressController, updateUserProgressController } from '../controllers/progress/index.js';

const router = Router();

router.put('/:id/progress', authMiddleware, updateProgressController);
router.put('/points', authMiddleware, updateUserProgressController);

export default router; 