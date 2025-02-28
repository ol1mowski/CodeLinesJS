export class LevelService {
  static XP_PER_LEVEL = 1000;
  static LEVEL_MULTIPLIER = 1.35;

  /**
   @param {number} level 
   @returns {number}
   */
  static calculatePointsToNextLevel(level) {
    return Math.round(this.XP_PER_LEVEL * Math.pow(this.LEVEL_MULTIPLIER, level - 1));
  }

  /**
   @param {Object} user 
   @param {number} earnedPoints 
   @returns {Object}
   */
  static async updateUserLevel(user, earnedPoints = 0) {
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

  /**
   * Aktualizuje poziom użytkownika i jego streak w jednej operacji
   * @param {string} userId - ID użytkownika
   * @param {number} earnedPoints - Zdobyte punkty
   * @param {Object} progress - Obiekt z informacjami o postępie
   * @returns {Object} - Informacje o aktualizacji poziomu i streaka
   */
  static async updateUserLevelAndStreak(userId, earnedPoints = 0, progress = {}) {
    const { User } = await import('../models/user.model.js');
    const { StreakService } = await import('./streak.service.js');
    
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error('Nie znaleziono użytkownika');
    }
    
    const hasEarnedPoints = earnedPoints > 0;
    
    console.log('Przed aktualizacją:', { 
      userId, 
      streak: user.stats?.streak || 0, 
      bestStreak: user.stats?.bestStreak || 0,
      hasEarnedPoints
    });
    
    const levelUpdate = await this.updateUserLevel(user, earnedPoints);
    
    user.markModified('stats');
    await user.save();
    
    const activityUpdate = await StreakService.updateUserActivity(userId, hasEarnedPoints, progress);
    
    const updatedUser = await User.findById(userId);
    console.log('Po aktualizacji:', { 
      userId, 
      streak: updatedUser.stats?.streak || 0, 
      bestStreak: updatedUser.stats?.bestStreak || 0,
      hasEarnedPoints,
      activityUpdateStreak: activityUpdate.streak
    });
    
    const levelStats = this.getUserLevelStats(updatedUser);
    
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

  /**
   @param {Object} user 
   @returns {Object}
   */
  static getUserLevelStats(user) {
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