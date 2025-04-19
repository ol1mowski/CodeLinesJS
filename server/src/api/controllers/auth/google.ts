import { NextFunction, Request, Response } from 'express';
import authService from '../../../services/auth.service.js';

export const googleAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');

    const { credential, rememberMe } = req.body;
    
    if (!credential) {
      return res.fail('Brak tokenu uwierzytelniającego Google', [
        { code: 'MISSING_CREDENTIAL', message: 'Brak tokenu uwierzytelniającego Google', field: 'credential' }
      ]);
    }

    const result = await authService.googleAuthentication(credential, rememberMe);
    
    return res.success(result, 'Logowanie przez Google zakończone pomyślnie');
  } catch (error) {
    return res.fail('Błąd uwierzytelniania przez Google', [
      { code: 'GOOGLE_AUTH_ERROR', message: error.message || 'Błąd uwierzytelniania przez Google' }
    ]);
  }
}; 