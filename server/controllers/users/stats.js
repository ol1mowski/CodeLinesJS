import { User } from '../../models/user.model.js';
import { LearningPath } from '../../models/learningPath.model.js';
import { AuthError, ValidationError } from '../../utils/errors.js';

export const getUserStats = async (req, res, next) => {
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
        points: stats.points || 0,
        level: stats.level || 1,
        streak: stats.streak || 0,
        bestStreak: stats.bestStreak || 0,
        pointsToNextLevel: stats.pointsToNextLevel || 0,
        completedLessons: stats.completedLessons || 0,
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

    if (points) user.stats.points = (user.stats.points || 0) + points;
    if (xp) user.stats.xp = (user.stats.xp || 0) + xp;

    const currentLevel = user.stats.level || 1;
    const pointsToNextLevel = currentLevel * 100;

    if (user.stats.points >= pointsToNextLevel) {
      user.stats.level = Math.floor(user.stats.points / 100) + 1;
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
        lastActive: user.stats.lastActive
      }
    });
  } catch (error) {
    next(error);
  }
}; 