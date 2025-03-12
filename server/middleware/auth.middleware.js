import jwt from 'jsonwebtoken';
import { AuthError, ForbiddenError } from '../utils/errors.js';
import { User } from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;
    const vercelProxySignature = req.headers['x-vercel-proxy-signature'];
    const forwarded = req.headers.forwarded;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (vercelProxySignature && vercelProxySignature.startsWith('Bearer ')) {
      token = vercelProxySignature.split(' ')[1];
    } else if (forwarded && forwarded.includes('sig=')) {
      const sigMatch = forwarded.match(/sig=([^;]+)/);
      if (sigMatch && sigMatch[1]) {
        try {
          const decodedSig = Buffer.from(sigMatch[1], 'base64').toString();
          if (decodedSig.startsWith('Bearer ')) {
            token = decodedSig.split(' ')[1];
          }
        } catch (e) {
        }
      }
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      throw new AuthError('Brak tokenu autoryzacji. Zaloguj się, aby uzyskać dostęp.');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
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
      throw new AuthError('Użytkownik powiązany z tym tokenem już nie istnieje.');
    }


    if (user.passwordChangedAt && user.passwordChangedAt.getTime() > decoded.iat * 1000) {
      throw new AuthError('Hasło zostało zmienione. Zaloguj się ponownie.');
    }

    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: user.role || 'user'
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
          const currentUser = await User.findById(decoded.userId);

          if (currentUser && currentUser.isActive) {
            await User.findByIdAndUpdate(decoded.userId, {
              $set: { isActive: false }
            });
          }
        } catch (error) {
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
