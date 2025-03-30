// @ts-nocheck
import { User } from '../../../models/user.model.js';
import { AuthError, ValidationError } from '../../../utils/errors.js';
import { LevelService } from '../../../services/level.service.js';

export const updateStats = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const user = await User.findById(userId);
    if (!user) throw new ValidationError('Nie znaleziono użytkownika');

    if (!user.stats) {
      user.stats = {
        points: 0,
        xp: 0,
        level: 1,
        streak: 0,
        bestStreak: 0,
        daily: [],
        lastActive: new Date(),
        completedChallenges: 0,
        averageScore: 0,
        totalTimeSpent: 0,
        badges: [],
        unlockedFeatures: [],
        chartData: {
          daily: [],
          categories: []
        }
      };
    }

    let levelUpdate = null;
    if (req.body.points) {
      levelUpdate = await LevelService.updateUserLevel(user, req.body.points);
    }

    const today = new Date();
    const lastActive = user.stats.lastActive ? new Date(user.stats.lastActive) : null;
    const diffDays = lastActive ? Math.floor((today - lastActive) / (1000 * 60 * 60 * 24)) : 1;

    if (diffDays === 1) {
      user.stats.streak += 1;
      user.stats.bestStreak = Math.max(user.stats.streak, user.stats.bestStreak);
    } else if (diffDays > 1) {
      user.stats.streak = 1;
    }

    const todayStr = today.toISOString().split('T')[0];
    if (!user.stats.chartData.daily) user.stats.chartData.daily = [];

    const dailyIndex = user.stats.chartData.daily.findIndex(d => d.date === todayStr);

    if (dailyIndex >= 0) {
      user.stats.chartData.daily[dailyIndex].points += req.body.points || 0;
      user.stats.chartData.daily[dailyIndex].challenges += req.body.challenges || 0;
    } else {
      user.stats.chartData.daily.push({
        date: todayStr,
        points: req.body.points || 0,
        challenges: req.body.challenges || 0
      });
    }

    user.stats.lastActive = today;
    await user.save();

    const levelStats = LevelService.getUserLevelStats(user);

    res.json({
      status: 'success',
      data: {
        points: levelStats.points,
        xp: user.stats.xp,
        level: levelStats.level,
        pointsToNextLevel: levelStats.pointsToNextLevel,
        levelProgress: levelStats.progress,
        streak: user.stats.streak,
        bestStreak: user.stats.bestStreak,
        lastActive: user.stats.lastActive,
        experiencePoints: user.stats.xp,
        nextLevelThreshold: levelStats.pointsToNextLevel,
        completedChallenges: user.stats.completedChallenges,
        currentStreak: user.stats.streak,
        averageScore: user.stats.averageScore,
        totalTimeSpent: user.stats.totalTimeSpent,
        badges: user.stats.badges,
        unlockedFeatures: user.stats.unlockedFeatures,
        chartData: user.stats.chartData,
        leveledUp: levelUpdate?.leveledUp || false,
        levelsGained: levelUpdate?.levelsGained || 0
      }
    });
  } catch (error) {
    next(error);
  }
}; 