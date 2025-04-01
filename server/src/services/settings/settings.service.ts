import {
  SettingsResponse,
  UpdateProfileDTO,
  ChangePasswordDTO,
  UpdateNotificationsDTO,
  UpdateAppearanceDTO,
  UserProfile,
} from '../../types/settings/index.js';

import { GeneralSettingsService } from './general.service.js';
import { ProfileService } from './profile.service.js';
import { PasswordService } from './password.service.js';
import { NotificationsService } from './notifications.service.js';
import { AppearanceService } from './appearance.service.js';
import { AccountService } from './account.service.js';

export class SettingsService {
  public static async getSettings(userId: string): Promise<SettingsResponse> {
    return GeneralSettingsService.getSettings(userId);
  }

  public static async updateProfile(userId: string, profileData: UpdateProfileDTO): Promise<UserProfile> {
    return ProfileService.updateProfile(userId, profileData);
  }

  public static async changePassword(userId: string, passwordData: ChangePasswordDTO): Promise<void> {
    return PasswordService.changePassword(userId, passwordData);
  }

  public static async updateNotifications(userId: string, notificationsData: UpdateNotificationsDTO): Promise<any> {
    return NotificationsService.updateNotifications(userId, notificationsData);
  }

  public static async updateAppearance(userId: string, appearanceData: UpdateAppearanceDTO): Promise<any> {
    return AppearanceService.updateAppearance(userId, appearanceData);
  }

  public static async deleteAccount(userId: string, password: string): Promise<void> {
    return AccountService.deleteAccount(userId, password);
  }
} 