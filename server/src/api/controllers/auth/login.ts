import authService from '../../../services/auth.service.js';
import { NextFunction, Request, Response } from 'express';
import config from '../../../config/config.js';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.fail('Email i hasło są wymagane', [
        { code: 'MISSING_CREDENTIALS', message: 'Email i hasło są wymagane' }
      ]);
    }

    const result = await authService.loginUser(email, password, rememberMe);
    
    const cookieOptions = {
      httpOnly: true,
      secure: config.app.isProduction,
      sameSite: 'strict' as const,
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
      path: '/'
    };

    res.cookie('jwt', result.token, cookieOptions);
    
    const { token, ...responseData } = result;
    return res.success(responseData, 'Logowanie zakończone pomyślnie');
  } catch (error) {
    next(error);
  }
}; 