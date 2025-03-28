import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const migrateUserProgress = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('Połączono z bazą danych');

    const users = await User.find({});
    
    for (const user of users) {
      for (const path of user.learningPaths) {
        const oldCompletedLessons = path.progress.completedLessons;
        

        path.progress.completed = Array.isArray(oldCompletedLessons) 
          ? oldCompletedLessons 
          : [];
      }
      
      await user.save();
      console.log(`Zmigrowano dane dla użytkownika ${user.username}`);
    }

    console.log('Migracja zakończona pomyślnie');
  } catch (error) {
    console.error('Błąd podczas migracji:', error);
  } finally {
    await mongoose.disconnect();
  }
};

migrateUserProgress(); 