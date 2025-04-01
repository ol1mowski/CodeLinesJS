import { Response, NextFunction } from 'express';
import { StreakService } from '../../../services/progress/index.js';
import { IUserRequest } from '../../../types/progress/index.js';
import { User } from '../../../models/user.model.js';
import { ValidationError } from '../../../utils/errors.js';

export const updateStreakController = async (
  req: IUserRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user.userId;
    
    const userDoc = await User.findById(userId);
    
    if (!userDoc) {
      throw new ValidationError("Użytkownik nie znaleziony");
    }
    
    const user = userDoc as any;
    
    const streakStats = StreakService.updateStreak(user);
    
    await userDoc.save();
    
    let message = "Pasmo sukcesów nie zostało zaktualizowane";
    
    if (streakStats.streakUpdated) {
      if (streakStats.streak === 1 && streakStats.streakBroken) {
        message = "Rozpoczęto nowe pasmo sukcesów!";
      } else if (streakStats.streak === 1) {
        message = "Pierwszy dzień nauki! Rozpoczęto pasmo sukcesów.";
      } else {
        message = `Świetnie! Twoje pasmo sukcesów wynosi teraz ${streakStats.streak} dni!`;
      }
    }
    
    res.json({
      message,
      streak: streakStats.streak,
      bestStreak: streakStats.bestStreak,
      streakUpdated: streakStats.streakUpdated
    });
  } catch (error) {
    next(error);
  }
}; 