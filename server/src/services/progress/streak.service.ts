import { IUser, IStreakStats } from '../../types/progress/index.js';


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
  
  public static updateStreak(user: IUser): IStreakStats {
    const lastLoginDate = user.lastLogin ? new Date(user.lastLogin) : null;
    const currentDate = new Date();

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
} 