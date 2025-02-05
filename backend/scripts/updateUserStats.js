import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/user.model.js';

dotenv.config();

const updateUserStats = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Połączono z bazą danych');

    const users = await User.find({});
    console.log(`Znaleziono ${users.length} użytkowników do aktualizacji`);

    for (const user of users) {
      // Inicjalizacja stats jeśli nie istnieje
      if (!user.stats) {
        user.stats = {};
      }

      // Zachowaj istniejące wartości lub ustaw domyślne
      user.stats = {
        // Zachowaj istniejące pola
        points: user.stats.points || 0,
        level: user.stats.level || 1,
        xp: user.stats.xp || 0,
        streak: user.stats.streak || 0,
        pointsToNextLevel: user.stats.pointsToNextLevel || 1000,
        bestStreak: user.stats.bestStreak || 0,
        lastActive: user.stats.lastActive || new Date(),
        learningPaths: user.stats.learningPaths || [],
        categories: user.stats.categories || [],
        daily: user.stats.daily || [],

        // Dodaj nowe pola
        experiencePoints: user.stats.xp || 0,
        nextLevelThreshold: user.stats.pointsToNextLevel || 1000,
        completedChallenges: user.stats.completedChallenges || 0,
        currentStreak: user.stats.streak || 0,
        averageScore: user.stats.averageScore || 0,
        totalTimeSpent: user.stats.totalTimeSpent || 0,
        badges: user.stats.badges || [],
        unlockedFeatures: user.stats.unlockedFeatures || [],
        chartData: {
          daily: user.stats.chartData?.daily || [],
          categories: user.stats.chartData?.categories || []
        }
      };

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