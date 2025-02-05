import RewardsService from './rewards.service.js';

export class LevelService {
  static XP_PER_LEVEL = 100;

  static calculatePointsToNextLevel(level) {
    return Math.floor(1000 * Math.pow(1.2, level - 1));
  }

  calculateLevelProgress(stats) {
    const { experiencePoints, level } = stats;
    let currentLevel = level;
    let currentXP = experiencePoints;
    let leveledUp = false;

    while (currentXP >= this.calculateNextLevelThreshold(currentLevel)) {
      currentXP -= this.calculateNextLevelThreshold(currentLevel);
      currentLevel++;
      leveledUp = true;
    }

    return {
      newLevel: currentLevel,
      remainingXP: currentXP,
      nextLevelThreshold: this.calculateNextLevelThreshold(currentLevel),
      leveledUp
    };
  }

  async updateExperience(stats, earnedXP) {
    const oldLevel = stats.level;
    stats.experiencePoints += earnedXP;
    const progress = this.calculateLevelProgress(stats);

    if (progress.leveledUp) {
      stats.level = progress.newLevel;
      stats.experiencePoints = progress.remainingXP;
      stats.nextLevelThreshold = progress.nextLevelThreshold;

      const { stats: updatedStats, rewards } = await RewardsService.processLevelUpRewards(
        stats,
        oldLevel,
        progress.newLevel
      );

      return {
        stats: updatedStats,
        levelUp: true,
        rewards
      };
    }

    return {
      stats,
      levelUp: false,
      rewards: null
    };
  }

  static async updateLevel(user) {
    while (user.stats.xp >= user.stats.pointsToNextLevel) {
      user.stats.xp -= user.stats.pointsToNextLevel;
      user.stats.level += 1;
      user.stats.pointsToNextLevel = this.calculatePointsToNextLevel(user.stats.level);
    }
  }
}

export default new LevelService(); 