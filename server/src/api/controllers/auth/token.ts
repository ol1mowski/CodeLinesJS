import { NextFunction, Request, Response } from 'express';
import authService from '../../../services/auth.service.js';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.fail('Brak tokenu autoryzacyjnego', [
        { code: 'MISSING_TOKEN', message: 'Brak tokenu autoryzacyjnego' }
      ], 401);
    }
    
    const user = await authService.verifyUserToken(req.user.userId);
    
    if (!user) {
      return res.fail('Nieprawidłowy token', [
        { code: 'INVALID_TOKEN', message: 'Nieprawidłowy token' }
      ], 401);
    }
    
    return res.success(user, 'Token zweryfikowany pomyślnie');
  } catch (error) {
    return res.fail('Nieprawidłowy token', [
      { code: 'INVALID_TOKEN', message: 'Nieprawidłowy token' }
    ], 401);
  }
}; 