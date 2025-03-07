import express from 'express';
import { register, login, forgotPassword, resetPassword, verifyToken, googleAuth } from '../controllers/auth.controller.js';
import { validateAuth, validateEmail, validateRegistration, validateResetPassword } from '../middleware/validate.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = express.Router();

router.get('/test-headers', (req, res) => {
  let token;
  let tokenSource = 'nie znaleziono';
  const authHeader = req.headers.authorization;
  const vercelProxySignature = req.headers['x-vercel-proxy-signature'];
  const forwarded = req.headers.forwarded;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
    tokenSource = 'Authorization';
  } else if (vercelProxySignature && vercelProxySignature.startsWith('Bearer ')) {
    token = vercelProxySignature.split(' ')[1];
    tokenSource = 'x-vercel-proxy-signature';
  } else if (forwarded && forwarded.includes('sig=')) {
    const sigMatch = forwarded.match(/sig=([^;]+)/);
    if (sigMatch && sigMatch[1]) {
      try {
        const decodedSig = Buffer.from(sigMatch[1], 'base64').toString();

        if (decodedSig.startsWith('Bearer ')) {
          token = decodedSig.split(' ')[1];
          tokenSource = 'forwarded (sig)';
        }
      } catch (e) {
        throw new Error('Błąd dekodowania sig z forwarded');
      }
    }
  }

  res.json({
    headers: req.headers,
    authorization: req.headers.authorization,
    vercelProxySignature: req.headers['x-vercel-proxy-signature'],
    forwarded: req.headers.forwarded,
    tokenFound: !!token,
    tokenSource: tokenSource,
    message: 'Sprawdź logi serwera, aby zobaczyć wszystkie nagłówki'
  });
});

router.options('/google-login', (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');

  res.status(204).end();
});

router.post('/google-login-test', (req, res) => {

  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');

  res.status(200).json({
    status: 'success',
    message: 'Test endpoint dla Google Login',
    receivedData: {
      headers: req.headers,
      body: req.body
    }
  });
});

router.post('/register', validateRegistration, asyncHandler(register));
router.post('/login', validateAuth, asyncHandler(login));
router.post('/forgot-password', validateEmail, asyncHandler(forgotPassword));
router.post('/reset-password', validateResetPassword, asyncHandler(resetPassword));
router.get('/verify', authMiddleware, asyncHandler(verifyToken));
router.post('/google-login', (req, res, next) => {
  return asyncHandler(googleAuth)(req, res, next);
});

export default router; 