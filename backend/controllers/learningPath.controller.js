import { LearningPath } from "../models/index.js";
import { User } from "../models/user.model.js";
import { ValidationError } from "../utils/errors.js";

export const getLearningPaths = async (req, res, next) => {
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
          completed: completedPath?.progress?.completedLessons,
          total: path.totalLessons,
          percentage:
            path.totalLessons > 0
              ? Math.round((completedInPath / path.totalLessons) * 100)
              : 0,
          isStarted: completedInPath > 0,
          isCompleted: completedInPath === path.totalLessons,
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


export const getLearningPathById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [learningPath, user] = await Promise.all([
      LearningPath.findOne({
        _id: id,
        isActive: true,
      }).populate({
        path: "lessons",
        select:
          "title description category difficulty duration points requirements slug",
      }),
      User.findById(req.user.userId)
        .select("stats.level stats.learningPaths")
        .lean(),
    ]);

    if (!learningPath) {
      throw new ValidationError("Ścieżka nauki nie została znaleziona");
    }

    const userLevel = user.stats?.level || 1;
    const userLearningPaths = user.stats?.learningPaths || [];
    const userPathProgress = userLearningPaths.find(
      (lp) => lp.pathId.toString() === learningPath._id.toString()
    );
    const completedLessons = userPathProgress?.progress?.completedLessons || 0;

    if (userLevel < learningPath.requiredLevel) {
      throw new ValidationError("Nie masz dostępu do tej ścieżki nauki");
    }

    const response = {
      id: learningPath._id,
      title: learningPath.title,
      description: learningPath.description,
      difficulty: learningPath.difficulty,
      category: learningPath.category,
      estimatedTime: learningPath.estimatedTime,
      requirements: learningPath.requirements,
      outcomes: learningPath.outcomes,
      isAvailable: userLevel >= learningPath.requiredLevel,
      requiredLevel: learningPath.requiredLevel,
      progress: {
        completed: completedLessons,
        total: learningPath.lessons.length,
        percentage:
          learningPath.lessons.length > 0
            ? Math.round((completedLessons / learningPath.lessons.length) * 100)
            : 0,
      },
      completedLessons: completedLessons, // Liczba ukończonych lekcji
      lessons: learningPath.lessons.map((lesson) => ({
        id: lesson._id,
        title: lesson.title,
        description: lesson.description,
        category: lesson.category,
        difficulty: lesson.difficulty,
        duration: lesson.duration,
        points: lesson.points,
        slug: lesson.slug,
        isCompleted:
          userPathProgress?.progress?.completedLessons?.includes(lesson._id) ||
          false,
        requirements: lesson.requirements,
      })),
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
