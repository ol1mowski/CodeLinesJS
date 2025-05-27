import { param, query, ValidationChain } from 'express-validator';

export const getLatestFeaturesValidator: ValidationChain[] = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit musi być liczbą między 1 a 50'),

  query('skip').optional().isInt({ min: 0 }).withMessage('Skip musi być liczbą nieujemną'),

  query('category')
    .optional()
    .isIn(['feature', 'update', 'improvement', 'bugfix'])
    .withMessage('Kategoria musi być jedną z: feature, update, improvement, bugfix'),

  query('isActive').optional().isBoolean().withMessage('isActive musi być wartością boolean'),

  query('sortBy')
    .optional()
    .isIn(['releaseDate', 'priority', 'title', 'createdAt'])
    .withMessage('sortBy musi być jednym z: releaseDate, priority, title, createdAt'),

  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('sortOrder musi być asc lub desc'),
];

export const getFeatureByIdValidator: ValidationChain[] = [
  param('id').isMongoId().withMessage('Nieprawidłowy format ID'),
];
