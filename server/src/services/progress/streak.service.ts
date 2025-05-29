import { IUser, IStreakStats } from '../../types/progress/index.js';

interface ProgressData {
  points?: number;
  timeSpent?: number;
  challenges?: number;
  [key: string]: any;
}

interface DailyProgressResult {
  dailyProgress: {
    date: string;
    points: number;
    challenges: number;
    timeSpent: number;
  };
  totalTimeSpent?: number;
  completedChallenges?: number;
}

export class StreakService {
  private static isConsecutiveDay(currentDate: Date, referenceDate: Date): boolean {
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const referenceDay = referenceDate.getDate();
    const referenceMonth = referenceDate.getMonth();
    const referenceYear = referenceDate.getFullYear();
    
    const isNextDaySameMonth = 
      currentDay - referenceDay === 1 && 
      currentMonth === referenceMonth && 
      currentYear === referenceYear;
    
    const isFirstDayNextMonth = 
      currentDay === 1 && 
      referenceDay === this.getDaysInMonth(referenceMonth, referenceYear) && 
      ((currentMonth - referenceMonth === 1 && currentYear === referenceYear) || 
       (currentMonth === 0 && referenceMonth === 11 && currentYear - referenceYear === 1));
    
    return isNextDaySameMonth || isFirstDayNextMonth;
  }
  
  private static isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() && 
      date1.getMonth() === date2.getMonth() && 
      date1.getFullYear() === date2.getFullYear()
    );
  }

  public static getDaysInMonth(month: number, year: number): number {
    return new Date(year, month + 1, 0).getDate();
  }
  
  public static updateStreak(user: IUser, hasEarnedPoints = false): IStreakStats {
    const lastLoginDate = user.lastLogin ? new Date(user.lastLogin) : null;
    const currentDate = new Date();

    if (!hasEarnedPoints) {
      return {
        streak: user.stats.streak || 0,
        bestStreak: user.stats.bestStreak || 0,
        streakUpdated: false
      };
    }

    if (!lastLoginDate) {
      user.stats.streak = 1;
      user.stats.bestStreak = 1;
      user.lastLogin = currentDate;
      
      return {
        streak: 1,
        bestStreak: 1,
        streakUpdated: true
      };
    }
    
    const isConsecutiveDay = this.isConsecutiveDay(currentDate, lastLoginDate);
    const isSameDay = this.isSameDay(currentDate, lastLoginDate);
    
    if (isConsecutiveDay && !isSameDay) {
      user.stats.streak += 1;
      
      if (user.stats.streak > user.stats.bestStreak) {
        user.stats.bestStreak = user.stats.streak;
      }
      
      user.lastLogin = currentDate;
      
      return {
        streak: user.stats.streak,
        bestStreak: user.stats.bestStreak,
        streakUpdated: true
      };
    } 
    else if (!isSameDay) {
      const streakBroken = user.stats.streak > 1;
      user.stats.streak = 1;
      user.lastLogin = currentDate;
      
      return {
        streak: 1,
        bestStreak: user.stats.bestStreak,
        streakUpdated: true,
        streakBroken
      };
    }
    
    return {
      streak: user.stats.streak,
      bestStreak: user.stats.bestStreak,
      streakUpdated: false
    };
  }

  public static updateDailyProgress(user: IUser, progress: ProgressData = {}): DailyProgressResult {
    if (!user.stats) {
      user.stats = {
        streak: 0,
        bestStreak: 0,
        points: 0,
        level: 1,
        completedChallenges: 0,
        timeSpent: 0,
        learningPaths: []
      } as any;
    }

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    const stats = user.stats as any;

    if (!stats.chartData) {
      stats.chartData = { daily: [] };
    }

    if (!stats.chartData.daily) {
      stats.chartData.daily = [];
    }

    let dailyChartIndex = stats.chartData.daily.findIndex(d => d.date === todayStr);

    if (dailyChartIndex >= 0) {
      stats.chartData.daily[dailyChartIndex].points += progress.points || 0;
      stats.chartData.daily[dailyChartIndex].timeSpent += progress.timeSpent || 0;
    } else {
      stats.chartData.daily.push({
        date: todayStr,
        points: progress.points || 0,
        timeSpent: progress.timeSpent || 0
      });
    }

    if (!stats.daily) {
      stats.daily = [];
    }

    let dailyIndex = stats.daily.findIndex(d => d.date === todayStr);

    if (dailyIndex >= 0) {
      stats.daily[dailyIndex].points += progress.points || 0;
      stats.daily[dailyIndex].challenges += progress.challenges || 0;
    } else {
      stats.daily.push({
        date: todayStr,
        points: progress.points || 0,
        challenges: progress.challenges || 0
      });
    }

    if (progress.timeSpent) {
      stats.totalTimeSpent = (stats.totalTimeSpent || 0) + progress.timeSpent;
    }

    if (progress.challenges) {
      user.stats.completedChallenges = (user.stats.completedChallenges || 0) + progress.challenges;
    }

    return {
      dailyProgress: {
        date: todayStr,
        points: progress.points || 0,
        challenges: progress.challenges || 0,
        timeSpent: progress.timeSpent || 0
      },
      totalTimeSpent: stats.totalTimeSpent,
      completedChallenges: user.stats.completedChallenges
    };
  }
} 