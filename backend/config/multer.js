import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Upewnij się, że katalog istnieje
const uploadDir = 'uploads/avatars';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfiguracja przechowywania plików
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

// Konfiguracja filtrowania plików
export const fileFilter = (req, file, cb) => {
  // Akceptuj tylko obrazy
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Dozwolone są tylko pliki graficzne'), false);
  }
  cb(null, true);
};

// Konfiguracja multera
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: fileFilter
}); 