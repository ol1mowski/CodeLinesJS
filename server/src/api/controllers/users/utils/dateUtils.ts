// @ts-nocheck
export const getTodayAndYesterday = () => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  return { todayStr, yesterdayStr };
};

export const calculateStreak = (dailyData) => {
  if (!dailyData?.length) return 0;

  const sortedDays = [...dailyData].sort((a, b) => new Date(b.date) - new Date(a.date));
  const { todayStr, yesterdayStr } = getTodayAndYesterday();
  const latestEntry = sortedDays[0];
  
  if (!latestEntry || (latestEntry.date !== todayStr && latestEntry.date !== yesterdayStr)) {
    return 0;
  }

  let streak = 0;
  let expectedDate = new Date(latestEntry.date);

  for (const entry of sortedDays) {
    const expectedDateStr = expectedDate.toISOString().split('T')[0];

    if (entry.date === expectedDateStr && entry.points > 0) {
      streak++;
      expectedDate.setDate(expectedDate.getDate() - 1);
    } else if (entry.date === expectedDateStr && entry.points === 0) {
      break;
    } else if (entry.date !== expectedDateStr) {
      break;
    }
  }

  return streak;
}; 