import path from 'path';
import fs from 'fs/promises';

const UPLOAD_DIR = 'uploads/avatars';

// Upewnij się, że katalog istnieje
await fs.mkdir(UPLOAD_DIR, { recursive: true }).catch(console.error);

export const uploadToStorage = async (file) => {
  try {
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(UPLOAD_DIR, fileName);
    
    // Zapisz plik
    await fs.writeFile(filePath, file.buffer);
    
    // Zwróć URL do pliku
    return `/uploads/avatars/${fileName}`;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Nie udało się zapisać pliku');
  }
};

export const deleteFromStorage = async (fileUrl) => {
  try {
    if (!fileUrl) return;
    
    const filePath = path.join(process.cwd(), fileUrl);
    await fs.unlink(filePath);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}; 