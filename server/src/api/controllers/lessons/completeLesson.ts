import { Lesson } from "../../../models/lesson.model.js";
import { User } from "../../../models/user.model.js";
import { ValidationError } from "../../../utils/errors.js";
import { LevelService } from "../../../services/level.service.js";
import { IUser } from "../../../services/lesson/types.js";
import { NextFunction, Request, Response } from "express";

export const completeLessonController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    const [lesson, user] = await Promise.all([
      Lesson.findOne({ _id: id }),
      User.findById(userId),
    ]);

    if (!lesson) {
      throw new ValidationError("Lekcja nie została znaleziona");
    }

    if (!user.stats.learningPaths || user.stats.learningPaths.length === 0) {
      throw new ValidationError("Użytkownik nie ma przypisanych ścieżek nauki");
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

      return res.json({
        message: update.level.leveledUp 
          ? `Lekcja ukończona! Awansowałeś na poziom ${update.level.level}!` 
          : 'Lekcja ukończona',
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
        },
      });
    }

    const levelStats = LevelService.getUserLevelStats(user as unknown as IUser);
    
    res.json({
      message: 'Lekcja została już wcześniej ukończona',
      stats: {
        points: levelStats.points,
        pointsRequired: levelStats.pointsToNextLevel,
        xp: user.stats.xp,
        level: levelStats.level,
        levelProgress: levelStats.progress,
        completedLessons: userLearningPaths.length,
        streak: user.stats.streak,
        bestStreak: user.stats.bestStreak
      },
    });
  } catch (error) {
    next(error);
  }
}; 