import jwt from 'jsonwebtoken';
import { AuthError } from '../utils/errors.js';

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new AuthError('Brak tokenu');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new AuthError('Nieprawidłowy token'));
  }
}; 