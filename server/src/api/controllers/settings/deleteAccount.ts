import { Response, NextFunction } from 'express';
import { AuthRequest, DeleteAccountDTO } from '../../../types/settings/index.js';
import { ValidationError } from '../../../utils/errors.js';
import { SettingsService } from '../../../services/settings/settings.service.js';

export const deleteAccountController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new ValidationError('Brak autoryzacji');
    }

    const { password } = req.body as DeleteAccountDTO;
    
    await SettingsService.deleteAccount(userId, password);

    res.status(200).json({
      success: true,
      message: 'Konto zostało usunięte'
    });
  } catch (error) {
    next(error);
  }
};