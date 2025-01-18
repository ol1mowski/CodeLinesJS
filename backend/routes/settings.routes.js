import { Router } from 'express';
import multer from 'multer';
import path from 'path';
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
  deleteAccount,
  getUserData,
  getUserByIdentifier
} from '../controllers/settings.controller.js';

const router = Router();

// Konfiguracja multera dla przesyłania plików
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avatars');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Dozwolone są tylko pliki graficzne'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: fileFilter
});

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, validateProfileUpdate, updateProfile);
router.put('/profile/avatar', authMiddleware, upload.single('avatar'), updateAvatar);
router.put('/security/password', authMiddleware, validatePasswordChange, changePassword);
router.get('/preferences', authMiddleware, getPreferences);
router.put('/preferences', authMiddleware, validatePreferencesUpdate, updatePreferences);
router.delete('/account', authMiddleware, validateAccountDeletion, deleteAccount);
router.get('/user', authMiddleware, getUserData);
router.get('/user/:identifier', authMiddleware, getUserByIdentifier);

export default router; 