// @ts-nocheck
import { IUser } from '../types/index.d.js';

interface Reward {
  badges: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
  bonusPoints: number;
  unlockedFeatures: string[];
}

interface RewardResult {
  stats: IUser['stats'];
  rewards: Reward;
}

class RewardsService {
  getLevelRewards(level: number): Reward {
    const baseRewards: Reward = {
      badges: [],
      bonusPoints: 0,
      unlockedFeatures: []
    };

    if (level === 5) {
      baseRewards.badges.push({
        id: 'beginner_master',
        name: 'Początkujący Mistrz',
        icon: '🎯'
      });
      baseRewards.bonusPoints = 500;
    }

    if (level === 10) {
      baseRewards.badges.push({
        id: 'code_warrior',
        name: 'Wojownik Kodu',
        icon: '⚔️'
      });
      baseRewards.bonusPoints = 1000;
      baseRewards.unlockedFeatures.push('custom_themes');
    }

    if (level === 20) {
      baseRewards.badges.push({
        id: 'js_master',
        name: 'Mistrz JavaScript',
        icon: '👑'
      });
      baseRewards.bonusPoints = 2000;
      baseRewards.unlockedFeatures.push('create_challenges');
    }

    return baseRewards;
  }

  async processLevelUpRewards(stats: IUser['stats'], oldLevel: number, newLevel: number): Promise<RewardResult> {
    const rewards: Reward = {
      badges: [],
      bonusPoints: 0,
      unlockedFeatures: []
    };

    for (let level = oldLevel + 1; level <= newLevel; level++) {
      const levelRewards = this.getLevelRewards(level);
      rewards.badges.push(...levelRewards.badges);
      rewards.bonusPoints += levelRewards.bonusPoints;
      rewards.unlockedFeatures.push(...levelRewards.unlockedFeatures);
    }

    if (rewards.badges.length > 0) {
      stats.badges = [...(stats.badges || []), ...rewards.badges];
    }

    if (rewards.bonusPoints > 0) {
      stats.experiencePoints += rewards.bonusPoints;
    }

    if (rewards.unlockedFeatures.length > 0) {
      stats.unlockedFeatures = [
        ...(stats.unlockedFeatures || []),
        ...rewards.unlockedFeatures
      ];
    }

    return { stats, rewards };
  }
}

export default new RewardsService(); 