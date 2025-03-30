// @ts-nocheck
import { User } from '../../../models/user.model.js';
import { LearningPath } from '../../../models/learningPath.model.js';
import { AuthError, ValidationError } from '../../../utils/errors.js';

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