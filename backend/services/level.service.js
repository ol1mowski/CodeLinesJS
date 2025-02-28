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