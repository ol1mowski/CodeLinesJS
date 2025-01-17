import { Router } from 'express';
import { getGroupsController, joinGroupController } from '../controllers/groups.controller.js';

const router = Router();

router.get('/', getGroupsController);
router.post('/:groupId/join', joinGroupController);

export default router; 