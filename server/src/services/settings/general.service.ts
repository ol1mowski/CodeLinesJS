import { User } from '../../models/user.model.js';
import { ValidationError } from '../../utils/errors.js';
import { SettingsResponse, UserProfile, UserSettings } from '../../types/settings/index.js';
import { SettingsDefaultsService } from './defaults.service.js';

export class GeneralSettingsService {
  static async getSettings(userId: string): Promise<SettingsResponse> {
    const user = await User.findById(userId)
      .select('username email bio avatar settings')
      .lean();

    if (!user) {
      throw new ValidationError('Użytkownik nie znaleziony');
    }

    const settings: UserSettings = (user as any).settings || {
      notifications: SettingsDefaultsService.DEFAULT_NOTIFICATION_SETTINGS,
      appearance: SettingsDefaultsService.DEFAULT_APPEARANCE_SETTINGS
    };

    const profile: UserProfile = {
      id: user._id,
      username: user.username,
      email: user.email,
      bio: (user as any).bio || '',
      avatar: (user as any).avatar
    };

    return {
      profile,
      settings
    };
  }
} 