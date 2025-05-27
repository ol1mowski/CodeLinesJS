import { Router } from 'express';

import { latestFeaturesController } from '../api/controllers/latestFeatures.controller.js';
import { getLatestFeaturesValidator } from '../api/validators/latestFeature.validator.js';
import { handleValidationErrors } from '../middleware/validation.middleware.js';

const router = Router();

router.get(
  '/',
  getLatestFeaturesValidator,
  handleValidationErrors,
  latestFeaturesController.getLatestFeatures.bind(latestFeaturesController),
);

export default router;
