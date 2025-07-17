import { NextFunction, Request, Response } from 'express';
import authService from '../../../services/auth.service.js';
import config from '../../../config/config.js';

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
    
    const cookieOptions = {
      httpOnly: true,
      secure: config.app.isProduction,
      sameSite: 'strict' as const,
      maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
      path: '/'
    };

    res.cookie('jwt', result.token, cookieOptions);
      
    const { token, ...responseData } = result;
    return res.success(responseData, 'Logowanie przez Google zakończone pomyślnie');
  } catch (error) {
    return res.fail('Błąd uwierzytelniania przez Google', [
      { code: 'GOOGLE_AUTH_ERROR', message: error.message || 'Błąd uwierzytelniania przez Google' }
    ]);
  }
}; 