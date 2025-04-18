import { Router } from 'express';

import {
  getProfile,
  updateProfile,
  changePassword,
  getPreferences,
  updatePreferences,
  deleteAccount,
  getUserData,
  getUserByIdentifier,
} from '../api/controllers/settings.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {
  validateProfileUpdate,
  validatePasswordChange,
  validatePreferencesUpdate,
  validateAccountDeletion,
} from '../middleware/settings.validate.js';
import { wrapController } from '../utils/asyncHandler.js';

const router = Router();

router.get('/profile', authMiddleware, wrapController(getProfile));
router.put('/profile', authMiddleware, validateProfileUpdate, wrapController(updateProfile));
router.put(
  '/security/password',
  authMiddleware,
  validatePasswordChange,
  wrapController(changePassword),
);
router.get('/preferences', authMiddleware, wrapController(getPreferences));
router.put(
  '/preferences',
  authMiddleware,
  validatePreferencesUpdate,
  wrapController(updatePreferences),
);
router.delete('/account', authMiddleware, validateAccountDeletion, wrapController(deleteAccount));
router.get('/user', authMiddleware, wrapController(getUserData));
router.get('/user/:identifier', authMiddleware, wrapController(getUserByIdentifier));

export default router;
