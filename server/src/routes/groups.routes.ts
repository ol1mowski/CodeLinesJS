// @ts-nocheck
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
} from '../api/controllers/groups/index.js';
import {
  getMessagesController,
  sendMessageController,
  editMessageController,
  deleteMessageController,
  addReactionController,
  reportMessageController
} from '../api/controllers/groups/groupMessages/index.js';

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
router.get('/:groupId/messages', authMiddleware, getMessagesController);
router.post('/:groupId/messages', authMiddleware, sendMessageController);
router.put('/:groupId/messages/:messageId', authMiddleware, editMessageController);
router.delete('/:groupId/messages/:messageId', authMiddleware, deleteMessageController);
router.post('/:groupId/messages/:messageId/reactions', authMiddleware, addReactionController);
router.post('/:groupId/messages/:messageId/report', authMiddleware, reportMessageController);

export default router; 