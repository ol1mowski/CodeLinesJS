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
  console.log('Test Headers - x-vercel-proxy-signature:', req.headers['x-vercel-proxy-signature']);
  console.log('Test Headers - forwarded:', req.headers.forwarded);
  
  // Sprawdź, czy token jest w którymś z nagłówków
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
        console.log('Zdekodowany sig z forwarded:', decodedSig);
        
        if (decodedSig.startsWith('Bearer ')) {
          token = decodedSig.split(' ')[1];
          tokenSource = 'forwarded (sig)';
        }
      } catch (e) {
        console.log('Błąd dekodowania sig z forwarded:', e);
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

router.post('/register', validateRegistration, asyncHandler(register));
router.post('/login', validateAuth, asyncHandler(login));
router.post('/forgot-password', validateEmail, asyncHandler(forgotPassword));
router.get('/verify', authMiddleware, asyncHandler(verifyToken));
router.post('/google-auth', asyncHandler(googleAuth));

export default router; 