import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getGames, getGameBySlug } from '../controllers/games.controller.js';

const router = Router();

router.get('/', authMiddleware, getGames);
router.get('/:slug', authMiddleware, getGameBySlug);

export default router; 