import { IUser, ILevelStats } from '../../types/progress/index.js';

export class LevelService {
  private static readonly BASE_XP = 100;
  private static readonly XP_SCALING_FACTOR = 1.5;
  
  public static getRequiredPointsForLevel(level: number): number {
    return Math.floor(this.BASE_XP * Math.pow(this.XP_SCALING_FACTOR, level - 1));
  }
  
  public static getLevelFromPoints(points: number): number {
    let level = 1;
    let requiredPoints = this.getRequiredPointsForLevel(level);
    
    while (points >= requiredPoints) {
      level++;
      requiredPoints += this.getRequiredPointsForLevel(level);
    }
    
    return level;
  }
  
  public static getPointsToNextLevel(points: number, level: number): number {
    let totalPointsRequired = 0;
    
    for (let i = 1; i <= level; i++) {
      totalPointsRequired += this.getRequiredPointsForLevel(i);
    }
    
    return totalPointsRequired - points;
  }
  
  public static getLevelProgress(points: number, level: number): number {
    const currentLevelPoints = this.getRequiredPointsForLevel(level);
    const pointsToNextLevel = this.getPointsToNextLevel(points, level);
    
    const progress = 100 - (pointsToNextLevel / currentLevelPoints) * 100;
    return Math.max(0, Math.min(100, Math.round(progress)));
  }
  
  public static getUserLevelStats(user: IUser): ILevelStats {
    const points = user.stats.points || 0;
    const level = user.stats.level || 1;
    const pointsToNextLevel = this.getPointsToNextLevel(points, level);
    const progress = this.getLevelProgress(points, level);
    
    return {
      level,
      points,
      pointsToNextLevel,
      progress
    };
  }
  
  public static updateLevel(user: IUser, earnedPoints: number): ILevelStats {
    const currentPoints = user.stats.points || 0;
    const currentLevel = user.stats.level || 1;
    
    user.stats.points = currentPoints + earnedPoints;
    
    const newLevel = this.getLevelFromPoints(user.stats.points);
    const leveledUp = newLevel > currentLevel;
    const levelsGained = leveledUp ? newLevel - currentLevel : 0;
    
    if (leveledUp) {
      user.stats.level = newLevel;
    }
    
    const pointsToNextLevel = this.getPointsToNextLevel(user.stats.points, newLevel);
    const progress = this.getLevelProgress(user.stats.points, newLevel);
    
    return {
      level: newLevel,
      points: user.stats.points,
      pointsToNextLevel,
      progress,
      leveledUp,
      levelsGained
    };
  }
} 