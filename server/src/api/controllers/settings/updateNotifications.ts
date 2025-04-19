import { Response, NextFunction } from 'express';
import { AuthRequest, UpdateNotificationsDTO } from '../../../types/settings/index.js';
import { ValidationError } from '../../../utils/errors.js';
import { SettingsService } from '../../../services/settings/settings.service.js';

export const updateNotificationsController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new ValidationError('Brak autoryzacji');
    }

    const notificationsData: UpdateNotificationsDTO = req.body;
    
    const updatedNotifications = await SettingsService.updateNotifications(userId, notificationsData);

    res.success(updatedNotifications, 'Ustawienia powiadomień zostały zaktualizowane');
  } catch (error) {
    next(error);
  }
}; 