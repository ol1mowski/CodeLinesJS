import { Router } from 'express';
import { getTopics, getTags } from '../controllers/trending.controller.js';

const router = Router();

router.get('/topics', getTopics);
router.get('/tags', getTags);

export default router; 