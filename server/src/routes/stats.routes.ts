import express from 'express';
import { getGeneralStatsController } from '../api/controllers/stats/generalStats.controller.js';
import { wrapController } from '../utils/asyncHandler.js';

const router = express.Router();

router.get('/general', wrapController(getGeneralStatsController));

export default router; 