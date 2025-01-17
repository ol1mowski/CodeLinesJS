import { Router } from 'express';
import { getGroups, joinGroup } from '../controllers/groups.controller.js';

const router = Router();

router.get('/', getGroups);
router.post('/:id/join', joinGroup);

export default router; 