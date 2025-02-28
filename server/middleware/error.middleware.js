import { AuthError, ValidationError, NotFoundError } from '../utils/errors.js';
import mongoose from 'mongoose';
import { errorResponse } from '../utils/response.js';

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Wystąpił błąd serwera';
  let errorType = err.name || 'Error';
  let errors = [];
  let stack = process.env.NODE_ENV === 'production' ? undefined : err.stack;

  console.error(`[${errorType}] ${message}`, stack);

  if (err instanceof AuthError) {
    statusCode = err.statusCode;
    message = err.message;
    errorType = 'AuthenticationError';
  } else if (err instanceof ValidationError) {
    statusCode = err.statusCode;
    message = err.message;
    errorType = 'ValidationError';
    errors = err.errors || [];
  } else if (err instanceof NotFoundError) {
    statusCode = err.statusCode;
    message = err.message;
    errorType = 'NotFoundError';
  } 
  else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = 'Błąd walidacji danych';
    errorType = 'ValidationError';
    errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message
    }));
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = `Nieprawidłowy format ${err.path}: ${err.value}`;
    errorType = 'CastError';
  } else if (err.code === 11000) {
    statusCode = 409;
    message = 'Duplikat wartości w bazie danych';
    errorType = 'DuplicateError';
    const field = Object.keys(err.keyValue)[0];
    errors = [{
      field,
      message: `Wartość '${err.keyValue[field]}' już istnieje`
    }];
  } else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Nieprawidłowy token autoryzacji';
    errorType = 'TokenError';
  } else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token autoryzacji wygasł';
    errorType = 'TokenError';
  }

  const response = errorResponse(message, statusCode, errors);
  response.errorType = errorType;
  
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }
  
  res.status(statusCode).json(response);
}; 