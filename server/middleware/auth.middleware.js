import jwt from 'jsonwebtoken';
import { AuthError, ForbiddenError } from '../utils/errors.js';
import { User } from '../models/user.model.js';
import config from '../config/config.js';

export const authMiddleware = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    // Ograniczenie metod uzyskiwania tokenu dla większego bezpieczeństwa
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      throw new AuthError('Brak tokenu autoryzacji. Zaloguj się, aby uzyskać dostęp.');
    }

    // Weryfikacja tokenu z jawnym określeniem algorytmu
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ['HS256'] // Akceptujemy tylko HS256
      });
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        throw new AuthError('Nieprawidłowy token. Zaloguj się ponownie.');
      }
      if (error.name === 'TokenExpiredError') {
        throw new AuthError('Token wygasł. Zaloguj się ponownie.');
      }
      throw error;
    }

    // Sprawdzenie czy użytkownik istnieje
    const user = await User.findById(decoded.userId).select('+passwordChangedAt');
    if (!user) {
      throw new AuthError('Użytkownik powiązany z tym tokenem już nie istnieje.');
    }

    // Sprawdzenie czy hasło nie zostało zmienione po wygenerowaniu tokenu
    if (user.changedPasswordAfter && user.changedPasswordAfter(decoded.iat)) {
      throw new AuthError('Hasło zostało zmienione. Zaloguj się ponownie.');
    }

    // Zapisujemy kompletne informacje o użytkowniku (ale bez wrażliwych danych)
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      username: user.username,
      role: user.role || 'user',
      accountType: user.accountType
    };

    // Aktualizacja statusu aktywności
    await User.findByIdAndUpdate(decoded.userId, {
      $set: {
        isActive: true,
        'stats.lastActive': new Date()
      }
    });

    // Monitorowanie wygaśnięcia sesji
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

/**
 * Middleware ograniczający dostęp do określonych ról
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AuthError('Nie jesteś zalogowany'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ForbiddenError('Nie masz uprawnień do wykonania tej akcji'));
    }

    next();
  };
};
