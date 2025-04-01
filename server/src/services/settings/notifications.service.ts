import { User } from '../../models/user.model.js';
import { ValidationError } from '../../utils/errors.js';
import { UpdateNotificationsDTO } from '../../types/settings/index.js';
import { SettingsDefaultsService } from './defaults.service.js';

export class NotificationsService {
  static async updateNotifications(
    userId: string,
    notificationsData: UpdateNotificationsDTO
  ): Promise<any> {
    const {
      emailNotifications,
      pushNotifications,
      dailyReminders,
      weeklyProgress,
      newFeatures,
      communityUpdates
    } = notificationsData;

    const user = await User.findById(userId);

    if (!user) {
      throw new ValidationError('Użytkownik nie znaleziony');
    }

    if (!(user as any).settings) {
      (user as any).settings = {
        notifications: SettingsDefaultsService.DEFAULT_NOTIFICATION_SETTINGS,
        appearance: SettingsDefaultsService.DEFAULT_APPEARANCE_SETTINGS
      };
    }

    if (!(user as any).settings.notifications) {
      (user as any).settings.notifications = SettingsDefaultsService.DEFAULT_NOTIFICATION_SETTINGS;
    }

    const notifications = (user as any).settings.notifications;

    if (emailNotifications !== undefined) {
      notifications.email = emailNotifications;
    }

    if (pushNotifications !== undefined) {
      notifications.push = pushNotifications;
    }

    if (dailyReminders !== undefined) {
      notifications.dailyReminders = dailyReminders;
    }

    if (weeklyProgress !== undefined) {
      notifications.weeklyProgress = weeklyProgress;
    }

    if (newFeatures !== undefined) {
      notifications.newFeatures = newFeatures;
    }

    if (communityUpdates !== undefined) {
      notifications.communityUpdates = communityUpdates;
    }

    await user.save();

    return (user as any).settings.notifications;
  }
} 