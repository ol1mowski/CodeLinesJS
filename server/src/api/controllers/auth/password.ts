import { NextFunction, Request, Response } from 'express';
import authService from '../../../services/auth.service.js';

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    
    const result = await authService.forgotPassword(email);
    
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, password, confirmPassword } = req.body;
    
    const result = await authService.resetPassword(token, password, confirmPassword);
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Błąd resetowania hasła:', error);
    next(error);
  }
}; 