import { describe, it, expect } from 'vitest';
import { validateActivityData } from '../../../src/api/validators/activityValidator.js';
import { ValidationError } from '../../../src/utils/errors.js';

describe('ActivityValidator', () => {
  describe('validateActivityData', () => {
    it('should return valid activity data', () => {
      const input = { points: 10, challenges: 5, timeSpent: 300 };
      const result = validateActivityData(input);
      
      expect(result).toEqual(input);
    });

    it('should set default values to 0 when data is not provided', () => {
      const result = validateActivityData({});
      
      expect(result).toEqual({ points: 0, challenges: 0, timeSpent: 0 });
    });

    it('should handle partially provided data', () => {
      const result = validateActivityData({ points: 10 });
      
      expect(result).toEqual({ points: 10, challenges: 0, timeSpent: 0 });
    });
    
    it('should throw ValidationError when points is not a number', () => {
      expect(() => {
        validateActivityData({ points: 'invalid' });
      }).toThrow(ValidationError);
      
      expect(() => {
        validateActivityData({ points: 'invalid' });
      }).toThrow('Nieprawidłowa wartość punktów');
    });
    
    it('should throw ValidationError when points is negative', () => {
      expect(() => {
        validateActivityData({ points: -10 });
      }).toThrow(ValidationError);
      
      expect(() => {
        validateActivityData({ points: -10 });
      }).toThrow('Nieprawidłowa wartość punktów');
    });
    
    it('should throw ValidationError when challenges is not a number', () => {
      expect(() => {
        validateActivityData({ challenges: 'invalid' });
      }).toThrow(ValidationError);
      
      expect(() => {
        validateActivityData({ challenges: 'invalid' });
      }).toThrow('Nieprawidłowa wartość wyzwań');
    });
    
    it('should throw ValidationError when challenges is negative', () => {
      expect(() => {
        validateActivityData({ challenges: -5 });
      }).toThrow(ValidationError);
      
      expect(() => {
        validateActivityData({ challenges: -5 });
      }).toThrow('Nieprawidłowa wartość wyzwań');
    });
    
    it('should throw ValidationError when timeSpent is not a number', () => {
      expect(() => {
        validateActivityData({ timeSpent: 'invalid' });
      }).toThrow(ValidationError);
      
      expect(() => {
        validateActivityData({ timeSpent: 'invalid' });
      }).toThrow('Nieprawidłowa wartość czasu');
    });
    
    it('should throw ValidationError when timeSpent is negative', () => {
      expect(() => {
        validateActivityData({ timeSpent: -300 });
      }).toThrow(ValidationError);
      
      expect(() => {
        validateActivityData({ timeSpent: -300 });
      }).toThrow('Nieprawidłowa wartość czasu');
    });
    
    it('should handle floating point numbers', () => {
      const input = { points: 10.5, challenges: 5.5, timeSpent: 300.5 };
      const result = validateActivityData(input);
      
      expect(result).toEqual(input);
    });
    
    it('should handle zero values', () => {
      const input = { points: 0, challenges: 0, timeSpent: 0 };
      const result = validateActivityData(input);
      
      expect(result).toEqual(input);
    });
  });
}); 