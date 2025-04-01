import { Request } from 'express';
import { Document, Types } from 'mongoose';

/**
 * Typy motywów aplikacji
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Typy rozmiarów czcionki
 */
export type FontSize = 'small' | 'medium' | 'large';

/**
 * Typy styli kodu
 */
export type CodeStyle = 'default' | 'monokai' | 'github' | 'vscode';

/**
 * Interfejs dla ustawień powiadomień
 */
export interface NotificationSettings {
  email: boolean;
  push: boolean;
  dailyReminders: boolean;
  weeklyProgress: boolean;
  newFeatures: boolean;
  communityUpdates: boolean;
}

/**
 * Interfejs dla ustawień wyglądu
 */
export interface AppearanceSettings {
  theme: Theme;
  fontSize: FontSize;
  codeStyle: CodeStyle;
}

/**
 * Interfejs dla wszystkich ustawień użytkownika
 */
export interface UserSettings {
  notifications: NotificationSettings;
  appearance: AppearanceSettings;
}

/**
 * Podstawowe informacje o profilu użytkownika
 */
export interface UserProfile {
  id: string | Types.ObjectId;
  username: string;
  email: string;
  bio: string;
  avatar?: string;
}

/**
 * Interfejs użytkownika w modelu Mongoose
 */
export interface IUser extends Document {
  _id: string | Types.ObjectId;
  username: string;
  email: string;
  password: string;
  accountType: 'local' | 'google';
  isEmailVerified: boolean;
  bio?: string;
  avatar?: string;
  role?: string;
  settings?: UserSettings;
  comparePassword?: (candidatePassword: string) => Promise<boolean>;
  [key: string]: any;
}

/**
 * Odpowiedź z ustawieniami użytkownika
 */
export interface SettingsResponse {
  profile: UserProfile;
  settings: UserSettings;
}

/**
 * Request uwierzytelniający z danymi użytkownika
 */
export interface AuthRequest extends Request {
  user: {
    userId: string;
    email: string;
    username?: string;
    role: string;
    accountType?: string;
    [key: string]: any;
  };
}

/**
 * DTO do aktualizacji profilu
 */
export interface UpdateProfileDTO {
  username: string;
  bio?: string;
  avatar?: string;
}

/**
 * DTO do aktualizacji hasła
 */
export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

/**
 * DTO do aktualizacji powiadomień
 */
export interface UpdateNotificationsDTO {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  dailyReminders?: boolean;
  weeklyProgress?: boolean;
  newFeatures?: boolean;
  communityUpdates?: boolean;
}

/**
 * DTO do aktualizacji wyglądu
 */
export interface UpdateAppearanceDTO {
  theme?: Theme;
  fontSize?: FontSize;
  codeStyle?: CodeStyle;
}

/**
 * DTO do usunięcia konta
 */
export interface DeleteAccountDTO {
  password: string;
} 