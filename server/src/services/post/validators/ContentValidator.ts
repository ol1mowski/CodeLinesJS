import { ValidationError } from '../../../utils/errors.js';
import { IValidator } from './IValidator.js';

export class ContentValidator implements IValidator {
  private minLength: number;
  private maxLength: number;
  private errorPrefix: string;

  constructor(minLength = 3, maxLength = 500, errorPrefix = 'Post') {
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.errorPrefix = errorPrefix;
  }

  validate(content: string): void {
    if (content.length < this.minLength) {
      throw new ValidationError(`${this.errorPrefix} musi zawierać co najmniej ${this.minLength} znaki`);
    }
    
    if (content.length > this.maxLength) {
      throw new ValidationError(`${this.errorPrefix} nie może przekraczać ${this.maxLength} znaków`);
    }
  }
} 