import authService from '../../../services/auth.service.js';
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../../utils/apiResponse.js';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, username } = req.body;
    const errors: ApiError[] = [];

    if (!email) {
      errors.push({ code: 'MISSING_EMAIL', message: 'Email jest wymagany', field: 'email' });
    }
    
    if (!password) {
      errors.push({ code: 'MISSING_PASSWORD', message: 'Hasło jest wymagane', field: 'password' });
    }
    
    if (!username) {
      errors.push({ code: 'MISSING_USERNAME', message: 'Nazwa użytkownika jest wymagana', field: 'username' });
    }

    if (errors.length > 0) {
      return res.fail('Wszystkie pola są wymagane', errors);
    }

    if (password.length < 8) {
      return res.fail('Hasło musi mieć co najmniej 8 znaków', [
        { code: 'INVALID_PASSWORD', message: 'Hasło musi mieć co najmniej 8 znaków', field: 'password' }
      ]);
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.fail('Nieprawidłowy format adresu email', [
        { code: 'INVALID_EMAIL', message: 'Nieprawidłowy format adresu email', field: 'email' }
      ]);
    }

    const result = await authService.registerUser(email, password, username);

    return res.success(result, 'Rejestracja zakończona pomyślnie', 201);
  } catch (error) {
    next(error);
  }
}; 