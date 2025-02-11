import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { LearningPath } from '../models/index.js';
import { Lesson } from '../models/index.js';

dotenv.config();

const initializeLearningPaths = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Połączono z bazą danych');

    const jsLessons = await Lesson.find({ category: 'javascript' });
    const reactLessons = await Lesson.find({ category: 'react' });

    const learningPathsData = [
      {
        title: "JavaScript od podstaw",
        description: "Poznaj podstawy programowania w JavaScript",
        category: "javascript",
        difficulty: "beginner",
        totalLessons: jsLessons.length,
        lessons: jsLessons.map(lesson => lesson._id),
        estimatedTime: 180,
        requirements: ["Podstawowa znajomość HTML"],
        outcomes: ["Zrozumienie podstaw JavaScript"],
        isActive: true,
        requiredLevel: 1
      },
      {
        title: "React fundamentals",
        description: "Naucz się podstaw React",
        category: "react",
        difficulty: "intermediate",
        totalLessons: reactLessons.length,
        lessons: reactLessons.map(lesson => lesson._id),
        estimatedTime: 240,
        requirements: ["Znajomość JavaScript"],
        outcomes: ["Tworzenie aplikacji w React"],
        isActive: true,
        requiredLevel: 2
      }
    ];

    await LearningPath.deleteMany({});
    const createdPaths = await LearningPath.insertMany(learningPathsData);
    
    console.log('Utworzono ścieżki nauki:', createdPaths.map(p => p.title));
    console.log('Inicjalizacja zakończona pomyślnie');
  } catch (error) {
    console.error('Błąd podczas inicjalizacji:', error);
  } finally {
    await mongoose.disconnect();
  }
};

initializeLearningPaths(); 