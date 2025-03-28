import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import {
  validateProfileUpdate,
  validatePasswordChange,
  validatePreferencesUpdate,
  validateAccountDeletion
} from '../middleware/settings.validate.js';
import {
  getProfile,
  updateProfile,
  changePassword,
  getPreferences,
  updatePreferences,
  deleteAccount,
  getUserData,
  getUserByIdentifier
} from '../api/controllers/settings.controller.js';

const router = Router();

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, validateProfileUpdate, updateProfile);
router.put('/security/password', authMiddleware, validatePasswordChange, changePassword);
router.get('/preferences', authMiddleware, getPreferences);
router.put('/preferences', authMiddleware, validatePreferencesUpdate, updatePreferences);
router.delete('/account', authMiddleware, validateAccountDeletion, deleteAccount);
router.get('/user', authMiddleware, getUserData);
router.get('/user/:identifier', authMiddleware, getUserByIdentifier);

export default router; 