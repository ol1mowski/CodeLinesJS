import { Router } from 'express';

import { theoryQuestionController } from '../api/controllers/theoryQuestion.controller.js';
import {
  getRandomTheoryQuestionsValidator,
  getTheoryQuestionByIdValidator,
  checkAnswerValidator,
} from '../api/validators/theoryQuestion.validator.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {
  theoryQuestionsRateLimit,
  checkAnswerRateLimit,
  securityHeaders,
} from '../middleware/theoryQuestions.security.middleware.js';
import { handleValidationErrors } from '../middleware/validation.middleware.js';

const router = Router();

router.use(securityHeaders);
router.use(theoryQuestionsRateLimit);

router.get(
  '/',
  getRandomTheoryQuestionsValidator,
  handleValidationErrors,
  theoryQuestionController.getRandomTheoryQuestions.bind(theoryQuestionController),
);

router.get(
  '/:id',
  getTheoryQuestionByIdValidator,
  handleValidationErrors,
  theoryQuestionController.getTheoryQuestionById.bind(theoryQuestionController),
);

router.post(
  '/:id/check',
  authMiddleware,
  checkAnswerRateLimit,
  checkAnswerValidator,
  handleValidationErrors,
  theoryQuestionController.checkAnswer.bind(theoryQuestionController),
);

export default router;
