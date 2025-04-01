import { Response, NextFunction } from 'express';
import { ProgressService } from '../../../services/progress/index.js';
import { IUserRequest, UpdateProgressDTO, UpdateUserProgressDTO, IUser } from '../../../types/progress/index.js';
import { ValidationError } from '../../../utils/errors.js';
import { User } from '../../../models/user.model.js';

export const updateProgressController = async (
  req: IUserRequest & { body: UpdateProgressDTO }, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const { lessonId } = req.body;
    const userId = req.user.userId;

    if (!lessonId) {
      throw new ValidationError("Brak ID lekcji");
    }

    const result = await ProgressService.updateLessonProgress(userId, lessonId);
    
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const updateUserProgressController = async (
  req: IUserRequest & { body: UpdateUserProgressDTO }, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const { points, challenges, timeSpent } = req.body;
    const userId = req.user.userId;

    if (typeof points !== 'number' || points < 0) {
      throw new ValidationError("Nieprawidłowa wartość punktów");
    }

    const userDoc = await User.findById(userId);
    
    if (!userDoc) {
      throw new ValidationError("Użytkownik nie znaleziony");
    }
    
    const user = userDoc as unknown as IUser;
    
    if (!user.stats.timeSpent) user.stats.timeSpent = 0;
    if (!user.stats.completedChallenges) user.stats.completedChallenges = 0;

    const update = await ProgressService.updateUserStats(
      user,
      points, 
      {
        points,
        challenges: challenges || 0,
        timeSpent: timeSpent || 0
      }
    );
    
    await userDoc.save();

    res.json({
      message: update.level.leveledUp
        ? `Punkty dodane! Awansowałeś na poziom ${update.level.level}!`
        : "Punkty użytkownika zaktualizowane pomyślnie",
      data: {
        userStats: {
          points: update.level.points,
          pointsRequired: update.level.pointsToNextLevel,
          xp: update.level.points,
          level: update.level.level,
          levelProgress: update.level.progress,
          streak: update.streak.streak,
          bestStreak: update.streak.bestStreak,
          lastActive: new Date(),
          leveledUp: update.level.leveledUp,
          levelsGained: update.level.levelsGained
        },
        streak: {
          current: update.streak.streak,
          best: update.streak.bestStreak,
          updated: update.streak.streakUpdated,
          broken: update.streak.streakBroken
        }
      }
    });
  } catch (error) {
    next(error);
  }
};