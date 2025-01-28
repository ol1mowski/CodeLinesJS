import mongoose from 'mongoose';
import { lessonSchema } from './lesson.model.js';
import { learningPathSchema } from './learningPath.model.js';
import { resourceSchema } from './resource.model.js';

// Rejestracja modeli
export const Lesson = mongoose.model('Lesson', lessonSchema);
export const LearningPath = mongoose.model('LearningPath', learningPathSchema);
export const Resource = mongoose.model('Resource', resourceSchema);

// Inicjalizacja modeli
export const initializeModels = () => {
  // Upewnij się, że modele są zarejestrowane
  if (!mongoose.modelNames().includes('Lesson')) {
    mongoose.model('Lesson', lessonSchema);
  }
  if (!mongoose.modelNames().includes('LearningPath')) {
    mongoose.model('LearningPath', learningPathSchema);
  }
  if (!mongoose.modelNames().includes('Resource')) {
    mongoose.model('Resource', resourceSchema);
  }
}; 