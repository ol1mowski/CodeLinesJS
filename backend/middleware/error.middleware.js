import { AuthError, ValidationError, NotFoundError } from '../utils/errors.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof AuthError) {
    return res.status(err.statusCode).json({ 
      error: err.message 
    });
  }

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({ 
      error: err.message 
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({ 
      error: err.message 
    });
  }

  res.status(500).json({ 
    error: 'Wystąpił błąd serwera' 
  });
}; 