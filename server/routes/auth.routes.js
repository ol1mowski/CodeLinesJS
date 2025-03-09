import express from 'express';
import { register, login, forgotPassword, resetPassword, verifyToken, googleAuth } from '../controllers/auth.controller.js';
import { validateAuth, validateEmail, validateRegistration, validateResetPassword, validateGoogleAuth } from '../middleware/validate.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  res.setHeader('Permissions-Policy', 'identity-credentials-get=(self "https://accounts.google.com")');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://*.gstatic.com; connect-src 'self' https://accounts.google.com https://*.googleapis.com https://codelinesjs.pl https://www.codelinesjs.pl http://localhost:*; frame-src 'self' https://accounts.google.com; img-src 'self' data: https://*.googleusercontent.com https://*.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com; font-src 'self' https://fonts.gstatic.com");
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

router.get('/google-debug', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Debug endpoint dla Google OAuth',
    query: req.query,
    headers: req.headers
  });
});

router.get('/check-logs', (req, res) => {
  try {
    const logDir = path.join(__dirname, '..', 'logs');
    if (!fs.existsSync(logDir)) {
      return res.status(404).json({
        status: 'error',
        message: 'Katalog logów nie istnieje'
      });
    }

    const logFiles = fs.readdirSync(logDir);
    if (logFiles.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Brak plików logów'
      });
    }

    logFiles.sort((a, b) => {
      return fs.statSync(path.join(logDir, b)).mtime.getTime() -
        fs.statSync(path.join(logDir, a)).mtime.getTime();
    });

    const latestLogFile = path.join(logDir, logFiles[0]);
    const logContent = fs.readFileSync(latestLogFile, 'utf8');
    const logLines = logContent.split('\n');
    const lastLines = logLines.slice(-100);

    return res.status(200).json({
      status: 'success',
      logFiles,
      latestLogFile: logFiles[0],
      lastLines
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Błąd sprawdzania logów',
      error: error.message
    });
  }
});

router.post('/register', validateRegistration, asyncHandler(register));
router.post('/login', validateAuth, asyncHandler(login));
router.post('/forgot-password', validateEmail, asyncHandler(forgotPassword));
router.post('/reset-password', validateResetPassword, asyncHandler(resetPassword));
router.get('/verify', authMiddleware, asyncHandler(verifyToken));
router.post('/google-login', validateGoogleAuth, asyncHandler(googleAuth));

export default router; 