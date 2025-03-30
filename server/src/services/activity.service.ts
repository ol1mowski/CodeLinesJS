// @ts-nocheck
import { User } from "../models/user.model.js";
import { ValidationError } from "../utils/errors.js";
import { LevelService } from "./level.service.js";
import { UpdateResult, ActivityResponse, StreakResponse, DailyProgressResponse, ActivityHistoryResponse } from "../types/ActivityModels.js";

export class ActivityService {
  static async findUserById(userId: string): Promise<any> {
    const user = await User.findById(userId);
    if (!user) {
      throw new ValidationError("Nie znaleziono użytkownika");
    }
    return user;
  }

  static async updateUserLevelAndActivity(userId: string, points: number, progress: any): Promise<UpdateResult> {
    const result = await LevelService.updateUserLevelAndStreak(userId, points, progress);
    
    const updatedUser = await this.findUserById(userId);
    
    return {
      level: result.level,
      streak: {
        streak: result.streak,
        bestStreak: updatedUser?.stats?.bestStreak || 0,
        streakUpdated: true,
        streakBroken: false,
        daysInactive: 0
      },
      dailyProgress: {
        dailyProgress: result.dailyProgress,
        totalTimeSpent: updatedUser?.stats?.totalTimeSpent || 0,
        completedChallenges: updatedUser?.stats?.completedChallenges || 0
      }
    };
  }

  static prepareActivityResponse(user: any, update: UpdateResult): ActivityResponse {
    const levelStats = LevelService.getUserLevelStats(user);
    
    return {
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
    };
  }

  static prepareStreakResponse(user: any): StreakResponse {
    const { streak = 0, bestStreak = 0 } = user.stats || {};

    return {
      status: "success",
      data: {
        streak,
        bestStreak,
      },
    };
  }

  static prepareDailyProgressResponse(user: any): DailyProgressResponse {
    const { dailyProgress = {} } = user.stats || {};
    const levelStats = LevelService.getUserLevelStats(user);

    return {
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
    };
  }

  static prepareActivityHistoryResponse(user: any): ActivityHistoryResponse {
    const { activityHistory = [] } = user.stats || {};

    return {
      status: "success",
      data: {
        activityHistory,
      },
    };
  }
}

export default new ActivityService(); 