import { Router } from 'express';
import multer from 'multer';
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
  updateAvatar,
  changePassword,
  getPreferences,
  updatePreferences,
  deleteAccount
} from '../controllers/settings.controller.js';

const router = Router();
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Dozwolone są tylko pliki graficzne'));
    }
    cb(null, true);
  }
});

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, validateProfileUpdate, updateProfile);
router.put('/profile/avatar', authMiddleware, upload.single('avatar'), updateAvatar);

router.put('/security/password', authMiddleware, validatePasswordChange, changePassword);

router.get('/preferences', authMiddleware, getPreferences);
router.put('/preferences', authMiddleware, validatePreferencesUpdate, updatePreferences);

router.delete('/account', authMiddleware, validateAccountDeletion, deleteAccount);

export default router; 