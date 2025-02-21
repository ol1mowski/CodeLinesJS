import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { 
  getActiveUsers, 
  getUserProfile,
  getUserStats,
  updateUserStats,
  getUserProgress
} from '../controllers/users.controller.js';
import progressRoutes from './progress.routes.js';

const router = Router();

router.get('/active', authMiddleware, getActiveUsers);
router.get('/profile', authMiddleware, getUserProfile);
router.get('/stats', authMiddleware, getUserStats);
router.put('/stats', authMiddleware, updateUserStats);
router.get('/progress', authMiddleware, getUserProgress);

router.use('/:userId/progress', progressRoutes);

export default router; 