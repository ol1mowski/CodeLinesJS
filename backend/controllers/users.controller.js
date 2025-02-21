import { User } from '../models/user.model.js';
import { LearningPath } from '../models/learningPath.model.js';
import { AuthError, ValidationError } from '../utils/errors.js';

export const getActiveUsers = async (req, res, next) => {
  try {
    const users = await User.find({ 'stats.lastActive': { $gt: new Date(Date.now() - 24*60*60*1000) } })
      .select('username')
      .lean();
    
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const user = await User.findById(userId)
      .select('username email profile preferences stats.level')
      .lean();

    if (!user) throw new ValidationError('Nie znaleziono użytkownika');

    res.json({
      status: 'success',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

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

export const getUserProgress = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const user = await User.findById(userId)
      .select('stats.learningPaths')
      .lean();

    if (!user) throw new ValidationError('Nie znaleziono użytkownika');

    const learningPaths = await LearningPath.find({
      _id: { $in: user.stats.learningPaths?.map(p => p.pathId) || [] }
    }).lean();

    const progress = learningPaths.map(path => {
      const userPath = user.stats.learningPaths?.find(
        p => p.pathId.toString() === path._id.toString()
      );

      return {
        pathId: path._id,
        title: path.title,
        status: userPath?.status || 'locked',
        progress: {
          completed: userPath?.progress?.completedLessons?.length || 0,
          total: path.totalLessons,
          percentage: path.totalLessons > 0
            ? Math.round((userPath?.progress?.completedLessons?.length || 0) / path.totalLessons * 100)
            : 0,
          lastActivity: userPath?.progress?.lastActivity,
          startedAt: userPath?.progress?.startedAt,
          completedAt: userPath?.progress?.completedAt
        }
      };
    });

    res.json({
      status: 'success',
      data: progress
    });
  } catch (error) {
    next(error);
  }
}; 