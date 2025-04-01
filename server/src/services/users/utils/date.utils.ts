/**
 * Pobiera dzisiejszą datę i wczorajszą datę w formacie string
 * @returns Obiekty z dzisiejszą i wczorajszą datą w formacie string
 */
export const getTodayAndYesterday = (): { todayStr: string; yesterdayStr: string } => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  return { todayStr, yesterdayStr };
};

/**
 * Oblicza aktualną serię dni aktywności użytkownika
 * @param dailyData Dane dzienne użytkownika
 * @returns Długość aktualnej serii
 */
export const calculateStreak = (dailyData: Array<{date?: string, points?: number}> = []): number => {
  if (!dailyData || dailyData.length === 0) return 0;
  
  // Sortowanie po dacie (najnowsze pierwsze)
  const sortedDays = [...dailyData]
    .filter(day => day.date && day.points && day.points > 0)
    .sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  
  if (sortedDays.length === 0) return 0;
  
  // Sprawdzenie czy ostatnia aktywność była dzisiaj lub wczoraj
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const lastActivity = sortedDays[0].date ? new Date(sortedDays[0].date) : null;
  if (!lastActivity) return 0;
  
  lastActivity.setHours(0, 0, 0, 0);
  
  const isActiveToday = lastActivity.getTime() === today.getTime();
  const isActiveYesterday = lastActivity.getTime() === yesterday.getTime();
  
  if (!isActiveToday && !isActiveYesterday) {
    return 0; // Seria przerwana - ostatnia aktywność starsza niż wczoraj
  }
  
  // Obliczanie serii
  let streak = 1; // Uwzględniamy dzisiejszy lub wczorajszy dzień
  let currentDate = new Date(lastActivity);
  
  for (let i = 1; i < sortedDays.length; i++) {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    
    const activityDate = sortedDays[i].date ? new Date(sortedDays[i].date) : null;
    if (!activityDate) continue;
    
    activityDate.setHours(0, 0, 0, 0);
    
    if (activityDate.getTime() === prevDate.getTime()) {
      streak++;
      currentDate = new Date(activityDate);
    } else {
      break; // Przerwa w serii
    }
  }
  
  return streak;
}; 