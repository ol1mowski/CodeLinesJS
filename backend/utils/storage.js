import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    
    // Usuń początkowy slash z URL
    const relativePath = fileUrl.startsWith('/') ? fileUrl.slice(1) : fileUrl;
    
    // Utwórz pełną ścieżkę do pliku
    const filePath = path.join(process.cwd(), relativePath);
    
    // Sprawdź czy plik istnieje przed próbą usunięcia
    const exists = await fs.access(filePath).then(() => true).catch(() => false);
    if (exists) {
      await fs.unlink(filePath);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Nie udało się usunąć pliku');
  }
}; 