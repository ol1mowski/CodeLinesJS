import jwt from 'jsonwebtoken';
import { AuthError } from '../utils/errors.js';
import { User } from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
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

      // Aktualizacja lastActive przy każdym żądaniu
      await User.findByIdAndUpdate(decoded.userId, {
        $set: { 'stats.lastActive': new Date() }
      });

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