import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {
  getResources,
  getResourceById,
  toggleSaveResource
} from '../controllers/resources.controller.js';

const router = Router();

router.get('/', authMiddleware, getResources);
router.get('/:id', authMiddleware, getResourceById);
router.post('/:id/save', authMiddleware, toggleSaveResource);

export default router; 