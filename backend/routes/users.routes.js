import { Router } from 'express';
import progressRoutes from './progress.routes.js';

const router = Router();

router.use('/:userId/progress', progressRoutes);

export default router; 