import express from 'express';
import { getStats, updateStats, updateCategory } from '../controllers/stats.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, getStats);
router.put('/', authMiddleware, updateStats);
router.put('/category/:categoryName', authMiddleware, updateCategory);

export default router; 