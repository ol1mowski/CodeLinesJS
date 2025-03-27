import { Stats } from '../models/stats.model.js';
import LevelService from './level.service.js';

class StatsService {
  async updateStats(userId, updates) {
    const stats = await Stats.findOne({ userId });
    if (!stats) {
      throw new Error('Nie znaleziono statystyk użytkownika');
    }

    const lastActive = new Date(stats.lastActive);
    const today = new Date();
    const diffDays = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      stats.currentStreak += 1;
      stats.bestStreak = Math.max(stats.currentStreak, stats.bestStreak);
    } else if (diffDays > 1) {
      stats.currentStreak = 1;
    }

    const todayStr = today.toISOString().split('T')[0];
    const dailyIndex = stats.daily.findIndex(d => d.date === todayStr);

    if (dailyIndex >= 0) {
      stats.daily[dailyIndex].points += updates.points || 0;
      stats.daily[dailyIndex].challenges += updates.challenges || 0;
    } else {
      stats.daily.push({
        date: todayStr,
        points: updates.points || 0,
        challenges: updates.challenges || 0
      });
    }

    if (updates.points) {
      await LevelService.updateExperience(stats, updates.points);
    }

    Object.assign(stats, updates);
    stats.lastActive = today;

    return stats.save();
  }
}

export default new StatsService(); 