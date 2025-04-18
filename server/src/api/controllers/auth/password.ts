import { NextFunction, Request, Response } from 'express';
import authService from '../../../services/auth.service.js';

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.fail('Email jest wymagany', [
        { code: 'MISSING_EMAIL', message: 'Email jest wymagany', field: 'email' }
      ]);
    }
    
    const result = await authService.forgotPassword(email);
    
    return res.success(result, 'Link do resetowania hasła został wysłany na podany adres email');
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, password, confirmPassword } = req.body;
    
    if (!token || !password || !confirmPassword) {
      return res.fail('Wszystkie pola są wymagane', [
        { code: 'MISSING_FIELDS', message: 'Wszystkie pola są wymagane' }
      ]);
    }
    
    if (password !== confirmPassword) {
      return res.fail('Hasła nie są identyczne', [
        { code: 'PASSWORD_MISMATCH', message: 'Hasła nie są identyczne', field: 'confirmPassword' }
      ]);
    }
    
    const result = await authService.resetPassword(token, password, confirmPassword);
    
    return res.success(result, 'Hasło zostało zmienione pomyślnie');
  } catch (error) {
    next(error);
  }
}; 