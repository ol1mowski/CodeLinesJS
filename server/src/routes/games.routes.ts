// @ts-nocheck
import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getGames, getGameBySlug } from '../api/controllers/games/index.js';

const router = express.Router();

router.get('/', authMiddleware, getGames);
router.get('/:slug', authMiddleware, getGameBySlug);

export default router; 