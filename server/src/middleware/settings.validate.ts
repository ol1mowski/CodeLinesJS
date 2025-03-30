// @ts-nocheck
import { ValidationError } from '../utils/errors.js';
import { Request, Response, NextFunction } from 'express';

interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  [key: string]: string | undefined;
}

export const validateProfileUpdate = (req: Request, res: Response, next: NextFunction): void => {
  const { username, email, bio, socialLinks } = req.body;
  
  const errors: string[] = [];
  
  if (username && (username.length < 3 || username.length > 30)) {
    errors.push('Nazwa użytkownika musi mieć od 3 do 30 znaków');
  }
  
  if (email && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.push('Nieprawidłowy format emaila');
  }
  
  if (bio && bio.length > 500) {
    errors.push('Bio nie może przekraczać 500 znaków');
  }
  
  if (socialLinks) {
    const allowedPlatforms = ['github', 'linkedin', 'twitter'];
    const invalidPlatforms = Object.keys(socialLinks)
      .filter(platform => !allowedPlatforms.includes(platform));
    
    if (invalidPlatforms.length > 0) {
      errors.push(`Nieprawidłowe platformy społecznościowe: ${invalidPlatforms.join(', ')}`);
    }
  }
  
  if (errors.length > 0) {
    throw new ValidationError(errors.join(', '));
  }
  
  next();
};

export const validatePasswordChange = (req: Request, res: Response, next: NextFunction): void => {
  const { currentPassword, newPassword } = req.body;
  
  if (!currentPassword || !newPassword) {
    throw new ValidationError('Obecne i nowe hasło są wymagane');
  }
  
  if (newPassword.length < 6) {
    throw new ValidationError('Nowe hasło musi mieć co najmniej 6 znaków');
  }
  
  next();
};

export const validatePreferencesUpdate = (req: Request, res: Response, next: NextFunction): void => {
  const { emailNotifications, pushNotifications, language } = req.body;
  
  if (typeof emailNotifications !== 'undefined' && typeof emailNotifications !== 'boolean') {
    throw new ValidationError('Nieprawidłowa wartość dla emailNotifications');
  }
  
  if (typeof pushNotifications !== 'undefined' && typeof pushNotifications !== 'boolean') {
    throw new ValidationError('Nieprawidłowa wartość dla pushNotifications');
  }
  
  if (language && !['pl', 'en'].includes(language)) {
    throw new ValidationError('Nieprawidłowy język');
  }
  
  next();
};

export const validateAccountDeletion = (req: Request, res: Response, next: NextFunction): void => {
  const { password, confirmation } = req.body;
  
  if (!password) {
    throw new ValidationError('Hasło jest wymagane');
  }
  
  if (confirmation !== 'USUŃ KONTO') {
    throw new ValidationError('Nieprawidłowe potwierdzenie usunięcia konta');
  }
  
  next();
}; 