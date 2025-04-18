import { StatsService } from '../../../services/stats/stats.service.js';
import { AuthError } from '../../../utils/errors.js';
import { Request, Response, NextFunction } from 'express';

export const getDailyStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const dailyStats = await StatsService.getDailyStats(userId);

    res.success(dailyStats, 'Dzienne statystyki użytkownika pobrane pomyślnie');
  } catch (error) {
    next(error);
  }
}; 