import { Router } from 'express';
import { getRanking } from '../controllers/ranking.controller.js';

const router = Router();

router.get('/', getRanking);

export default router; 