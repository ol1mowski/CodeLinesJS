import express from 'express';
import { register, login, forgotPassword, resetPassword, verifyToken, googleAuth, logout } from '../api/controllers/auth/index.js';
import { validateAuth, validateEmail, validateRegistration, validateResetPassword, validateGoogleAuth } from '../middleware/validate.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';


const router = express.Router();

router.post('/register', validateRegistration, asyncHandler(register));
router.post('/login', validateAuth, asyncHandler(login));
router.post('/forgot-password', validateEmail, asyncHandler(forgotPassword));
router.post('/reset-password', validateResetPassword, asyncHandler(resetPassword));
router.get('/verify', authMiddleware, asyncHandler(verifyToken));
router.post('/google-login', validateGoogleAuth, asyncHandler(googleAuth));
router.post('/logout', asyncHandler(logout));

export default router; 