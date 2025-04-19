import authService from '../../../services/auth.service.js';
import { NextFunction, Request, Response } from 'express';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.fail('Email i hasło są wymagane', [
        { code: 'MISSING_CREDENTIALS', message: 'Email i hasło są wymagane' }
      ]);
    }

    const result = await authService.loginUser(email, password, rememberMe);
    
    return res.success(result, 'Logowanie zakończone pomyślnie');
  } catch (error) {
    next(error);
  }
}; 