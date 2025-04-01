import { AuthError } from '../../../utils/errors.js';
import authService from '../../../services/auth.service.js';
import { NextFunction, Request, Response } from 'express';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      throw new AuthError('Wszystkie pola są wymagane');
    }

    if (password.length < 8) {
      throw new AuthError('Hasło musi mieć co najmniej 8 znaków');
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new AuthError('Nieprawidłowy format adresu email');
    }

    const result = await authService.registerUser(email, password, username);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}; 