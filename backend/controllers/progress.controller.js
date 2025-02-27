import { User } from "../models/user.model.js";
import { Lesson, LearningPath } from "../models/index.js";
import { ValidationError } from "../utils/errors.js";
import LevelService from "../services/level.service.js";

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

      user.stats.points = (user.stats.points || 0) + (lesson.points || 0);
      user.stats.xp = (user.stats.xp || 0) + (lesson.points || 0);
      
      const today = new Date().toDateString();
      const lastActive = user.stats.lastActive
        ? new Date(user.stats.lastActive).toDateString()
        : null;

      if (today !== lastActive) {
        user.stats.streak = (user.stats.streak || 0) + 1;
        user.stats.bestStreak = Math.max(
          user.stats.streak,
          user.stats.bestStreak || 0
        );
      }

      // Sprawdzenie, czy użytkownik może awansować na kolejny poziom
      const currentLevel = user.stats.level || 1;
      const pointsToNextLevel = currentLevel * 100;

      if (user.stats.points >= pointsToNextLevel && user.stats.level < Math.floor(user.stats.points / 100) + 1) {
        user.stats.level = Math.floor(user.stats.points / 100) + 1;
      }

      await LevelService.updateLevel(user);
    }

    user.markModified('stats.learningPaths');
    
    await user.save();

    const updatedPath = user.stats.learningPaths[userPathIndex];
    res.json({
      message: "Postęp zaktualizowany pomyślnie",
      stats: {
        points: user.stats.points,
        xp: user.stats.xp,
        level: user.stats.level,
        streak: user.stats.streak,
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
    const { points } = req.body;
    const userId = req.user.userId;

    if (typeof points !== 'number' || points < 0) {
      throw new ValidationError("Nieprawidłowa wartość punktów");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new ValidationError("Nie znaleziono użytkownika");
    }

    const currentPoints = user.stats.points || 0;
    const newPoints = currentPoints + points;
    
    user.stats.points = newPoints;
    user.stats.xp = (user.stats.xp || 0) + points;

    const today = new Date().toDateString();
    const lastActive = user.stats.lastActive
      ? new Date(user.stats.lastActive).toDateString()
      : null;

    if (today !== lastActive) {
      user.stats.streak = (user.stats.streak || 0) + 1;
      user.stats.bestStreak = Math.max(user.stats.streak, user.stats.bestStreak || 0);
    }

    user.stats.lastActive = new Date();

    user.markModified('stats');

    await user.save();

    res.json({
      message: "Punkty użytkownika zaktualizowane pomyślnie",
      data: {
        userStats: {
          points: user.stats.points,
          xp: user.stats.xp,
          streak: user.stats.streak,
          lastActive: user.stats.lastActive
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
