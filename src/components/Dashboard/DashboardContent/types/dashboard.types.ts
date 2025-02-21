export type DashboardStats = {
  level: number;
  points: number;
  streak: number;
  lastActive: string;
}

export type DashboardProfile = {
  username: string;
  avatar?: string;
  theme: 'light' | 'dark';
}

export type DashboardNotification = {
  _id: string;
  message: string;
  type: 'challenge' | 'achievement' | 'system' | 'social';
  read: boolean;
  createdAt: string;
  username: string;
  avatar: string;
  time: string;
}

export type DashboardData = {
  data: DashboardStats;
  profile: DashboardProfile;
  notifications: DashboardNotification[];
  unreadCount: number;
} 