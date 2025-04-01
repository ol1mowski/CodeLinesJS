import express from 'express';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { getUserProfile, getActiveUsers } from '../controllers/users/profile.controller.js';
import { getUserStats, getUserProgress, updateUserStats } from '../controllers/users/stats.controller.js';

const router = express.Router();

// Trasy profilu
router.get('/profile', authMiddleware, getUserProfile);
router.get('/active', getActiveUsers);

// Trasy statystyk
router.get('/stats', authMiddleware, getUserStats);
router.get('/progress', authMiddleware, getUserProgress);
router.patch('/stats', authMiddleware, updateUserStats);

export default router; 