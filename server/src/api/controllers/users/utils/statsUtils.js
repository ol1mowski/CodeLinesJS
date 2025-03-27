export const updateStreakStats = async (user, currentStreak) => {
  const bestStreak = Math.max(currentStreak, user.stats.bestStreak || 0);
  
  if (user.stats.streak !== currentStreak || user.stats.bestStreak !== bestStreak) {
    user.stats.streak = currentStreak;
    user.stats.bestStreak = bestStreak;
    user.markModified('stats');
    await user.save();
  }
  
  return { currentStreak, bestStreak };
};

export const initializeDailyStats = (chartData, today) => {
  if (!chartData) {
    return {
      date: today,
      points: 0,
      timeSpent: 0
    };
  }
  
  const todayStats = chartData.daily.find(d => d.date === today);
  if (!todayStats) {
    return {
      date: today,
      points: 0,
      timeSpent: 0
    };
  }
  
  return todayStats;
}; 