import { IUser } from '../types/index.d.js';

interface LevelUpdateResult {
  leveledUp: boolean;
  levelsGained: number;
  initialLevel: number;
  currentLevel: number;
  currentPoints: number;
  pointsToNextLevel: number;
  user: IUser;
}

interface LevelAndStreakResult {
  level: {
    level: number;
    points: number;
    pointsRequired: number;
    progress: number;
    leveledUp: boolean;
    levelsGained: number;
  };
  streak: number;
  dailyProgress: {
    date: string;
    points: number;
    challenges: number;
    timeSpent: number;
  };
}

interface LevelStats {
  level: number;
  points: number;
  pointsToNextLevel: number;
  progress: number;
}

export class LevelService {
  static XP_PER_LEVEL = 1000;
  static LEVEL_MULTIPLIER = 1.35;
  
  static calculatePointsToNextLevel(level: number): number {
    return Math.round(this.XP_PER_LEVEL * Math.pow(this.LEVEL_MULTIPLIER, level - 1));
  }

  static async updateUserLevel(user: IUser, earnedPoints = 0): Promise<LevelUpdateResult> {
    if (!user.stats) {
      user.stats = {
        points: 0,
        xp: 0,
        level: 1,
        pointsToNextLevel: this.calculatePointsToNextLevel(1)
      };
    }

    if (earnedPoints > 0) {
      user.stats.points = (user.stats.points || 0) + earnedPoints;
      user.stats.xp = (user.stats.xp || 0) + earnedPoints;
    }

    const initialLevel = user.stats.level || 1;
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
      initialLevel,
      currentLevel: user.stats.level,
      currentPoints: user.stats.points,
      pointsToNextLevel: user.stats.pointsToNextLevel,
      user
    };
  }

  static async updateUserLevelAndStreak(userId: string, earnedPoints = 0, progress: Record<string, any> = {}): Promise<LevelAndStreakResult> {
    const { User } = await import('../models/user.model.js');
    const { StreakService } = await import('./streak.service.js');
    
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error('Nie znaleziono użytkownika');
    }
    
    const hasEarnedPoints = earnedPoints > 0;
  
    
    const levelUpdate = await this.updateUserLevel(user as unknown as IUser, earnedPoints);
    
    user.markModified('stats');
    await user.save();
    
    const activityUpdate = await StreakService.updateUserActivity(userId, hasEarnedPoints, progress);
    
    const updatedUser = await User.findById(userId);
    
    const levelStats = this.getUserLevelStats(updatedUser as unknown as IUser);
    
    return {
      level: {
        level: levelStats.level,
        points: levelStats.points,
        pointsRequired: levelStats.pointsToNextLevel,
        progress: levelStats.progress,
        leveledUp: levelUpdate.leveledUp,
        levelsGained: levelUpdate.levelsGained
      },
      streak: activityUpdate.streak,
      dailyProgress: activityUpdate.dailyProgress
    };
  }

  static getUserLevelStats(user: IUser): LevelStats {
    const level = user.stats?.level || 1;
    const points = user.stats?.points || 0;
    const pointsToNextLevel = user.stats?.pointsToNextLevel || this.calculatePointsToNextLevel(level);
    
    return {
      level,
      points,
      pointsToNextLevel,
      progress: Math.round((points / pointsToNextLevel) * this.XP_PER_LEVEL)
    };
  }
}

export default new LevelService(); 