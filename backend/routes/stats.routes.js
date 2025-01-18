import express from 'express';
import { getStats, updateStats, updateCategory } from '../controllers/stats.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { validateStats, validateCategory } from '../middleware/validate.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, getStats);
router.put('/', authMiddleware, validateStats, updateStats);
router.put('/category/:categoryName', authMiddleware, validateCategory, updateCategory);

export default router; 