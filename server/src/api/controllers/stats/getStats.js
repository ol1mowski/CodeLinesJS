import { User } from '../../../models/user.model.js';
import { AuthError, ValidationError } from '../../../utils/errors.js';
import { LearningPath } from '../../../models/learningPath.model.js';
import { LevelService } from '../../../services/level.service.js';

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

    const levelStats = LevelService.getUserLevelStats(user);

    const learningPathsProgress = learningPaths.map(path => {
      const userPath = user.stats.learningPaths?.find(
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
        level: levelStats.level,
        xp: user.stats?.xp || 0,
        pointsToNextLevel: levelStats.pointsToNextLevel,
        points: levelStats.points,
        levelProgress: levelStats.progress,
        streak: user.stats?.streak || 0,
        bestStreak: user.stats?.bestStreak || 0,
        lastActive: user.stats?.lastActive || new Date(),
        experiencePoints: user.stats?.xp || 0,
        nextLevelThreshold: levelStats.pointsToNextLevel,
        completedChallenges: user.stats?.completedChallenges || 0,
        currentStreak: user.stats?.streak || 0,
        averageScore: user.stats?.averageScore || 0,
        totalTimeSpent: user.stats?.totalTimeSpent || 0,
        badges: user.stats?.badges || [],
        unlockedFeatures: user.stats?.unlockedFeatures || [],
        chartData: {
          daily: user.stats?.chartData?.daily || [],
          progress: user.stats?.chartData?.progress || []
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