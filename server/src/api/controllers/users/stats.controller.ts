import { Request, Response, NextFunction } from 'express';
import { userService } from '../../../services/users/user.service.js';
import { AuthError } from '../../../utils/errors.js';

export const getUserStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const statsResponse = await userService.getUserStats(userId);
    res.json(statsResponse);
  } catch (error) {
    next(error);
  }
};

export const getUserProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const progressResponse = await userService.getUserProgress(userId);
    res.json(progressResponse);
  } catch (error) {
    next(error);
  }
};

export const updateUserStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const { points, xp } = req.body;
    
    const statsResponse = await userService.updateUserStats(userId, { points, xp });
    res.json(statsResponse);
  } catch (error) {
    next(error);
  }
}; 