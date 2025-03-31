import { ValidationError } from './errors.js';

export const checkRequiredFields = (body, fields) => {
  fields.forEach(field => {
    if (!body[field]) {
      throw new ValidationError(`Pole ${field} jest wymagane`);
    }
  });
}; 