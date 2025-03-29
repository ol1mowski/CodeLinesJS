import jwt, { SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { IUser } from '../types/user.types.js';
import config from '../config/config.js';

export class TokenService {

  generateToken(user: IUser, expiresIn = config.jwt.expiresIn): string {
    const tokenId = crypto.randomBytes(16).toString('hex');
    
    const payload = {
      userId: user._id,
      email: user.email,
      username: user.username,
      accountType: user.accountType,
      role: user.role || 'user',
      iat: Math.floor(Date.now() / 1000),
      jti: tokenId,
    };

    const secret = process.env.JWT_SECRET || '';
    
    const options: SignOptions = { 
      expiresIn: Number(expiresIn),
      algorithm: 'HS256'
    };

    return jwt.sign(payload, secret, options);
  }
  
  generatePasswordResetToken() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
      
    const expiresIn = Date.now() + config.security.passwordResetTokenExpiresIn;
    
    return { resetToken, hashedToken, expiresIn };
  }

  verifyToken(token: string): any {
    try {
      const secret = process.env.JWT_SECRET || '';
      return jwt.verify(token, secret);
    } catch (error) {
      console.error('Błąd weryfikacji tokenu:', error);
      return null;
    }
  }

  decodeGoogleToken(token: string): any {
    try {
      const decodedToken = jwt.decode(token);
      return decodedToken;
    } catch (error) {
      console.error('Błąd dekodowania tokenu Google:', error);
      return null;
    }
  }
} 