import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { 
  getStats, 
  updateStats, 
  getDailyStats,
} from '../api/controllers/stats/index.js';

const router = Router();

router.get('/', authMiddleware, getStats);

router.put('/', authMiddleware, updateStats);

router.get('/daily', authMiddleware, getDailyStats);

export default router; 