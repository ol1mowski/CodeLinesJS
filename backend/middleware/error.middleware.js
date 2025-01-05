import { AuthError } from '../utils/errors.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof AuthError) {
    return res.status(400).json({ 
      error: err.message 
    });
  }

  res.status(500).json({ 
    error: 'Internal server error' 
  });
}; 