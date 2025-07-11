import { query, param, body } from 'express-validator';

export const getRandomTheoryQuestionsValidator = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit musi być liczbą całkowitą między 1 a 50'),
];

export const getTheoryQuestionByIdValidator = [
  param('id')
    .isMongoId()
    .withMessage('Identyfikator pytania musi być prawidłowym MongoDB ObjectId'),
];

export const checkAnswerValidator = [
  param('id')
    .isMongoId()
    .withMessage('Identyfikator pytania musi być prawidłowym MongoDB ObjectId'),

  body('answer').isInt({ min: 0, max: 3 }).withMessage('Odpowiedź musi być liczbą od 0 do 3'),
];
