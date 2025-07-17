import { Router } from 'express';

import { CVController } from '../api/controllers/cv/cv.controller.js';
import {
  getCVTipsValidator,
  getCVExamplesValidator,
  updateCVProgressValidator,
} from '../api/validators/cv.validator.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';

const router = Router();

router.get('/tips', validate(getCVTipsValidator), CVController.getTips);
router.get('/examples', validate(getCVExamplesValidator), CVController.getExamples);
router.get('/stats', CVController.getStats);

router.use(authMiddleware);

router.get('/progress', CVController.getProgress);
router.post('/progress', validate(updateCVProgressValidator), CVController.updateProgress);

export default router;
