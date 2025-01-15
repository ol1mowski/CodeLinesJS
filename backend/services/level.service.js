class LevelService {
  calculateNextLevelThreshold(currentLevel) {
    return Math.floor(1000 * Math.pow(1.2, currentLevel - 1));
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
    stats.experiencePoints += earnedXP;
    const progress = this.calculateLevelProgress(stats);

    if (progress.leveledUp) {
      stats.level = progress.newLevel;
      stats.experiencePoints = progress.remainingXP;
      stats.nextLevelThreshold = progress.nextLevelThreshold;
    }

    return stats;
  }
}

export default new LevelService(); 