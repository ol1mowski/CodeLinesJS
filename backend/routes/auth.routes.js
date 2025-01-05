import express from 'express';
import { register, login, forgotPassword } from '../controllers/auth.controller.js';
import { validateAuth } from '../middleware/validate.middleware.js';

const router = express.Router();

router.post('/register', validateAuth, register);
router.post('/login', validateAuth, login);
router.post('/forgot-password', validateAuth, forgotPassword);

export default router; 