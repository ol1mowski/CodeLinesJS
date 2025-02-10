import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Lesson } from '../models/index.js';
import { LessonContent } from '../models/lessonContent.model.js';
import { lessonsContent, lessonsData } from '../data/lessonContent.js';

dotenv.config();

const initializeData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Połączono z bazą danych');
    
    await Promise.all([
      Lesson.collection.drop().catch(() => console.log('Kolekcja lessons nie istnieje')),
      LessonContent.collection.drop().catch(() => console.log('Kolekcja lessoncontents nie istnieje'))
    ]);
    console.log('Usunięto stare kolekcje');

    const createdLessons = await Lesson.insertMany(lessonsData);
    console.log('Dodano lekcje:', createdLessons.map(l => l.slug));

    await LessonContent.insertMany(lessonsContent);
    console.log('Dodano treści lekcji');

    const lessonCount = await Lesson.countDocuments();
    const contentCount = await LessonContent.countDocuments();
    console.log(`Dodano ${lessonCount} lekcji i ${contentCount} treści`);

    console.log('Inicjalizacja zakończona pomyślnie');
  } catch (error) {
    console.error('Błąd podczas inicjalizacji:', error);
  } finally {
    await mongoose.disconnect();
  }
};

initializeData(); 