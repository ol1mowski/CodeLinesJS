import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/user.model.js';

dotenv.config();

const updateUserStats = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Połączono z bazą danych');

    // Znajdź wszystkich użytkowników
    const users = await User.find({});
    console.log(`Znaleziono ${users.length} użytkowników do aktualizacji`);

    for (const user of users) {
      // Zachowaj istniejące dane
      const existingStats = user.stats || {};
      
      // Przygotuj nowe pola statystyk
      user.stats = {
        // Zachowaj istniejące wartości lub ustaw domyślne
        points: existingStats.points || 0,
        completedLessons: existingStats.completedLessons || [],
        lastActive: existingStats.lastActive || new Date(),
        
        // Dodaj nowe pola
        level: existingStats.level || 1,
        xp: existingStats.xp || existingStats.points || 0,
        streak: existingStats.streak || 0,
        bestStreak: existingStats.bestStreak || 0,
        
        // Inicjalizuj kategorie jeśli nie istnieją
        categories: existingStats.categories || [
          {
            name: 'javascript',
            progress: 0,
            level: 1
          },
          {
            name: 'react',
            progress: 0,
            level: 1
          },
          {
            name: 'node',
            progress: 0,
            level: 1
          },
          {
            name: 'database',
            progress: 0,
            level: 1
          },
          {
            name: 'testing',
            progress: 0,
            level: 1
          }
        ],
        
        // Inicjalizuj dzienne statystyki
        daily: existingStats.daily || [{
          date: new Date().toISOString().split('T')[0],
          points: 0,
          challenges: 0
        }]
      };

      // Oblicz poziom na podstawie XP
      user.stats.level = Math.floor(user.stats.xp / 100) + 1;

      // Zapisz zaktualizowanego użytkownika
      await user.save();
      console.log(`Zaktualizowano statystyki dla użytkownika ${user.username}`);
    }

    console.log('Aktualizacja zakończona pomyślnie');
  } catch (error) {
    console.error('Błąd podczas aktualizacji:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Rozłączono z bazą danych');
  }
};

updateUserStats(); 