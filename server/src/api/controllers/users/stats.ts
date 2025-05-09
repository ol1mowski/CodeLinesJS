import { User } from '../../../models/user.model.js';
import { LearningPath } from '../../../models/learningPath.model.js';
import { AuthError, ValidationError } from '../../../utils/errors.js';
import { STATS_CONFIG } from './config/stats.config.js';
import { calculateStreak } from './utils/dateUtils.js';
import { calculateLearningPathsProgress } from './utils/learningPathUtils.js';
import { updateStreakStats, initializeDailyStats } from './utils/statsUtils.js';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../../../types/user.types.js';

export const getUserStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const [user, learningPaths] = await Promise.all([
      User.findById(userId).select('stats username'),
      LearningPath.find({ 'lessons': { $exists: true, $not: { $size: 0 } } }).lean()
    ]);

    if (!user) throw new ValidationError('Nie znaleziono użytkownika');

    const stats = user.stats || {};
    const typedStats = stats as NonNullable<IUser['stats']>;
    
    const learningPathsProgress = calculateLearningPathsProgress(typedStats, learningPaths);
    const currentStreak = calculateStreak(typedStats.chartData?.daily || []);
    const { currentStreak: updatedStreak, bestStreak } = await updateStreakStats(user, currentStreak);

    res.success({
      points: typedStats.points || STATS_CONFIG.DEFAULT_VALUES.points,
      level: typedStats.level || STATS_CONFIG.DEFAULT_LEVEL,
      streak: updatedStreak,
      bestStreak,
      pointsToNextLevel: typedStats.pointsToNextLevel || STATS_CONFIG.DEFAULT_POINTS_TO_NEXT_LEVEL,
      completedChallenges: typedStats.completedChallenges || STATS_CONFIG.DEFAULT_VALUES.completedChallenges,
      badges: typedStats.badges || [],
      lastActive: typedStats.lastActive,
      learningPaths: learningPathsProgress,
      chartData: typedStats.chartData || { daily: [], progress: [] }
    }, 'Statystyki użytkownika pobrane pomyślnie');
  } catch (error) {
    next(error);
  }
};

export const updateUserStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const { points, xp } = req.body;
    const user = await User.findById(userId);
    if (!user) throw new ValidationError('Nie znaleziono użytkownika');

    const today = new Date().toISOString().split('T')[0];
    
    if (!user.stats.chartData) {
      user.stats.chartData = { 
        daily: [] as any, 
        progress: [] as any 
      };
      user.markModified('stats.chartData');
    }
    
    const todayStats = initializeDailyStats(user.stats.chartData, today);
    if (!user.stats.chartData.daily.find(d => d.date === today)) {
      user.stats.chartData.daily.push(todayStats);
    }

    if (points) {
      todayStats.points += points;
      user.stats.points = (user.stats.points || 0) + points;
    }
    if (xp) {
      user.stats.xp = (user.stats.xp || 0) + xp;
    }

    const currentStreak = calculateStreak(user.stats.chartData.daily);
    const { currentStreak: updatedStreak, bestStreak } = await updateStreakStats(user, currentStreak);

    const currentLevel = user.stats.level || STATS_CONFIG.DEFAULT_LEVEL;
    if (user.stats.points >= currentLevel * STATS_CONFIG.POINTS_PER_LEVEL) {
      user.stats.level = Math.floor(user.stats.points / STATS_CONFIG.POINTS_PER_LEVEL) + 1;
    }

    user.stats.lastActive = new Date();
    user.markModified('stats');
    await user.save();

    res.success({
      points: user.stats.points,
      xp: user.stats.xp,
      level: user.stats.level,
      lastActive: user.stats.lastActive,
      streak: updatedStreak,
      bestStreak,
      chartData: {
        daily: todayStats
      }
    }, 'Statystyki użytkownika zaktualizowane pomyślnie');
  } catch (error) {
    next(error);
  }
}; 