import express from 'express';
import { getStats } from '../controllers/stats.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, getStats);

export default router; 