import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import DashboardController from '../controllers/dashboard.controller.js';
import DashboardService from '../services/dashboard.service.js';

const router = express.Router();
const dashboardService = new DashboardService();
const dashboardController = new DashboardController(dashboardService);

router.get('/', authMiddleware, dashboardController.getDashboardData);

export default router; 