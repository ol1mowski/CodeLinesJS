import { Response, NextFunction } from 'express';
import { AuthRequest, UpdateProfileDTO } from '../../../types/settings/index.js';
import { ValidationError } from '../../../utils/errors.js';
import { SettingsService } from '../../../services/settings/settings.service.js';

export const updateProfileController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw new ValidationError('Brak autoryzacji');
    }

    const profileData: UpdateProfileDTO = req.body;
    
    const updatedProfile = await SettingsService.updateProfile(userId, profileData);

    res.success(updatedProfile, 'Profil został zaktualizowany');
  } catch (error) {
    next(error);
  }
}; 