import path from 'path';
import fs from 'fs/promises';

const UPLOAD_DIR = 'uploads/avatars';

await fs.mkdir(UPLOAD_DIR, { recursive: true }).catch(console.error);

export const uploadToStorage = async (file) => {
  try {
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(UPLOAD_DIR, fileName);
  
    await fs.writeFile(filePath, file.buffer);
    
    return `/uploads/avatars/${fileName}`;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Nie udało się zapisać pliku');
  }
};

export const deleteFromStorage = async (fileUrl) => {
  try {
    if (!fileUrl) return;
    
    const relativePath = fileUrl.startsWith('/') ? fileUrl.slice(1) : fileUrl;

    const filePath = path.join(process.cwd(), relativePath);
    
    const exists = await fs.access(filePath).then(() => true).catch(() => false);
    if (exists) {
      await fs.unlink(filePath);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Nie udało się usunąć pliku');
  }
}; 