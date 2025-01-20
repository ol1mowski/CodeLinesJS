import jwt from 'jsonwebtoken';
import { AuthError } from '../utils/errors.js';

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      throw new AuthError('Brak tokenu autoryzacji');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new AuthError('Nieprawidłowy format tokenu');
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      throw new AuthError('Brak tokenu');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        userId: decoded.userId,
        email: decoded.email
      };
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        throw new AuthError('Nieprawidłowy token');
      } else if (error.name === 'TokenExpiredError') {
        throw new AuthError('Token wygasł');
      } else {
        throw error;
      }
    }
  } catch (error) {
    next(error);
  }
}; 