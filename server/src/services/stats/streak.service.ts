import { IUser } from '../../types/index.d.js';
import { getTodayString } from './utils/date.utils.js';
import { calculateStreak, updateStreakStats, StreakResult } from './utils/streak.utils.js';
import { DailyStatsDTO } from './types.js';

export class StreakService {
  static updateUserStreak(user: IUser): StreakResult {
    if (!user.stats) {
      user.stats = {
        streak: 0,
        bestStreak: 0,
        lastActive: new Date()
      };
    }

    const today = new Date();
    const lastActive = user.stats.lastActive ? new Date(user.stats.lastActive) : null;
    
    const streakResult = updateStreakStats(
      user.stats.streak || 0,
      user.stats.bestStreak || 0,
      lastActive,
      today
    );
    
    if (streakResult.streakUpdated) {
      user.stats.streak = streakResult.streak;
      user.stats.bestStreak = streakResult.bestStreak;
      user.stats.lastActive = today;
    }
    
    return streakResult;
  }
  
  static calculateUserStreak(dailyStats: DailyStatsDTO[]): number {
    return calculateStreak(dailyStats);
  }
  
  static checkDailyActivity(user: IUser): boolean {
    if (!user.stats?.lastActive) {
      return false;
    }
    
    const today = getTodayString();
    const lastActiveDate = new Date(user.stats.lastActive).toISOString().split('T')[0];
    
    return lastActiveDate === today;
  }
} 