import { User } from "../models/user.model.js";
import { Lesson, LearningPath } from "../models/index.js";
import { ValidationError } from "../utils/errors.js";
import { LevelService } from "../services/level.service.js";
import { StreakService } from "../services/streak.service.js";

export const updateProgress = async (req, res, next) => {
  try {
    const { lessonId } = req.body;
    const userId = req.user.userId;

    const lesson = await Lesson.findOne({ slug: lessonId });
    if (!lesson) throw new ValidationError("Lekcja nie znaleziona");

    const [user, learningPath] = await Promise.all([
      User.findById(userId),
      LearningPath.findOne({ lessons: { $in: [lesson._id] } }),
    ]);

    if (!user || !learningPath) {
      throw new ValidationError("Nie znaleziono użytkownika lub ścieżki nauki");
    }

    if (!user.stats.learningPaths) {
      user.stats.learningPaths = [];
    }

    let userPathIndex = user.stats.learningPaths.findIndex(
      path => path.pathId.toString() === learningPath._id.toString()
    );

    if (userPathIndex === -1) {
      user.stats.learningPaths.push({
        pathId: learningPath._id,
        status: "active",
        progress: {
          completedLessons: [{
            lessonId: lesson._id,
            completedAt: new Date()
          }],
          totalLessons: learningPath.totalLessons,
          lastLesson: lesson._id,
          lastActivity: new Date(),
          startedAt: new Date()
        }
      });
      userPathIndex = user.stats.learningPaths.length - 1;
    } else {
      const userPath = user.stats.learningPaths[userPathIndex];
      const isCompleted = userPath.progress.completedLessons.some(
        completedLesson => completedLesson.lessonId.toString() === lesson._id.toString()
      );

      if (isCompleted) {
        return res.status(400).json({ status: "error", message: "Lekcja została już ukończona" });
      }

      userPath.progress.completedLessons.push({
        lessonId: lesson._id,
        completedAt: new Date()
      });
      userPath.progress.lastLesson = lesson._id;
      userPath.progress.lastActivity = new Date();

      if (userPath.progress.completedLessons.length === learningPath.totalLessons) {
        userPath.status = "completed";
        userPath.progress.completedAt = new Date();
      }

      const earnedPoints = lesson.points || 0;
      const levelUpdate = await LevelService.updateUserLevel(user, earnedPoints);
      
      const timeSpent = lesson.duration || 0;
      await StreakService.updateUserActivity(user._id, true, {
        points: earnedPoints,
        challenges: 1,
        timeSpent: timeSpent
      });
    }

    user.markModified('stats.learningPaths');
    
    await user.save();

    const levelStats = LevelService.getUserLevelStats(user);
    const updatedPath = user.stats.learningPaths[userPathIndex];
    
    res.json({
      message: "Postęp zaktualizowany pomyślnie",
      stats: {
        points: levelStats.points,
        pointsRequired: levelStats.pointsToNextLevel,
        xp: user.stats.xp,
        level: levelStats.level,
        levelProgress: levelStats.progress,
        streak: user.stats.streak,
        bestStreak: user.stats.bestStreak,
        lastActive: user.stats.lastActive,
        pathProgress: {
          completedLessons: updatedPath.progress.completedLessons.length,
          totalLessons: learningPath.totalLessons,
          percentage: Math.round(
            (updatedPath.progress.completedLessons.length / learningPath.totalLessons) * 100
          ),
          status: updatedPath.status
        }
      }
    });
  } catch (error) {
    next(error);
  }
};


export const updateUserProgress = async (req, res, next) => {
  try {
    const { points, challenges, timeSpent } = req.body;
    const userId = req.user.userId;

    if (typeof points !== 'number' || points < 0) {
      throw new ValidationError("Nieprawidłowa wartość punktów");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new ValidationError("Nie znaleziono użytkownika");
    }

    const levelUpdate = await LevelService.updateUserLevel(user, points);

    const activityUpdate = await StreakService.updateUserActivity(user._id, true, {
      points,
      challenges: challenges || 0,
      timeSpent: timeSpent || 0
    });

    const levelStats = LevelService.getUserLevelStats(user);

    res.json({
      message: levelUpdate.leveledUp 
        ? `Punkty dodane! Awansowałeś na poziom ${levelUpdate.currentLevel}!` 
        : "Punkty użytkownika zaktualizowane pomyślnie",
      data: {
        userStats: {
          points: levelStats.points,
          pointsRequired: levelStats.pointsToNextLevel,
          xp: user.stats.xp,
          level: levelStats.level,
          levelProgress: levelStats.progress,
          streak: user.stats.streak,
          bestStreak: user.stats.bestStreak,
          lastActive: user.stats.lastActive,
          leveledUp: levelUpdate.leveledUp,
          levelsGained: levelUpdate.levelsGained
        },
        streak: {
          current: activityUpdate.streak.streak,
          best: activityUpdate.streak.bestStreak,
          updated: activityUpdate.streak.streakUpdated,
          broken: activityUpdate.streak.streakBroken
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
