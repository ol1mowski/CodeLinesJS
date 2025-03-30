// @ts-nocheck
import jwt, { SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { IUser } from '../types/user.types.js';
import config from '../config/config.js';

export class TokenService {

  generateToken(user: IUser, expiresIn: any = config.jwt.expiresIn): string {
    const tokenId = crypto.randomBytes(16).toString('hex');
    
    const userId = typeof user._id === 'object' ? user._id.toString() : user._id;
    
    const payload = {
      userId: userId,
      email: user.email,
      username: user.username,
      accountType: user.accountType,
      role: user.role || 'user',
      iat: Math.floor(Date.now() / 1000),
      jti: tokenId,
    };

    const secret = Buffer.from(process.env.JWT_SECRET || '', 'utf-8');
    
    const options: SignOptions = { 
      expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
      algorithm: 'HS256'
    };

    console.log(`Generowanie tokenu dla użytkownika ${user.username}, wygasa za: ${expiresIn}`);
    
    try {
      return jwt.sign(payload, secret, options);
    } catch (error) {
      console.error('Błąd generowania tokenu:', error);
      throw new Error(`Nie można wygenerować tokenu: ${error.message}`);
    }
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
      const secret = Buffer.from(process.env.JWT_SECRET || '', 'utf-8');
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