// @ts-nocheck
export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthError extends AppError {
  constructor(message = 'Nie jesteś zalogowany') {
    super(message, 401);
    this.name = 'AuthError';
  }
}

export class ValidationError extends AppError {
  errors: Record<string, string>[];

  constructor(message = 'Nieprawidłowe dane wejściowe', errors: Record<string, string>[] = []) {
    super(message, 400);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Nie znaleziono zasobu') {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Nie masz uprawnień do tego zasobu') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Zasób już istnieje') {
    super(message, 409);
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Przekroczono limit zapytań') {
    super(message, 429);
    this.name = 'RateLimitError';
  }
} 