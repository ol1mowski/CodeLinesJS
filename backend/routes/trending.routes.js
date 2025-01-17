import { Router } from 'express';
import { getTopics, getTags } from '../controllers/trending.controller.js';

const router = Router();

router.get('/tags', getTags);
router.get('/topics', getTopics);

export default router; 