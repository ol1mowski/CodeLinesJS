import { Response, NextFunction } from 'express';
import { AuthRequest, ChangePasswordDTO } from '../../../types/settings/index.js';
import { ValidationError } from '../../../utils/errors.js';
import { SettingsService } from '../../../services/settings/settings.service.js';

export const changePasswordController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new ValidationError('Brak autoryzacji');
    }

    const passwordData: ChangePasswordDTO = req.body;
    
    await SettingsService.changePassword(userId, passwordData);

    res.success(null, 'Hasło zostało zmienione');
  } catch (error) {
    next(error);
  }
}; 