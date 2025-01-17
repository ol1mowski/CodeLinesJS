import express from 'express';
import { getRanking } from '../controllers/ranking.controller.js';

const router = express.Router();

router.get('/', getRanking);

export default router; 