import { User } from "../../../models/user.model.js";
import { LevelService } from "../../../services/level.service.js";

export const updateStreakController = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    
    const user = await User.findById(userId);
    
    const lastLoginDate = user.lastLogin ? new Date(user.lastLogin) : null;
    const currentDate = new Date();
    
    if (!lastLoginDate) {
      user.stats.streak = 1;
      user.stats.bestStreak = 1;
      user.lastLogin = currentDate;
      await user.save();
      
      return res.json({
        message: "Pierwszy dzień nauki! Rozpoczęto pasmo sukcesów.",
        streak: 1,
        bestStreak: 1,
        streakUpdated: true
      });
    }
    
    const lastLoginDay = lastLoginDate.getDate();
    const lastLoginMonth = lastLoginDate.getMonth();
    const lastLoginYear = lastLoginDate.getFullYear();
    
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const isConsecutiveDay = 
      (currentDay - lastLoginDay === 1 && currentMonth === lastLoginMonth && currentYear === lastLoginYear) ||
      (currentDay === 1 && lastLoginDay === LevelService.getDaysInMonth(lastLoginMonth, lastLoginYear) && 
        ((currentMonth - lastLoginMonth === 1 && currentYear === lastLoginYear) || 
         (currentMonth === 0 && lastLoginMonth === 11 && currentYear - lastLoginYear === 1)));
    
    const isSameDay = 
      currentDay === lastLoginDay && 
      currentMonth === lastLoginMonth && 
      currentYear === lastLoginYear;
    
    if (isConsecutiveDay && !isSameDay) {
      user.stats.streak += 1;
      
      if (user.stats.streak > user.stats.bestStreak) {
        user.stats.bestStreak = user.stats.streak;
      }
      
      user.lastLogin = currentDate;
      await user.save();
      
      return res.json({
        message: `Świetnie! Twoje pasmo sukcesów wynosi teraz ${user.stats.streak} dni!`,
        streak: user.stats.streak,
        bestStreak: user.stats.bestStreak,
        streakUpdated: true
      });
    } else if (!isSameDay) {
      user.stats.streak = 1;
      user.lastLogin = currentDate;
      await user.save();
      
      return res.json({
        message: "Rozpoczęto nowe pasmo sukcesów!",
        streak: 1,
        bestStreak: user.stats.bestStreak,
        streakUpdated: true
      });
    }
    
    res.json({
      message: "Pasmo sukcesów nie zostało zaktualizowane",
      streak: user.stats.streak,
      bestStreak: user.stats.bestStreak,
      streakUpdated: false
    });
  } catch (error) {
    next(error);
  }
}; 