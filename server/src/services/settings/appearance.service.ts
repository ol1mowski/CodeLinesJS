import { User } from '../../models/user.model.js';
import { ValidationError } from '../../utils/errors.js';
import { UpdateAppearanceDTO } from '../../types/settings/index.js';
import { SettingsDefaultsService } from './defaults.service.js';

export class AppearanceService {
  static async updateAppearance(
    userId: string,
    appearanceData: UpdateAppearanceDTO
  ): Promise<any> {
    const { theme, fontSize, codeStyle } = appearanceData;

    if (theme && !SettingsDefaultsService.VALID_THEMES.includes(theme)) {
      throw new ValidationError('Nieprawidłowy motyw');
    }

    if (fontSize && !SettingsDefaultsService.VALID_FONT_SIZES.includes(fontSize)) {
      throw new ValidationError('Nieprawidłowy rozmiar czcionki');
    }

    if (codeStyle && !SettingsDefaultsService.VALID_CODE_STYLES.includes(codeStyle)) {
      throw new ValidationError('Nieprawidłowy styl kodu');
    }

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

    if (!(user as any).settings.appearance) {
      (user as any).settings.appearance = SettingsDefaultsService.DEFAULT_APPEARANCE_SETTINGS;
    }

    const appearance = (user as any).settings.appearance;

    if (theme) {
      appearance.theme = theme;
    }

    if (fontSize) {
      appearance.fontSize = fontSize;
    }

    if (codeStyle) {
      appearance.codeStyle = codeStyle;
    }

    await user.save();

    return (user as any).settings.appearance;
  }
} 