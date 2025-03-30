// @ts-nocheck
import jwt from 'jsonwebtoken';
import { AuthError, ForbiddenError } from '../utils/errors.js';
import { User } from '../models/user.model.js';
import { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';

interface UserAuthDocument extends Document {
  username: string;
  email: string;
  role?: string;
  accountType: 'local' | 'google';
  changedPasswordAfter?: (timestamp: number) => boolean;
  passwordChangedAt?: Date;
}
  
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        username?: string;
        role: string;
        accountType?: string;
        [key: string]: any;
      };
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      throw new AuthError('Brak tokenu autoryzacji. Zaloguj się, aby uzyskać dostęp.');
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string, {
        algorithms: ['HS256']
      });
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AuthError('Nieprawidłowy token. Zaloguj się ponownie.');
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new AuthError('Token wygasł. Zaloguj się ponownie.');
      }
      throw error;
    }

    const user = await User.findById(decoded.userId).select('+passwordChangedAt') as UserAuthDocument;
    if (!user) {
      throw new AuthError('Użytkownik powiązany z tym tokenem już nie istnieje.');
    }

    if (user.changedPasswordAfter && user.changedPasswordAfter(decoded.iat)) {
      throw new AuthError('Hasło zostało zmienione. Zaloguj się ponownie.');
    }

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      username: user.username,
      role: user.role || 'user',
      accountType: user.accountType
    };

    await User.findByIdAndUpdate(decoded.userId, {
      $set: {
        isActive: true,
        'stats.lastActive': new Date()
      }
    });

    const timeToExpiry = decoded.exp * 1000 - Date.now();
    if (timeToExpiry > 0) {
      setTimeout(async () => {
        try {
          await User.findByIdAndUpdate(decoded.userId, {
            $set: { isActive: false }
          });
        } catch (error) {
          console.error('Błąd aktualizacji statusu użytkownika:', error);
        }
      }, timeToExpiry);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AuthError('Nie jesteś zalogowany'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError('Nie masz uprawnień do wykonania tej akcji'));
    }

    next();
  };
};
