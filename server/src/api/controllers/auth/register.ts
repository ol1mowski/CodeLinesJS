import authService from '../../../services/auth.service.js';
import { NextFunction, Request, Response } from 'express';
import config from '../../../config/config.js';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.fail('Email, hasło i nazwa użytkownika są wymagane', [
        { code: 'MISSING_CREDENTIALS', message: 'Email, hasło i nazwa użytkownika są wymagane' }
      ]);
    }

    const result = await authService.registerUser(email, password, username);
    
    const cookieOptions = {
      httpOnly: true,
      secure: config.app.isProduction,
      sameSite: 'strict' as const,
      maxAge: 24 * 60 * 60 * 1000,
      path: '/'
    };

    res.cookie('jwt', result.token, cookieOptions);
    
    const { token, ...responseData } = result;
    return res.success(responseData, 'Rejestracja zakończona pomyślnie');
  } catch (error) {
    next(error);
  }
}; 