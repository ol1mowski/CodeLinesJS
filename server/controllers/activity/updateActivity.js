import { User } from "../../models/user.model.js";
import { AuthError, ValidationError } from "../../utils/errors.js";
import { LevelService } from "../../services/level.service.js";

export const updateActivity = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError("Brak autoryzacji");

    const { points = 0, challenges = 0, timeSpent = 0 } = req.body;

    if (typeof points !== "number" || points < 0) {
      throw new ValidationError("Nieprawidłowa wartość punktów");
    }

    if (typeof challenges !== "number" || challenges < 0) {
      throw new ValidationError("Nieprawidłowa wartość wyzwań");
    }

    if (typeof timeSpent !== "number" || timeSpent < 0) {
      throw new ValidationError("Nieprawidłowa wartość czasu");
    }

    const user = await User.findById(userId);
    if (!user) throw new ValidationError("Nie znaleziono użytkownika");

    const update = await LevelService.updateUserLevelAndStreak(userId, points, {
      points,
      challenges,
      timeSpent,
    });

    const levelStats = LevelService.getUserLevelStats(user);

    res.json({
      status: "success",
      message: update.level.leveledUp
        ? `Aktywność zaktualizowana! Awansowałeś na poziom ${update.level.level}!`
        : "Aktywność zaktualizowana pomyślnie",
      data: {
        streak: {
          current: update.streak.streak,
          best: update.streak.bestStreak,
          updated: update.streak.streakUpdated,
          broken: update.streak.streakBroken,
          daysInactive: update.streak.daysInactive,
        },
        dailyProgress: {
          date: update.dailyProgress.dailyProgress.date,
          points: update.dailyProgress.dailyProgress.points,
          challenges: update.dailyProgress.dailyProgress.challenges,
          timeSpent: update.dailyProgress.dailyProgress.timeSpent,
        },
        level: {
          level: levelStats.level,
          points: levelStats.points,
          pointsRequired: levelStats.pointsToNextLevel,
          progress: levelStats.progress,
          leveledUp: update.level.leveledUp,
          levelsGained: update.level.levelsGained,
        },
        stats: {
          totalTimeSpent: update.dailyProgress.totalTimeSpent,
          completedChallenges: update.dailyProgress.completedChallenges,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}; 