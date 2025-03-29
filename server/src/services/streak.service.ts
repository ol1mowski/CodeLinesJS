import { IUser } from '../types/index.d.js';

interface ProgressData {
  points?: number;
  timeSpent?: number;
  challenges?: number;
  [key: string]: any;
}

interface StreakResult {
  streak: number;
  bestStreak: number;
  streakUpdated: boolean;
  streakBroken: boolean;
  daysInactive: number;
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

interface ActivityResult extends StreakResult {
  dailyProgress: {
    date: string;
    points: number;
    challenges: number;
    timeSpent: number;
  };
  [key: string]: any;
}

export class StreakService {
  static updateStreak(user: IUser, hasEarnedPoints = false): StreakResult {

    if (!user.stats) {
      user.stats = {
        streak: 0,
        bestStreak: 0,
        lastActive: new Date(),
        chartData: {
          daily: []
        },
        daily: []
      };
    }

    const today = new Date();
    const lastActive = user.stats.lastActive ? new Date(user.stats.lastActive) : null;


    if (!hasEarnedPoints) {
      if (lastActive) {
        const lastActiveDate = new Date(lastActive.setHours(0, 0, 0, 0));
        const todayDate = new Date(today.setHours(0, 0, 0, 0));

        if (todayDate > lastActiveDate) {
          user.stats.lastActive = today;
        }
      } else {
        user.stats.lastActive = today;
      }


      return {
        streak: user.stats.streak || 0,
        bestStreak: user.stats.bestStreak || 0,
        streakUpdated: false,
        streakBroken: false,
        daysInactive: 0
      };
    }

    if (!lastActive) {
      user.stats.streak = 1;
      user.stats.bestStreak = 1;
      user.stats.lastActive = today;


      return {
        streak: 1,
        bestStreak: 1,
        streakUpdated: true,
        streakBroken: false,
        daysInactive: 0
      };
    }

    const lastActiveDate = new Date(lastActive.setHours(0, 0, 0, 0));
    const todayDate = new Date(today.setHours(0, 0, 0, 0));
    const diffTime = Math.abs(todayDate.getTime() - lastActiveDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


    if (diffDays === 0) {

      return {
        streak: user.stats.streak || 0,
        bestStreak: user.stats.bestStreak || 0,
        streakUpdated: false,
        streakBroken: false,
        daysInactive: 0
      };
    }

    if (diffDays === 1) {
      user.stats.streak = (user.stats.streak || 0) + 1;
      user.stats.bestStreak = Math.max(user.stats.streak, user.stats.bestStreak || 0);
      user.stats.lastActive = today;

      return {
        streak: user.stats.streak,
        bestStreak: user.stats.bestStreak,
        streakUpdated: true,
        streakBroken: false,
        daysInactive: 0
      };
    }

    user.stats.streak = 1;
    user.stats.lastActive = today;


    return {
      streak: 1,
      bestStreak: user.stats.bestStreak || 0,
      streakUpdated: true,
      streakBroken: true,
      daysInactive: diffDays
    };
  }

  static updateDailyProgress(user: IUser, progress: ProgressData = {}): DailyProgressResult {
    if (!user.stats) {
      user.stats = {
        streak: 0,
        bestStreak: 0,
        lastActive: new Date(),
        chartData: {
          daily: []
        },
        daily: []
      };
    }

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    if (!user.stats.chartData) {
      user.stats.chartData = { daily: [] };
    }

    if (!user.stats.chartData.daily) {
      user.stats.chartData.daily = [];
    }

    let dailyChartIndex = user.stats.chartData.daily.findIndex(d => d.date === todayStr);

    if (dailyChartIndex >= 0) {
      user.stats.chartData.daily[dailyChartIndex].points += progress.points || 0;
      user.stats.chartData.daily[dailyChartIndex].timeSpent += progress.timeSpent || 0;
    } else {
      user.stats.chartData.daily.push({
        date: todayStr,
        points: progress.points || 0,
        timeSpent: progress.timeSpent || 0
      });
    }

    if (!user.stats.daily) {
      user.stats.daily = [];
    }

    let dailyIndex = user.stats.daily.findIndex(d => d.date === todayStr);

    if (dailyIndex >= 0) {
      user.stats.daily[dailyIndex].points += progress.points || 0;
      user.stats.daily[dailyIndex].challenges += progress.challenges || 0;
    } else {
      user.stats.daily.push({
        date: todayStr,
        points: progress.points || 0,
        challenges: progress.challenges || 0
      });
    }

    if (progress.timeSpent) {
      user.stats.totalTimeSpent = (user.stats.totalTimeSpent || 0) + progress.timeSpent;
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
      totalTimeSpent: user.stats.totalTimeSpent,
      completedChallenges: user.stats.completedChallenges
    };
  }

  static initializeDailyProgress(user: IUser): { date: string; initialized: boolean } {
    if (!user.stats) {
      user.stats = {
        streak: 0,
        bestStreak: 0,
        lastActive: new Date(),
        chartData: {
          daily: []
        },
        daily: []
      };
    }

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    if (!user.stats.chartData) {
      user.stats.chartData = { daily: [] };
    }

    if (!user.stats.chartData.daily) {
      user.stats.chartData.daily = [];
    }

    let dailyChartIndex = user.stats.chartData.daily.findIndex(d => d.date === todayStr);

    if (dailyChartIndex < 0) {
      user.stats.chartData.daily.push({
        date: todayStr,
        points: 0,
        timeSpent: 0
      });
    }

    if (!user.stats.daily) {
      user.stats.daily = [];
    }

    let dailyIndex = user.stats.daily.findIndex(d => d.date === todayStr);

    if (dailyIndex < 0) {
      user.stats.daily.push({
        date: todayStr,
        points: 0,
        challenges: 0
      });
    }

    return {
      date: todayStr,
      initialized: true
    };
  }

  static async updateUserActivity(userId: string, hasEarnedPoints = false, progress: ProgressData = {}): Promise<ActivityResult> {
    const { User } = await import('../models/user.model.js');
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('Nie znaleziono użytkownika');
    }

    this.initializeDailyProgress(user as unknown as IUser);
    user.markModified('stats');
    await user.save();

    const streakUpdate = this.updateStreak(user as unknown as IUser, hasEarnedPoints);
    user.markModified('stats');
    await user.save();

    const dailyUpdate = this.updateDailyProgress(user as unknown as IUser, progress);

    user.markModified('stats');
    await user.save();

    return {
      ...streakUpdate,
      dailyProgress: dailyUpdate.dailyProgress
    };
  }
}

export default new StreakService(); 