import { NextFunction, Request, Response } from 'express';

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });
    
    return res.success(null, 'Wylogowanie zakończone pomyślnie');
  } catch (error) {
    next(error);
  }
}; 