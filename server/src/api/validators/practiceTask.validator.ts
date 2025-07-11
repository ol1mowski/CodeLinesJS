import { param, query } from 'express-validator';

export const getPracticeTasksValidator = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit musi być liczbą między 1 a 50'),

  query('category')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Kategoria musi być niepustym stringiem (max 100 znaków)'),

  query('difficulty')
    .optional()
    .isIn(['easy', 'medium', 'hard'])
    .withMessage('Poziom trudności musi być jednym z: easy, medium, hard'),

  query('tags')
    .optional()
    .isString()
    .withMessage('Tagi muszą być stringiem oddzielone przecinkami'),

  query('search')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Fraza wyszukiwania musi mieć 2-200 znaków'),

  query('sortBy')
    .optional()
    .isIn(['newest', 'oldest', 'difficulty', 'estimatedTime'])
    .withMessage('Sortowanie musi być jednym z: newest, oldest, difficulty, estimatedTime'),

  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Kolejność sortowania musi być: asc lub desc'),
];

export const getRandomPracticeTasksValidator = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit musi być liczbą między 1 a 50'),

  query('category')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Kategoria musi być niepustym stringiem (max 100 znaków)'),

  query('difficulty')
    .optional()
    .isIn(['easy', 'medium', 'hard'])
    .withMessage('Poziom trudności musi być jednym z: easy, medium, hard'),
];

export const getPracticeTaskByIdValidator = [
  param('id').isMongoId().withMessage('Nieprawidłowy identyfikator zadania'),
];

export const searchTasksValidator = [
  query('q')
    .notEmpty()
    .isString()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Fraza wyszukiwania musi mieć 2-200 znaków'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit musi być liczbą między 1 a 50'),
];

export const addTaskCompletionValidator = [
  param('id').isMongoId().withMessage('Nieprawidłowy identyfikator zadania'),
];
