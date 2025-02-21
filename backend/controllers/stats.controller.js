import { User } from '../models/user.model.js';
import { AuthError, ValidationError } from '../utils/errors.js';
import { LearningPath } from '../models/learningPath.model.js';

export const getStats = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const [user, learningPaths] = await Promise.all([
      User.findById(userId)
        .select('stats username')
        .lean(),
      LearningPath.find({ 'lessons': { $exists: true, $not: { $size: 0 } } })
        .lean()
    ]);

    if (!user) throw new ValidationError('Nie znaleziono użytkownika');

    const stats = user.stats || {};
    const pointsToNextLevel = stats.pointsToNextLevel || calculatePointsToNextLevel(stats.level || 1);

    // Oblicz postęp w ścieżkach nauki
    const learningPathsProgress = learningPaths.map(path => {
      const userPath = stats.learningPaths?.find(
        up => up.pathId.toString() === path._id.toString()
      );

      return {
        pathId: path._id,
        title: path.title,
        progress: {
          completed: userPath?.progress?.completedLessons?.length || 0,
          total: path.totalLessons,
          percentage: path.totalLessons > 0 
            ? Math.round((userPath?.progress?.completedLessons?.length || 0) / path.totalLessons * 100)
            : 0,
          status: userPath?.status || 'locked'
        }
      };
    });

    res.json({
      status: 'success',
      data: {
        username: user.username,
        level: stats.level || 1,
        xp: stats.xp || 0,
        pointsToNextLevel,
        points: stats.points || 0,
        streak: stats.streak || 0,
        bestStreak: stats.bestStreak || 0,
        lastActive: stats.lastActive || new Date(),
        experiencePoints: stats.xp || 0,
        nextLevelThreshold: pointsToNextLevel,
        completedChallenges: stats.completedChallenges || 0,
        currentStreak: stats.streak || 0,
        averageScore: stats.averageScore || 0,
        totalTimeSpent: stats.totalTimeSpent || 0,
        badges: stats.badges || [],
        unlockedFeatures: stats.unlockedFeatures || [],
        chartData: {
          daily: stats.chartData?.daily || [],
          progress: stats.chartData?.progress || []
        },
        learningPaths: learningPathsProgress,
        summary: {
          totalPaths: learningPaths.length,
          completedPaths: learningPathsProgress.filter(p => p.progress.status === 'completed').length,
          inProgress: learningPathsProgress.filter(p => p.progress.status === 'active').length,
          averageCompletion: Math.round(
            learningPathsProgress.reduce((acc, curr) => acc + curr.progress.percentage, 0) / 
            learningPathsProgress.length
          )
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const calculatePointsToNextLevel = (currentLevel) => {
  return Math.floor(1000 * Math.pow(1.2, currentLevel - 1));
};

export const getDailyStats = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const user = await User.findById(userId)
      .select('stats.chartData.daily')
      .lean();

    if (!user) throw new ValidationError('Nie znaleziono użytkownika');

    res.json({
      status: 'success',
      data: user.stats?.chartData?.daily || []
    });
  } catch (error) {
    next(error);
  }
};

export const updateStats = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const user = await User.findById(userId);
    if (!user) throw new ValidationError('Nie znaleziono użytkownika');

    if (!user.stats) {
      const initialPointsToNextLevel = calculatePointsToNextLevel(1);
      user.stats = {
        points: 0,
        xp: 0,
        level: 1,
        pointsToNextLevel: initialPointsToNextLevel,
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

    if (req.body.points) {
      user.stats.points = (user.stats.points || 0) + req.body.points;
      user.stats.xp = (user.stats.xp || 0) + req.body.points;

      while (user.stats.xp >= user.stats.pointsToNextLevel) {
        user.stats.level += 1;
        user.stats.xp -= user.stats.pointsToNextLevel;
        user.stats.pointsToNextLevel = calculatePointsToNextLevel(user.stats.level);
      }
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

    res.json({
      status: 'success',
      data: {
        points: user.stats.points,
        xp: user.stats.xp,
        level: user.stats.level,
        pointsToNextLevel: user.stats.pointsToNextLevel,
        streak: user.stats.streak,
        bestStreak: user.stats.bestStreak,
        lastActive: user.stats.lastActive,
        experiencePoints: user.stats.xp,
        nextLevelThreshold: user.stats.pointsToNextLevel,
        completedChallenges: user.stats.completedChallenges,
        currentStreak: user.stats.streak,
        averageScore: user.stats.averageScore,
        totalTimeSpent: user.stats.totalTimeSpent,
        badges: user.stats.badges,
        unlockedFeatures: user.stats.unlockedFeatures,
        chartData: user.stats.chartData
      }
    });
  } catch (error) {
    next(error);
  }
};
