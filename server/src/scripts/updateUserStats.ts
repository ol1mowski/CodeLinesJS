import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/user.model.js';

dotenv.config();

const updateUserStats = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('Połączono z bazą danych');

    const users = await User.find({});
    console.log(`Znaleziono ${users.length} użytkowników do aktualizacji`);

    for (const user of users) {
      if (!user.stats) {
        user.stats = {};
      }

      const existingStats = { ...user.stats };

      const last7Days = [];
      const today = new Date();
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const dailyStats = existingStats.daily?.find((d: { date: string }) => d.date === dateStr);
        
        last7Days.push({
          date: dateStr,
          points: dailyStats?.points || 0,
          timeSpent: 0 
        });
      }

      user.stats = {
        ...existingStats,
        points: existingStats.points || 0,
        level: existingStats.level || 1,
        xp: existingStats.xp || 0,
        streak: existingStats.streak || 0,
        pointsToNextLevel: existingStats.pointsToNextLevel || 1000,
        bestStreak: existingStats.bestStreak || 0,
        lastActive: existingStats.lastActive || new Date(),
        learningPaths: existingStats.learningPaths || [],
        categories: existingStats.categories || [],
        daily: existingStats.daily || [],
        experiencePoints: existingStats.xp || 0,
        nextLevelThreshold: existingStats.pointsToNextLevel || 1000,
        completedChallenges: existingStats.completedChallenges || 0,
        currentStreak: existingStats.streak || 0,
        averageScore: existingStats.averageScore || 0,
        totalTimeSpent: existingStats.totalTimeSpent || 0,
        badges: existingStats.badges || [],
        unlockedFeatures: existingStats.unlockedFeatures || [],
        chartData: {
          daily: last7Days,
          progress: existingStats.chartData?.progress || [{
            day: today.toISOString().split('T')[0],
            points: existingStats.points || 0,
            timeSpent: existingStats.totalTimeSpent || 0
          }]
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