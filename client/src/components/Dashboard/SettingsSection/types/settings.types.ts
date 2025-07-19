export type UserProfile = {
  username: string;
  avatar?: string;
  profile?: {
    bio?: string;
  };
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