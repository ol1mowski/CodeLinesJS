import express from 'express';
import { register, login, forgotPassword, verifyToken } from '../controllers/auth.controller.js';
import { validateAuth, validateEmail } from '../middleware/validate.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', validateAuth, register);
router.post('/login', validateAuth, login);
router.post('/forgot-password', validateEmail, forgotPassword);
router.get('/verify', authMiddleware, verifyToken);

export default router; 