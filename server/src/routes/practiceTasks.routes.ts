import { Router } from 'express';

import { practiceTaskController } from '../api/controllers/practiceTask.controller.js';
import {
  getPracticeTasksValidator,
  getRandomPracticeTasksValidator,
  getPracticeTaskByIdValidator,
  searchTasksValidator,
  addTaskCompletionValidator,
} from '../api/validators/practiceTask.validator.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { handleValidationErrors } from '../middleware/validation.middleware.js';

const router = Router();

router.get(
  '/',
  getPracticeTasksValidator,
  handleValidationErrors,
  practiceTaskController.getPracticeTasks.bind(practiceTaskController),
);

router.get(
  '/random',
  getRandomPracticeTasksValidator,
  handleValidationErrors,
  practiceTaskController.getRandomPracticeTasks.bind(practiceTaskController),
);

router.get('/categories', practiceTaskController.getCategories.bind(practiceTaskController));

router.get('/tags', practiceTaskController.getTags.bind(practiceTaskController));

router.get('/stats', practiceTaskController.getStats.bind(practiceTaskController));

router.get(
  '/search',
  searchTasksValidator,
  handleValidationErrors,
  practiceTaskController.searchTasks.bind(practiceTaskController),
);

router.get(
  '/:id',
  getPracticeTaskByIdValidator,
  handleValidationErrors,
  practiceTaskController.getPracticeTaskById.bind(practiceTaskController),
);

router.get(
  '/:id/solution',
  getPracticeTaskByIdValidator,
  handleValidationErrors,
  practiceTaskController.getPracticeTaskSolution.bind(practiceTaskController),
);

router.post(
  '/:id/complete',
  authMiddleware,
  addTaskCompletionValidator,
  handleValidationErrors,
  practiceTaskController.addTaskCompletion.bind(practiceTaskController),
);

export default router;
