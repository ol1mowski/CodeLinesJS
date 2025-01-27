import mongoose from 'mongoose';
import { lessonSchema } from './lesson.model.js';
import { learningPathSchema } from './learningPath.model.js';

// Rejestracja modeli
export const Lesson = mongoose.model('Lesson', lessonSchema);
export const LearningPath = mongoose.model('LearningPath', learningPathSchema);

// Inicjalizacja modeli
export const initializeModels = () => {
  // Upewnij się, że modele są zarejestrowane
  if (!mongoose.modelNames().includes('Lesson')) {
    mongoose.model('Lesson', lessonSchema);
  }
  if (!mongoose.modelNames().includes('LearningPath')) {
    mongoose.model('LearningPath', learningPathSchema);
  }
}; 