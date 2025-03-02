import express from 'express';
import { register, login, forgotPassword, verifyToken, googleAuth } from '../controllers/auth.controller.js';
import { validateAuth, validateEmail, validateRegistration } from '../middleware/validate.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

// Endpoint testowy do sprawdzenia nagłówków
router.get('/test-headers', (req, res) => {
  console.log('Test Headers - wszystkie nagłówki:', JSON.stringify(req.headers));
  console.log('Test Headers - authorization:', req.headers.authorization);
  
  res.json({
    headers: req.headers,
    authorization: req.headers.authorization,
    message: 'Sprawdź logi serwera, aby zobaczyć wszystkie nagłówki'
  });
});

router.post('/register', validateRegistration, asyncHandler(register));
router.post('/login', validateAuth, asyncHandler(login));
router.post('/forgot-password', validateEmail, asyncHandler(forgotPassword));
router.get('/verify', authMiddleware, asyncHandler(verifyToken));
router.post('/google-auth', asyncHandler(googleAuth));

export default router; 