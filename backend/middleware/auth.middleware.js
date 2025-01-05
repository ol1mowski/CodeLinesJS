import jwt from 'jsonwebtoken';
import { AuthError } from '../utils/errors.js';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new AuthError('No token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    next(new AuthError('Invalid token'));
  }
}; 