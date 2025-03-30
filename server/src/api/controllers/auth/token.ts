// @ts-nocheck
import { NextFunction, Request, Response } from 'express';
import authService from '../../../services/auth.service.js';

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authService.verifyUserToken(req.user.userId);
    res.json(user);
  } catch (error) {
    console.error('verifyToken - błąd:', error);
    res.status(401).json({ error: 'Nieprawidłowy token' });
  }
}; 