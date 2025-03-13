import { User } from "../../models/user.model.js";
import { AuthError, ValidationError } from "../../utils/errors.js";
import { LevelService } from "../../services/level.service.js";

export const getDailyProgress = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError("Brak autoryzacji");

    const user = await User.findById(userId);
    if (!user) throw new ValidationError("Nie znaleziono użytkownika");

    const { dailyProgress } = user.stats;
    const levelStats = LevelService.getUserLevelStats(user);

    res.json({
      status: "success",
      data: {
        dailyProgress,
        level: {
          level: levelStats.level,
          points: levelStats.points,
          pointsRequired: levelStats.pointsToNextLevel,
          progress: levelStats.progress,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}; 