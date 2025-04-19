import { IUser } from '../../types/index.d.js';

import { LevelUpdateResult } from './types.js';

export class LevelService {
  private static readonly XP_PER_LEVEL = 1000;
  private static readonly LEVEL_MULTIPLIER = 1.35;

  static calculatePointsToNextLevel(level: number): number {
    return Math.round(this.XP_PER_LEVEL * Math.pow(this.LEVEL_MULTIPLIER, level - 1));
  }

  static getUserLevelStats(user: IUser): {
    level: number;
    points: number;
    pointsToNextLevel: number;
    progress: number;
  } {
    const level = user.stats?.level || 1;
    const points = user.stats?.points || 0;
    const pointsToNextLevel =
      user.stats?.pointsToNextLevel || this.calculatePointsToNextLevel(level);

    return {
      level,
      points,
      pointsToNextLevel,
      progress: Math.round((points / pointsToNextLevel) * 100),
    };
  }

  static async updateUserLevel(user: IUser, earnedPoints = 0): Promise<LevelUpdateResult> {
    if (!user.stats) {
      user.stats = {
        points: 0,
        xp: 0,
        level: 1,
        pointsToNextLevel: this.calculatePointsToNextLevel(1),
      };
    }

    if (earnedPoints > 0) {
      user.stats.points = (user.stats.points || 0) + earnedPoints;
      user.stats.xp = (user.stats.xp || 0) + earnedPoints;
    }

    let leveledUp = false;
    let levelsGained = 0;

    if (!user.stats.pointsToNextLevel) {
      user.stats.pointsToNextLevel = this.calculatePointsToNextLevel(user.stats.level || 1);
    }

    while (user.stats.points >= user.stats.pointsToNextLevel) {
      user.stats.points -= user.stats.pointsToNextLevel;

      user.stats.level = (user.stats.level || 1) + 1;
      levelsGained++;
      leveledUp = true;

      user.stats.pointsToNextLevel = this.calculatePointsToNextLevel(user.stats.level);
    }

    return {
      leveledUp,
      levelsGained,
    };
  }
}
