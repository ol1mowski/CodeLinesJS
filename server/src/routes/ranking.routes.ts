// @ts-nocheck
import express from 'express';
import { getRanking } from '../api/controllers/ranking/ranking.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authMiddleware, getRanking);

export default router; 