import { Router } from 'express';
import { getRankingController } from '../controllers/ranking.controller.js';

const router = Router();

router.get('/', getRankingController);

export default router; 