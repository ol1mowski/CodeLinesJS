// @ts-nocheck
import { LearningPath } from "../../../models/learningPath.model.js";
import { User } from "../../../models/user.model.js";

export const getLearningPathsController = async (req, res, next) => {
  try {
    const { difficulty, search } = req.query;
    const query = { isActive: true };

    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const [paths, user] = await Promise.all([
      LearningPath.find(query).lean(),
      User.findById(req.user.userId)
        .select("stats.points stats.level stats.learningPaths")
        .lean(),
    ]);

    const userLevel = user.stats?.level || 1;
    const userLearningPaths = user.stats?.learningPaths || [];

    const formattedPaths = paths.map((path) => {
      const userPathProgress = userLearningPaths.find(
        (lp) => lp.pathId.toString() === path._id.toString()
      );

      const completedInPath = userPathProgress?.progress?.completedLessons || 0;

      const completedPath = user.stats?.learningPaths.find(
        (lp) => lp.pathId.toString() === path._id.toString()
      );

      const completedLessons = completedPath?.progress?.completedLessons;

      return {
        id: path._id,
        title: path.title,
        description: path.description,
        difficulty: path.difficulty,
        estimatedTime: path.estimatedTime,
        requirements: path.requirements,
        outcomes: path.outcomes,
        requiredLevel: path.requiredLevel,
        isAvailable: userLevel >= path.requiredLevel,
        totalLessons: path.totalLessons,
        progress: {
          completed: completedLessons,
          total: path.totalLessons,
          percentage:
            path.totalLessons > 0
              ? Math.round((completedPath?.progress?.completedLessons.length / path.totalLessons) * 100)
              : 0,
          isStarted: completedInPath > 0,
          isCompleted: completedLessons?.length === path.totalLessons,
        },
      };
    });

    res.json({
      paths: formattedPaths,
      userStats: {
        level: userLevel,
        totalPoints: user.stats?.points || 0,
        totalPaths: paths.length,
        completedPaths: formattedPaths.filter((p) => p.progress.isCompleted)
          .length,
        pathsInProgress: formattedPaths.filter(
          (p) => !p.progress.isCompleted && userLevel >= p.requiredLevel
        ).length,
      },
    });
  } catch (error) {
    next(error);
  }
}; 