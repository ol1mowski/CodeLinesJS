import { StatsService } from '../../../services/stats/stats.service.js';
import { AuthError } from '../../../utils/errors.js';
import { Request, Response, NextFunction } from 'express';

export const updateStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new AuthError('Brak autoryzacji');

    const updateData = req.body;
    const updatedStats = await StatsService.updateStats(userId, updateData);

    res.success(updatedStats, 'Statystyki użytkownika zaktualizowane pomyślnie');
  } catch (error) {
    next(error);
  }
}; 