import { AuthError } from '../../../utils/errors.js';
import authService from '../../../services/auth.service.js';
import { NextFunction, Request, Response } from 'express';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      throw new AuthError('Email i hasło są wymagane');
    }

    const result = await authService.loginUser(email, password, rememberMe);
    
    res.json(result);
  } catch (error) {
    next(error);
  }
}; 