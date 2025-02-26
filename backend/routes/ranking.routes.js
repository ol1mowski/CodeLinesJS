import express from 'express';
import { getRanking } from '../controllers/ranking.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, getRanking);

export default router; 