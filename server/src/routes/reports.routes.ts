import { Router } from 'express';
import { createReport } from '../api/controllers/reports/report.controller.js';

const router = Router();

router.post('/', createReport);

export default router; 