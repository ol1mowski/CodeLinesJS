// @ts-nocheck
import mongoose from 'mongoose';
import { lessonSchema } from './lesson.model.js';
import { learningPathSchema } from './learningPath.model.js';
import { resourceSchema } from './resource.model.js';

export const Lesson = mongoose.model('Lesson', lessonSchema);
export const LearningPath = mongoose.model('LearningPath', learningPathSchema);
export const Resource = mongoose.model('Resource', resourceSchema);

export const initializeModels = () => {
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