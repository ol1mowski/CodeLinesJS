import { Lesson } from "../../models/index.js";
import { User } from "../../models/user.model.js";
import { ValidationError } from "../../utils/errors.js";
import { LessonContent } from "../../models/lessonContent.model.js";
import { LevelService } from "../../services/level.service.js";

export const getLessonByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [lesson, lessonContent, user] = await Promise.all([
      Lesson.findOne({
        slug: id,
        isPublished: true,
      }).populate("requirements", "title"),
      LessonContent.findOne({ lessonSlug: id }).lean(),
      User.findById(req.user.userId)
        .select("stats.learningPaths stats.level stats.points stats.pointsToNextLevel stats.streak stats.bestStreak")
        .lean(),
    ]);

    if (!lesson) {
      throw new ValidationError("Lekcja nie została znaleziona");
    }

    if (!lessonContent) {
      throw new ValidationError("Treść lekcji nie została znaleziona");
    }

    const userLevel = user.stats?.level || 1;

    if (userLevel < lesson.requiredLevel) {
      throw new ValidationError(
        `Wymagany poziom ${lesson.requiredLevel} do odblokowania tej lekcji`
      );
    }

    const completedLessons = user.stats.learningPaths && user.stats.learningPaths.length > 0
    ? user.stats.learningPaths[0].progress.completedLessons
    : [];

    if (lesson.requirements?.length > 0) {
      const hasCompletedRequirements = lesson.requirements.every(req =>
        completedLessons.includes(req._id.toString())
      );

      if (!hasCompletedRequirements) {
        throw new ValidationError(
          "Musisz ukończyć wymagane lekcje przed rozpoczęciem tej"
        );
      }
    }
    
    const levelStats = LevelService.getUserLevelStats(user);
    
    const response = {
      id: lesson._id,
      slug: lesson.slug,
      title: lesson.title,
      description: lesson.description,
      category: lesson.category,
      difficulty: lesson.difficulty,
      duration: lesson.duration,
      points: lesson.points,
      requiredLevel: lesson.requiredLevel,
      isCompleted: completedLessons.some(
        (completedLesson) => completedLesson._id.toString() === lesson._id.toString()
      ),
      content: {
        xp: lessonContent.xp,
        rewards: lessonContent.rewards,
        sections: lessonContent.sections,
        quiz: lessonContent.quiz,
      },
      userStats: {
        level: levelStats.level,
        points: levelStats.points,
        pointsRequired: levelStats.pointsToNextLevel,
        levelProgress: levelStats.progress,
        streak: user.stats?.streak || 0,
        bestStreak: user.stats?.bestStreak || 0
      }
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
}; 