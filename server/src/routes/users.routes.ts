import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { 
  getActiveUsers, 
  getUserProfile,
  getUserStats,
  updateUserStats,
  getUserProgress
} from '../api/controllers/users/index.js';

const router = Router();

router.get('/active', getActiveUsers);
router.get('/profile', authMiddleware, getUserProfile);
router.get('/stats', authMiddleware, getUserStats);
router.patch('/stats', authMiddleware, updateUserStats);
router.get('/progress', authMiddleware, getUserProgress);

export default router; 