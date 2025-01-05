import express from 'express';
import { register, login, forgotPassword } from '../controllers/auth.controller.js';
import { validateAuth, validateEmail } from '../middleware/validate.middleware.js';

const router = express.Router();

router.post('/register', validateAuth, register);
router.post('/login', validateAuth, login);
router.post('/forgot-password', validateEmail, forgotPassword);

export default router; 