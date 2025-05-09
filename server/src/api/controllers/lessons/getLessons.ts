import { Lesson } from "../../../models/lesson.model.js";
import { User } from "../../../models/user.model.js";
import { LevelService } from "../../../services/level.service.js";
import { IUser } from "../../../services/lesson/types.js";
import { Request, Response, NextFunction } from 'express';

export const getLessonsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, difficulty, search } = req.query;
    const userId = req.user?.userId;
    
    if (!userId) {
      res.fail('Brak identyfikatora użytkownika. Zaloguj się ponownie.', [
        { code: 'AUTH_REQUIRED', message: 'Brak autoryzacji' }
      ]);
      return;
    }

    const user = await User.findById(userId)
      .select("stats.learningPaths stats.level stats.points stats.pointsToNextLevel stats.streak stats.bestStreak")
      .lean();
      
    if (!user) {
      res.fail('Użytkownik nie został znaleziony', [
        { code: 'USER_NOT_FOUND', message: 'Użytkownik nie został znaleziony' }
      ], 404);
      return;
    }

    const query: {
      isPublished: boolean;
      isAvailable: boolean;
      category?: string;
      difficulty?: string;
      $or?: Array<{ 
        title?: { $regex: string; $options: string }; 
        description?: { $regex: string; $options: string };
      }>;
    } = {
      isPublished: true,
      isAvailable: true,
    };

    const usersCompletedLessons = user.stats?.learningPaths && user.stats.learningPaths.length > 0
      ? user.stats.learningPaths[0].progress.completedLessons
      : [];

    if (category) query.category = category as string;
    if (difficulty) query.difficulty = difficulty as string;
    if (search) {
      query.$or = [
        { title: { $regex: search as string, $options: "i" } },
        { description: { $regex: search as string, $options: "i" } },
      ];
    }

    const lessons = await Lesson.find(query)
      .select(
        "title description category difficulty duration points slug requirements requiredLevel"
      )
      .sort({ order: 1 })
      .lean();

    const formattedLessons = lessons.map((lesson) => {
      const isCompleted = usersCompletedLessons.some(
        (completedLesson) => completedLesson._id.toString() === lesson._id.toString()
      );

      return {
        id: lesson._id,
        title: lesson.title,
        description: lesson.description,
        category: lesson.category,
        difficulty: lesson.difficulty,
        duration: lesson.duration,
        points: lesson.points,
        slug: lesson.slug,
        requirements: lesson.requirements,
        requiredLevel: lesson.requiredLevel,
        isCompleted: isCompleted,
      };
    });

    const groupedLessons = formattedLessons.reduce((acc, lesson) => {
      if (!acc[lesson.category]) {
        acc[lesson.category] = [];
      }
      acc[lesson.category].push(lesson);
      return acc;
    }, {});

    const levelStats = LevelService.getUserLevelStats(user as unknown as IUser);

    res.success({
      lessons: groupedLessons,
      stats: {
        total: lessons.length,
        completed: usersCompletedLessons.length,
        progress: lessons.length ? Math.round((usersCompletedLessons.length / lessons.length) * 100) : 0,
        level: levelStats.level,
        points: levelStats.points,
        pointsRequired: levelStats.pointsToNextLevel,
        levelProgress: levelStats.progress,
        streak: user.stats?.streak || 0,
        bestStreak: user.stats?.bestStreak || 0
      }
    }, 'Lekcje zostały pobrane');
  } catch (error) {
    next(error);
  }
}; 