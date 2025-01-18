import jwt from 'jsonwebtoken';
import { AuthError } from '../utils/errors.js';

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AuthError('Nieprawidłowy format tokenu');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new AuthError('Brak tokenu');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(new AuthError('Nieprawidłowy token'));
    } else if (error.name === 'TokenExpiredError') {
      next(new AuthError('Token wygasł'));
    } else {
      next(error);
    }
  }
}; 