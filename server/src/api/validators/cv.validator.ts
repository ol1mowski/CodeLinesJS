import { body, query, ValidationChain } from 'express-validator';

export const getCVTipsValidator: ValidationChain[] = [
  query('category')
    .optional()
    .isIn([
      'personal-info',
      'experience',
      'skills',
      'education',
      'projects',
      'achievements',
      'design',
      'content',
    ])
    .withMessage('Nieprawidłowa kategoria'),

  query('importance')
    .optional()
    .isIn(['low', 'medium', 'high', 'critical'])
    .withMessage('Nieprawidłowy poziom ważności'),

  query('search')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Wyszukiwanie musi mieć od 1 do 100 znaków'),

  query('tags')
    .optional()
    .isString()
    .withMessage('Tagi muszą być stringiem oddzielonym przecinkami'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit musi być liczbą między 1 a 50'),

  query('page').optional().isInt({ min: 1 }).withMessage('Strona musi być liczbą większą od 0'),

  query('sortBy')
    .optional()
    .isIn(['createdAt', 'importance', 'viewCount', 'helpfulCount', 'order'])
    .withMessage('Nieprawidłowy sposób sortowania'),

  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Kierunek sortowania musi być asc lub desc'),
];

export const getCVExamplesValidator: ValidationChain[] = [
  query('type')
    .optional()
    .isIn(['full-cv', 'section', 'skill-description', 'project-description'])
    .withMessage('Nieprawidłowy typ przykładu'),

  query('level')
    .optional()
    .isIn(['junior', 'mid', 'senior'])
    .withMessage('Nieprawidłowy poziom doświadczenia'),

  query('field')
    .optional()
    .isIn(['frontend', 'backend', 'fullstack', 'mobile', 'devops'])
    .withMessage('Nieprawidłowa dziedzina'),

  query('search')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Wyszukiwanie musi mieć od 1 do 100 znaków'),

  query('tags')
    .optional()
    .isString()
    .withMessage('Tagi muszą być stringiem oddzielonym przecinkami'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit musi być liczbą między 1 a 50'),

  query('page').optional().isInt({ min: 1 }).withMessage('Strona musi być liczbą większą od 0'),

  query('sortBy')
    .optional()
    .isIn(['createdAt', 'viewCount', 'copyCount', 'helpfulCount', 'order'])
    .withMessage('Nieprawidłowy sposób sortowania'),

  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Kierunek sortowania musi być asc lub desc'),
];

export const updateCVProgressValidator: ValidationChain[] = [
  body('type')
    .isIn(['tip_viewed', 'example_viewed', 'example_copied', 'section_completed'])
    .withMessage('Nieprawidłowy typ akcji'),

  body('itemId').isString().trim().isLength({ min: 1 }).withMessage('ID elementu jest wymagane'),

  body('sectionId')
    .optional()
    .isString()
    .trim()
    .isIn(['content-tips', 'technical-tips', 'design-tips', 'examples'])
    .withMessage('Nieprawidłowy ID sekcji'),

  body('timeSpent').optional().isInt({ min: 0 }).withMessage('Czas musi być liczbą nieujemną'),

  body('isHelpful').optional().isBoolean().withMessage('isHelpful musi być boolean'),
];
