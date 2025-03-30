// @ts-nocheck
import { ValidationError } from '../utils/errors.js';
import { body, validationResult, ValidationChain, ValidationError as ExpressValidationError } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    
    if (errors.isEmpty()) {
      return next();
    }

    const formattedErrors = errors.array().map((err: any) => ({
      field: err.path,
      message: err.msg
    }));

    return next(new ValidationError('Błąd walidacji danych', formattedErrors));
  };
};

export const validateAuth = validate([
  body('email')
    .notEmpty().withMessage('Email jest wymagany')
    .isEmail().withMessage('Podaj prawidłowy adres email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Hasło jest wymagane')
    .isLength({ min: 6 }).withMessage('Hasło musi mieć co najmniej 6 znaków')
]);

export const validateEmail = validate([
  body('email')
    .notEmpty().withMessage('Email jest wymagany')
    .isEmail().withMessage('Podaj prawidłowy adres email')
    .normalizeEmail()
]);

export const validateRegistration = validate([
  body('email')
    .notEmpty().withMessage('Email jest wymagany')
    .isEmail().withMessage('Podaj prawidłowy adres email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Hasło jest wymagane')
    .isLength({ min: 6 }).withMessage('Hasło musi mieć co najmniej 6 znaków'),
  body('username')
    .notEmpty().withMessage('Nazwa użytkownika jest wymagana')
    .isLength({ min: 3, max: 20 }).withMessage('Nazwa użytkownika musi mieć od 3 do 20 znaków')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Nazwa użytkownika może zawierać tylko litery, cyfry i podkreślenia')
]);

export const validateStats = validate([
  body('points')
    .optional()
    .isInt({ min: 0 }).withMessage('Punkty muszą być liczbą całkowitą większą lub równą 0'),
  body('completedChallenges')
    .optional()
    .isInt({ min: 0 }).withMessage('Liczba ukończonych wyzwań musi być liczbą całkowitą większą lub równą 0'),
  body('averageScore')
    .optional()
    .isFloat({ min: 0, max: 100 }).withMessage('Średni wynik musi być liczbą z zakresu 0-100'),
  body('totalTimeSpent')
    .optional()
    .isInt({ min: 0 }).withMessage('Całkowity czas nauki musi być liczbą całkowitą większą lub równą 0')
]);

export const validateProfileUpdate = validate([
  body('username')
    .optional()
    .isLength({ min: 3, max: 20 }).withMessage('Nazwa użytkownika musi mieć od 3 do 20 znaków')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Nazwa użytkownika może zawierać tylko litery, cyfry i podkreślenia'),
  body('profile.bio')
    .optional()
    .isLength({ max: 500 }).withMessage('Opis nie może przekraczać 500 znaków'),
  body('profile.socialLinks.github')
    .optional()
    .isURL().withMessage('Podaj prawidłowy adres URL do profilu GitHub'),
  body('profile.socialLinks.linkedin')
    .optional()
    .isURL().withMessage('Podaj prawidłowy adres URL do profilu LinkedIn'),
  body('profile.socialLinks.twitter')
    .optional()
    .isURL().withMessage('Podaj prawidłowy adres URL do profilu Twitter')
]);

export const validatePasswordChange = validate([
  body('currentPassword')
    .notEmpty().withMessage('Aktualne hasło jest wymagane'),
  body('newPassword')
    .notEmpty().withMessage('Nowe hasło jest wymagane')
    .isLength({ min: 6 }).withMessage('Nowe hasło musi mieć co najmniej 6 znaków')
    .custom((value, { req }) => {
      if (value === req.body.currentPassword) {
        throw new Error('Nowe hasło musi być różne od aktualnego');
      }
      return true;
    })
]);

export const validateResetPassword = validate([
  body('token')
    .notEmpty().withMessage('Token resetowania hasła jest wymagany'),
  body('password')
    .notEmpty().withMessage('Nowe hasło jest wymagane')
    .isLength({ min: 6 }).withMessage('Hasło musi mieć co najmniej 6 znaków'),
  body('confirmPassword')
    .notEmpty().withMessage('Potwierdzenie hasła jest wymagane')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Hasła nie są identyczne');
      }
      return true;
    })
]);

export const validateGoogleAuth = validate([
  body('credential')
    .notEmpty().withMessage('Token Google jest wymagany')
]);
