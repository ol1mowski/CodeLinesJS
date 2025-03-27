import { LearningPath } from "../../../models/learningPath.model.js";
import { User } from "../../../models/user.model.js";
import { ValidationError } from "../../../utils/errors.js";

export const getLearningPathByIdController = async (req, res, next) => {
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
      completedLessons: completedLessons,
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