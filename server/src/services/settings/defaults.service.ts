import { Theme, FontSize, CodeStyle } from '../../types/settings/index.js';

export class SettingsDefaultsService {
  static readonly DEFAULT_NOTIFICATION_SETTINGS = {
    email: true,
    push: true,
    dailyReminders: true,
    weeklyProgress: true,
    newFeatures: true,
    communityUpdates: true
  };

  static readonly DEFAULT_APPEARANCE_SETTINGS = {
    theme: 'system' as Theme,
    fontSize: 'medium' as FontSize,
    codeStyle: 'default' as CodeStyle
  };

  static readonly VALID_THEMES: Theme[] = ['light', 'dark', 'system'];
  static readonly VALID_FONT_SIZES: FontSize[] = ['small', 'medium', 'large'];
  static readonly VALID_CODE_STYLES: CodeStyle[] = ['default', 'monokai', 'github', 'vscode'];
} 