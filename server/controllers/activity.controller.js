import { User } from "../models/user.model.js";
import { AuthError, ValidationError } from "../utils/errors.js";
import { StreakService } from "../services/streak.service.js";
import { LevelService } from "../services/level.service.js";

/**
 * Aktualizuje aktywność użytkownika (streak i dzienny postęp)
 * @route POST /api/activity/update
 */
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

/**
 * Pobiera aktualny streak użytkownika
 * @route GET /api/activity/streak
 */
export const getStreak = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError("Brak autoryzacji");

    const user = await User.findById(userId).select("stats.streak stats.bestStreak stats.lastActive").lean();
    if (!user) throw new ValidationError("Nie znaleziono użytkownika");

    const lastActive = user.stats?.lastActive ? new Date(user.stats.lastActive) : null;
    let daysToBreak = 0;

    if (lastActive) {
      const lastActiveDate = new Date(lastActive.setHours(0, 0, 0, 0));
      const today = new Date();
      const todayDate = new Date(today.setHours(0, 0, 0, 0));
      const diffTime = Math.abs(todayDate - lastActiveDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      daysToBreak = diffDays <= 1 ? 1 : 0;
    }

    res.json({
      status: "success",
      data: {
        streak: user.stats?.streak || 0,
        bestStreak: user.stats?.bestStreak || 0,
        lastActive: user.stats?.lastActive || null,
        daysToBreak,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Pobiera dzienny postęp użytkownika
 * @route GET /api/activity/daily
 */
export const getDailyProgress = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError("Brak autoryzacji");

    const { date } = req.query;
    const dateToCheck = date || new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    const user = await User.findById(userId).select("stats.chartData.daily stats.daily").lean();
    if (!user) throw new ValidationError("Nie znaleziono użytkownika");

    const chartDataDaily = user.stats?.chartData?.daily || [];
    const chartDataEntry = chartDataDaily.find((d) => d.date === dateToCheck) || {
      date: dateToCheck,
      points: 0,
      timeSpent: 0,
    };

    const daily = user.stats?.daily || [];
    const dailyEntry = daily.find((d) => d.date === dateToCheck) || {
      date: dateToCheck,
      points: 0,
      challenges: 0,
    };

    res.json({
      status: "success",
      data: {
        date: dateToCheck,
        points: dailyEntry.points,
        challenges: dailyEntry.challenges,
        timeSpent: chartDataEntry.timeSpent,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Pobiera historię dziennego postępu użytkownika
 * @route GET /api/activity/history
 */
export const getActivityHistory = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError("Brak autoryzacji");

    const { limit = 30 } = req.query;
    const limitNumber = parseInt(limit);

    const user = await User.findById(userId).select("stats.chartData.daily stats.daily").lean();
    if (!user) throw new ValidationError("Nie znaleziono użytkownika");

    const chartDataDaily = user.stats?.chartData?.daily || [];
    const daily = user.stats?.daily || [];

    const datesMap = new Map();

    chartDataDaily.forEach((entry) => {
      datesMap.set(entry.date, {
        date: entry.date,
        points: entry.points || 0,
        timeSpent: entry.timeSpent || 0,
        challenges: 0,
      });
    });

    daily.forEach((entry) => {
      if (datesMap.has(entry.date)) {
        const existingEntry = datesMap.get(entry.date);
        existingEntry.challenges = entry.challenges || 0;
        existingEntry.points = entry.points || existingEntry.points;
      } else {
        datesMap.set(entry.date, {
          date: entry.date,
          points: entry.points || 0,
          timeSpent: 0,
          challenges: entry.challenges || 0,
        });
      }
    });

    const history = Array.from(datesMap.values())
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limitNumber);

    res.json({
      status: "success",
      data: history,
    });
  } catch (error) {
    next(error);
  }
}; 