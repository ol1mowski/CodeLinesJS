import { IUser } from '../../../types/index.d.js';
import { DailyStatsDTO } from '../types.js';
import { isConsecutiveDay } from './date.utils.js';

export interface StreakResult {
  streak: number;
  bestStreak: number;
  streakUpdated: boolean;
  streakBroken?: boolean;
}

export const updateStreakStats = (
  currentStreak: number,
  bestStreak: number,
  lastActive: Date | null,
  today: Date
): StreakResult => {
  if (!lastActive) {
    return {
      streak: 1,
      bestStreak: 1,
      streakUpdated: true
    };
  }

  if (isConsecutiveDay(today, lastActive)) {
    const newStreak = currentStreak + 1;
    const newBestStreak = Math.max(newStreak, bestStreak);
    
    return {
      streak: newStreak,
      bestStreak: newBestStreak,
      streakUpdated: true
    };
  }
  
  const isSameDay = today.toISOString().split('T')[0] === lastActive.toISOString().split('T')[0];
  
  if (!isSameDay) {
    return {
      streak: 1,
      bestStreak,
      streakUpdated: true,
      streakBroken: currentStreak > 1
    };
  }
  
  return {
    streak: currentStreak,
    bestStreak,
    streakUpdated: false
  };
};

export const calculateStreak = (dailyStats: DailyStatsDTO[]): number => {
  if (!dailyStats || dailyStats.length === 0) {
    return 0;
  }

  const sortedStats = [...dailyStats].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const today = new Date().toISOString().split('T')[0];
  const mostRecentDate = sortedStats[0].date;
  
  if (mostRecentDate !== today && mostRecentDate !== new Date(Date.now() - 86400000).toISOString().split('T')[0]) {
    return 0;
  }
  
  let streak = 1;
  let currentDate = new Date(sortedStats[0].date);
  
  for (let i = 1; i < sortedStats.length; i++) {
    const prevDate = new Date(sortedStats[i].date);
    
    if (isConsecutiveDay(prevDate, currentDate)) {
      streak++;
      currentDate = prevDate;
    } else {
      break;
    }
  }
  
  return streak;
}; 