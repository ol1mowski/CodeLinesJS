import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

const TOKEN_COOKIE_NAME = 'csrf_token';
const TOKEN_HEADER_NAME = 'X-CSRF-Token';
const CSRF_METHODS = ['POST', 'PUT', 'DELETE', 'PATCH'];
const TOKEN_TTL = 24 * 60 * 60 * 1000;

const tokenStore = new Map<string, number>();

setInterval(() => {
  const now = Date.now();
  for (const [token, expiry] of tokenStore.entries()) {
    if (expiry < now) {
      tokenStore.delete(token);
    }
  }
}, 60 * 60 * 1000);

export const generateCSRFToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

export const setCSRFToken = (req: Request, res: Response, next: NextFunction): void => {
  if (req.cookies && req.cookies[TOKEN_COOKIE_NAME]) {
    const existingToken = req.cookies[TOKEN_COOKIE_NAME];
    
    if (!tokenStore.has(existingToken)) {
      tokenStore.set(existingToken, Date.now() + TOKEN_TTL);
    }
    
    return next();
  }

  const token = generateCSRFToken();
  
  tokenStore.set(token, Date.now() + TOKEN_TTL);
  
  res.cookie(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: TOKEN_TTL
  });
  
  next();
};

export const validateCSRFToken = (req: Request, res: Response, next: NextFunction): void => {
  if (!CSRF_METHODS.includes(req.method)) {
    return next();
  }
  
  const cookieToken = req.cookies && req.cookies[TOKEN_COOKIE_NAME];
  const headerToken = req.headers[TOKEN_HEADER_NAME.toLowerCase()] as string;
  
  if (!cookieToken || !headerToken) {
    res.status(403).json({
      status: 'error',
      message: 'Błąd weryfikacji CSRF. Brak wymaganego tokenu.'
    });
    return;
  }
  
  if (cookieToken !== headerToken) {
    res.status(403).json({
      status: 'error',
      message: 'Błąd weryfikacji CSRF. Nieprawidłowy token.'
    });
    return;
  }
  
  if (!tokenStore.has(cookieToken)) {
    res.status(403).json({
      status: 'error',
      message: 'Błąd weryfikacji CSRF. Token wygasł lub jest nieprawidłowy.'
    });
    return;
  }
  
  tokenStore.set(cookieToken, Date.now() + TOKEN_TTL);
  
  next();
}; 