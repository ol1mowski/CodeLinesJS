export type SettingsView = "profile" | "security" | "preferences" | "delete";

export type UserProfile = {
  username: string;
  email: string;
  bio?: string;
  avatar?: string;
}

export type SecurityFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type PreferencesData = {
  emailNotifications: boolean;
  pushNotifications: boolean;
  darkMode: boolean;
  language: "pl" | "en";
} 