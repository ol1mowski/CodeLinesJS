import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getActiveUsers } from '../controllers/users.controller.js';
import progressRoutes from './progress.routes.js';

const router = Router();

router.get('/active', authMiddleware, getActiveUsers);
router.use('/:userId/progress', progressRoutes);

export default router; 