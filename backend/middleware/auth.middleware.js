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

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        throw new AuthError('Nieprawidłowy token');
      }
      if (error.name === 'TokenExpiredError') {
        await User.findByIdAndUpdate(decoded?.userId, { $set: { isActive: false } });
        throw new AuthError('Token wygasł');
      }
      throw error;
    }

    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };

    await User.findByIdAndUpdate(decoded.userId, {
      $set: { 
        isActive: true,
        'stats.lastActive': new Date()
      }
    });

    const timeToExpiry = decoded.exp * 1000 - Date.now();
    
    if (timeToExpiry > 0) {
      setTimeout(async () => {
        const user = await User.findById(decoded.userId);
        
        if (user && user.isActive) {
          await User.findByIdAndUpdate(decoded.userId, {
            $set: { isActive: false }
          });
        }
      }, timeToExpiry);
    }

    next();
  } catch (error) {
    next(error);
  }
};
