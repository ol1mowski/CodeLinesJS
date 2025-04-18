import { StatsService } from '../../../services/stats/stats.service.js';
import { AuthError } from '../../../utils/errors.js';
import { Request, Response, NextFunction } from 'express';

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const userStats = await StatsService.getUserStats(userId);

    res.success(userStats, 'Statystyki użytkownika pobrane pomyślnie');
  } catch (error) {
    next(error);
  }
}; 