import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../../types/settings/index.js';
import { ValidationError } from '../../../utils/errors.js';
import { SettingsService } from '../../../services/settings/settings.service.js';

export const getSettingsController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new ValidationError('Brak autoryzacji');
    }

    const settingsResponse = await SettingsService.getSettings(userId);

    res.success(settingsResponse, 'Ustawienia użytkownika pobrane pomyślnie');
  } catch (error) {
    next(error);
  }
}; 