import { Lesson } from "../../../models/lesson.model.js";
import { User } from "../../../models/user.model.js";
import { ValidationError } from "../../../utils/errors.js";
import { LessonContent } from "../../../models/lessonContent.model.js";
import { LevelService } from "../../../services/level.service.js";
import { IUser } from "../../../services/lesson/types.js";
import { NextFunction, Request, Response } from "express";

export const getLessonByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    
    if (!userId) {
      res.fail('Brak identyfikatora użytkownika. Zaloguj się ponownie.', [
        { code: 'AUTH_REQUIRED', message: 'Brak autoryzacji' }
      ]);
      return;
    }
    
    if (!id) {
      res.fail('Identyfikator lekcji jest wymagany', [
        { code: 'MISSING_LESSON_ID', message: 'Identyfikator lekcji jest wymagany', field: 'id' }
      ]);
      return;
    }

    try {
      const [lesson, lessonContent, user] = await Promise.all([
        Lesson.findOne({
          slug: id,
          isPublished: true,
        }).populate("requirements", "title"),
        LessonContent.findOne({ lessonSlug: id }).lean(),
        User.findById(userId)
          .select("stats.learningPaths stats.level stats.points stats.pointsToNextLevel stats.streak stats.bestStreak")
          .lean(),
      ]);

      if (!lesson) {
        res.fail('Lekcja nie została znaleziona', [
          { code: 'LESSON_NOT_FOUND', message: 'Lekcja nie została znaleziona', field: 'id' }
        ], 404);
        return;
      }

      if (!lessonContent) {
        res.fail('Treść lekcji nie została znaleziona', [
          { code: 'LESSON_CONTENT_NOT_FOUND', message: 'Treść lekcji nie została znaleziona', field: 'id' }
        ], 404);
        return;
      }
      
      if (!user) {
        res.fail('Użytkownik nie został znaleziony', [
          { code: 'USER_NOT_FOUND', message: 'Użytkownik nie został znaleziony' }
        ], 404);
        return;
      }

      const userLevel = user.stats?.level || 1;

      if (userLevel < lesson.requiredLevel) {
        res.fail(`Wymagany poziom ${lesson.requiredLevel} do odblokowania tej lekcji`, [
          { code: 'LEVEL_REQUIREMENT_NOT_MET', message: `Wymagany poziom ${lesson.requiredLevel} do odblokowania tej lekcji` }
        ], 403);
        return;
      }

      const completedLessons = user.stats.learningPaths && user.stats.learningPaths.length > 0
        ? user.stats.learningPaths[0].progress.completedLessons
        : [];

      if (lesson.requirements?.length > 0) {
        const hasCompletedRequirements = lesson.requirements.every(req =>
          completedLessons.some(completedLesson => completedLesson._id.toString() === req._id.toString())
        );

        if (!hasCompletedRequirements) {
          res.fail('Musisz ukończyć wymagane lekcje przed rozpoczęciem tej', [
            { code: 'REQUIREMENTS_NOT_MET', message: 'Musisz ukończyć wymagane lekcje przed rozpoczęciem tej' }
          ], 403);
          return;
        }
      }
      
      const levelStats = LevelService.getUserLevelStats(user as unknown as IUser);
      
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

      res.success(response, 'Lekcja została pobrana');
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
}; 