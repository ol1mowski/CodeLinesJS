import { User } from '../../models/user.model.js';
import { LearningPath } from '../../models/learningPath.model.js';
import { AuthError, ValidationError } from '../../utils/errors.js';
import { STATS_CONFIG } from './config/stats.config.js';
import { calculateStreak } from './utils/dateUtils.js';
import { calculateLearningPathsProgress } from './utils/learningPathUtils.js';
import { updateStreakStats, initializeDailyStats } from './utils/statsUtils.js';

export const getUserStats = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const [user, learningPaths] = await Promise.all([
      User.findById(userId).select('stats username'),
      LearningPath.find({ 'lessons': { $exists: true, $not: { $size: 0 } } }).lean()
    ]);

    if (!user) throw new ValidationError('Nie znaleziono użytkownika');

    const stats = user.stats || {};
    const learningPathsProgress = calculateLearningPathsProgress(stats, learningPaths);
    const currentStreak = calculateStreak(stats.chartData?.daily || []);
    const { currentStreak: updatedStreak, bestStreak } = await updateStreakStats(user, currentStreak);

    res.json({
      status: 'success',
      data: {
        points: stats.points || STATS_CONFIG.DEFAULT_VALUES.points,
        level: stats.level || STATS_CONFIG.DEFAULT_LEVEL,
        streak: updatedStreak,
        bestStreak,
        pointsToNextLevel: stats.pointsToNextLevel || STATS_CONFIG.DEFAULT_POINTS_TO_NEXT_LEVEL,
        completedChallenges: stats.completedChallenges || STATS_CONFIG.DEFAULT_VALUES.completedChallenges,
        badges: stats.badges || [],
        lastActive: stats.lastActive,
        learningPaths: learningPathsProgress,
        chartData: stats.chartData || { daily: [], progress: [] }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserStats = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const { points, xp } = req.body;
    const user = await User.findById(userId);
    if (!user) throw new ValidationError('Nie znaleziono użytkownika');

    const today = new Date().toISOString().split('T')[0];
    
    if (!user.stats.chartData) {
      user.stats.chartData = { daily: [], progress: [] };
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

    res.json({
      status: 'success',
      data: {
        points: user.stats.points,
        xp: user.stats.xp,
        level: user.stats.level,
        lastActive: user.stats.lastActive,
        streak: updatedStreak,
        bestStreak,
        chartData: {
          daily: todayStats
        }
      }
    });
  } catch (error) {
    next(error);
  }
}; 