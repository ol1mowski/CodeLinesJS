import { NextFunction, Request, Response } from 'express';
import authService from '../../../services/auth.service.js';
import config from '../../../config/config.js';

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.fail('Email jest wymagany', [
        { code: 'MISSING_EMAIL', message: 'Email jest wymagany', field: 'email' }
      ]);
    }

    const result = await authService.forgotPassword(email);
    return res.success(result, 'Wysłano email do resetowania hasła');
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!token || !password || !confirmPassword) {
      return res.fail('Token, hasło i potwierdzenie hasła są wymagane', [
        { code: 'MISSING_CREDENTIALS', message: 'Token, hasło i potwierdzenie hasła są wymagane' }
      ]);
    }

    const result = await authService.resetPassword(token, password, confirmPassword);

    const cookieOptions = {
      httpOnly: true,
      secure: config.app.isProduction,
      sameSite: 'strict' as const,
      maxAge: 24 * 60 * 60 * 1000,
      path: '/'
    };

    res.cookie('jwt', result.token, cookieOptions);

    const { token: authToken, ...responseData } = result;
    return res.success(responseData, 'Hasło zostało pomyślnie zmienione');
  } catch (error) {
    next(error);
  }
}; 