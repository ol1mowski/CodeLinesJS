// @ts-nocheck
import { NextFunction, Request, Response } from 'express';
import authService from '../../../services/auth.service.js';

export const googleAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');

    const { credential, rememberMe } = req.body;

    const result = await authService.googleAuthentication(credential, rememberMe);
    
    res.json(result);
  } catch (error) {
    console.error('Błąd logowania przez Google:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Błąd uwierzytelniania przez Google'
    });
  }
}; 