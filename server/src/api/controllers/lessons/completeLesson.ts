import { Lesson } from "../../../models/lesson.model.js";
import { User } from "../../../models/user.model.js";
import { LevelService } from "../../../services/level.service.js";
import { IUser } from "../../../services/lesson/types.js";
import { NextFunction, Request, Response } from "express";

export const completeLessonController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
    
    const [lesson, user] = await Promise.all([
      Lesson.findOne({ _id: id }),
      User.findById(userId),
    ]);

    if (!lesson) {
      res.fail('Lekcja nie została znaleziona', [
        { code: 'LESSON_NOT_FOUND', message: 'Lekcja nie została znaleziona', field: 'id' }
      ], 404);
      return;
    }
    
    if (!user) {
      res.fail('Użytkownik nie został znaleziony', [
        { code: 'USER_NOT_FOUND', message: 'Użytkownik nie został znaleziony' }
      ], 404);
      return;
    }

    if (!user.stats?.learningPaths || user.stats.learningPaths.length === 0) {
      res.fail('Użytkownik nie ma przypisanych ścieżek nauki', [
        { code: 'NO_LEARNING_PATHS', message: 'Użytkownik nie ma przypisanych ścieżek nauki' }
      ]);
      return;
    }

    const userLearningPaths = user.stats.learningPaths[0].progress.completedLessons;

    const isCompleted = userLearningPaths.some(
      (completedLesson) => completedLesson._id.toString() === lesson._id.toString()
    );

    if (!isCompleted) {
      userLearningPaths.push({ _id: lesson._id, completedAt: new Date() });

      const earnedPoints = lesson.points || 0;
      const timeSpent = lesson.duration || 0;
      
      const update = await LevelService.updateUserLevelAndStreak(userId, earnedPoints, {
        points: earnedPoints,
        challenges: 1,
        timeSpent: timeSpent
      });

      await user.save();
      
      const levelStats = LevelService.getUserLevelStats(user as unknown as IUser);

      const streakData = typeof update.streak === 'object' ? update.streak : { streakUpdated: false };

      const message = update.level.leveledUp 
        ? `Lekcja ukończona! Awansowałeś na poziom ${update.level.level}!` 
        : 'Lekcja ukończona';

      res.success({
        stats: {
          points: levelStats.points,
          pointsRequired: levelStats.pointsToNextLevel,
          xp: user.stats.xp,
          level: levelStats.level,
          levelProgress: levelStats.progress,
          completedLessons: userLearningPaths.length,
          leveledUp: update.level.leveledUp,
          levelsGained: update.level.levelsGained,
          streak: user.stats.streak,
          bestStreak: user.stats.bestStreak,
          streakUpdated: streakData.streakUpdated
        }
      }, message);
      return;
    }

    const levelStats = LevelService.getUserLevelStats(user as unknown as IUser);
    
    res.success({
      stats: {
        points: levelStats.points,
        pointsRequired: levelStats.pointsToNextLevel,
        xp: user.stats.xp,
        level: levelStats.level,
        levelProgress: levelStats.progress,
        completedLessons: userLearningPaths.length,
        streak: user.stats.streak,
        bestStreak: user.stats.bestStreak
      }
    }, 'Lekcja została już wcześniej ukończona');
  } catch (error) {
    next(error);
  }
}; 