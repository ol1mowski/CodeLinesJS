import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {
  getResources,
} from '../controllers/resources/resources.controller.js';

const router = Router();

router.get('/', authMiddleware, getResources);

export default router; 