import { Request } from 'express';
import { Document, Types } from 'mongoose';

export type Theme = 'light' | 'dark' | 'system';

export type FontSize = 'small' | 'medium' | 'large';

export type CodeStyle = 'default' | 'monokai' | 'github' | 'vscode';

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  dailyReminders: boolean;
  weeklyProgress: boolean;
  newFeatures: boolean;
  communityUpdates: boolean;
}

export interface AppearanceSettings {
  theme: Theme;
  fontSize: FontSize;
  codeStyle: CodeStyle;
}

export interface UserSettings {
  notifications: NotificationSettings;
  appearance: AppearanceSettings;
}

export interface UserProfile {
  id: string | Types.ObjectId;
  username: string;
  email: string;
  bio: string;
  avatar?: string;
}

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

export interface SettingsResponse {
  profile: UserProfile;
  settings: UserSettings;
}

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

export interface UpdateProfileDTO {
  username: string;
  email?: string;
  bio?: string;
  avatar?: string;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateNotificationsDTO {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  dailyReminders?: boolean;
  weeklyProgress?: boolean;
  newFeatures?: boolean;
  communityUpdates?: boolean;
}

export interface UpdateAppearanceDTO {
  theme?: Theme;
  fontSize?: FontSize;
  codeStyle?: CodeStyle;
}

export interface DeleteAccountDTO {
  password: string;
}
