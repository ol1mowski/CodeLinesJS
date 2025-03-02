import jwt from 'jsonwebtoken';
import { AuthError, ForbiddenError } from '../utils/errors.js';
import { User } from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
  try {
    console.log('Headers:', JSON.stringify(req.headers));
    console.log('Authorization header:', req.headers.authorization);
    console.log('Cookies:', req.cookies);
    
    let token;
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
      console.log('Token z nagłówka Authorization:', token.substring(0, 10) + '...');
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
      console.log('Token z ciasteczka:', token.substring(0, 10) + '...');
    }
    
    if (!token) {
      console.log('Brak tokenu w żądaniu');
      throw new AuthError('Brak tokenu autoryzacji. Zaloguj się, aby uzyskać dostęp.');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token zdekodowany pomyślnie:', decoded);
    } catch (error) {
      console.log('Błąd weryfikacji tokenu:', error.name, error.message);
      if (error.name === 'JsonWebTokenError') {
        throw new AuthError('Nieprawidłowy token. Zaloguj się ponownie.');
      }
      if (error.name === 'TokenExpiredError') {
        throw new AuthError('Token wygasł. Zaloguj się ponownie.');
      }
      throw error;
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log('Nie znaleziono użytkownika dla ID:', decoded.userId);
      throw new AuthError('Użytkownik powiązany z tym tokenem już nie istnieje.');
    }
    console.log('Znaleziono użytkownika:', user.email);

    if (user.passwordChangedAt && user.passwordChangedAt.getTime() > decoded.iat * 1000) {
      console.log('Hasło zmienione po wygenerowaniu tokenu');
      throw new AuthError('Hasło zostało zmienione. Zaloguj się ponownie.');
    }

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: user.role || 'user'
    };
    console.log('Użytkownik dodany do req.user:', req.user);

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
          const currentUser = await User.findById(decoded.userId);
          
          if (currentUser && currentUser.isActive) {
            await User.findByIdAndUpdate(decoded.userId, {
              $set: { isActive: false }
            });
          }
        } catch (error) {
          console.error('Błąd podczas dezaktywacji użytkownika:', error);
        }
      }, timeToExpiry);
    }

    next();
  } catch (error) {
    next(error);
  }
};

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
