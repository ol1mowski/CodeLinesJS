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
  removeMember,
  leaveGroup
} from '../controllers/groups.controller.js';
import {
  getMessages,
  sendMessage,
  editMessage,
  deleteMessage
} from '../controllers/groupMessages.controller.js';

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
router.post('/:groupId/leave', authMiddleware, leaveGroup);
router.get('/:groupId/messages', authMiddleware, getMessages);
router.post('/:groupId/messages', authMiddleware, sendMessage);
router.put('/:groupId/messages/:messageId', authMiddleware, editMessage);
router.delete('/:groupId/messages/:messageId', authMiddleware, deleteMessage);

export default router; 