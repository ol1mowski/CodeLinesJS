import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { 
  getGroupsController, 
  createGroupController,
  joinGroupController,
  checkGroupName,
  getGroupById,
  updateGroupName,
  updateGroupTags,
  deleteGroup,
  removeMember
} from '../controllers/groups.controller.js';

const router = Router();

router.get('/', authMiddleware, getGroupsController);
router.get('/:id', authMiddleware, getGroupById);
router.post('/', authMiddleware, createGroupController);
router.post('/:groupId/join', authMiddleware, joinGroupController);
router.post('/check-name', authMiddleware, checkGroupName);
router.put('/:groupId/name', authMiddleware, updateGroupName);
router.put('/:groupId/tags', authMiddleware, updateGroupTags);
router.delete('/:groupId', authMiddleware, deleteGroup);
router.delete('/:groupId/members/:memberId', authMiddleware, removeMember);

export default router; 