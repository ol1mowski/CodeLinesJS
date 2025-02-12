import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { 
  getGroupsController, 
  createGroupController,
  joinGroupController,
  checkGroupName,
  getGroupById
} from '../controllers/groups.controller.js';

const router = Router();

router.get('/', authMiddleware, getGroupsController);
router.get('/:id', authMiddleware, getGroupById);
router.post('/', authMiddleware, createGroupController);
router.post('/:groupId/join', authMiddleware, joinGroupController);
router.post('/check-name', authMiddleware, checkGroupName);

export default router; 