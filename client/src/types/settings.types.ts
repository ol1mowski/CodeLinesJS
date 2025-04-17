export type UserProfile = {
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
};

export type SecuritySettings = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type UserPreferences = {
  emailNotifications: boolean;
  pushNotifications: boolean;
  darkMode: boolean;
  language: 'pl' | 'en';
};
