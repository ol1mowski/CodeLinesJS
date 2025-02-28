export class StreakService {
  /**
   * Aktualizuje streak użytkownika na podstawie jego ostatniej aktywności
   * @param {Object} user - Obiekt użytkownika z bazy danych
   * @param {boolean} hasEarnedPoints - Czy użytkownik zdobył punkty w danym dniu
   * @returns {Object} - Informacje o aktualizacji streaka
   */
  static updateStreak(user, hasEarnedPoints = false) {

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
    const diffTime = Math.abs(todayDate - lastActiveDate);
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

  /**
   * Aktualizuje dzienny postęp użytkownika
   * @param {Object} user - Obiekt użytkownika z bazy danych
   * @param {Object} progress - Obiekt z informacjami o postępie
   * @param {number} progress.points - Zdobyte punkty
   * @param {number} progress.challenges - Ukończone wyzwania
   * @param {number} progress.timeSpent - Czas spędzony na nauce (w minutach)
   * @returns {Object} - Informacje o aktualizacji dziennego postępu
   */
  static updateDailyProgress(user, progress = {}) {
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

  /**
   * Inicjalizuje dzienny postęp użytkownika, jeśli nie istnieje wpis na dzisiaj
   * @param {Object} user - Obiekt użytkownika z bazy danych
   * @returns {Object} - Informacje o inicjalizacji dziennego postępu
   */
  static initializeDailyProgress(user) {
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

  /**
   * Aktualizuje streak i dzienny postęp użytkownika w jednej operacji
   * @param {string} userId - ID użytkownika
   * @param {boolean} hasEarnedPoints - Czy użytkownik zdobył punkty (wpływa na aktualizację streaka)
   * @param {Object} progress - Obiekt z informacjami o postępie
   * @returns {Object} - Informacje o aktualizacji streaka i dziennego postępu
   */
  static async updateUserActivity(userId, hasEarnedPoints = false, progress = {}) {
    const { User } = await import('../models/user.model.js');
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('Nie znaleziono użytkownika');
    }

    this.initializeDailyProgress(user);
    user.markModified('stats');
    await user.save();

    const streakUpdate = this.updateStreak(user, hasEarnedPoints);
    user.markModified('stats');
    await user.save();

    const dailyUpdate = this.updateDailyProgress(user, progress);

    user.markModified('stats');
    await user.save();

    const updatedUser = await User.findById(userId);


    return {
      streak: streakUpdate,
      dailyProgress: dailyUpdate
    };
  }
}

export default new StreakService(); 