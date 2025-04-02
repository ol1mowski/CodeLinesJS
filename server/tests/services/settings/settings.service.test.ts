import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SettingsService } from '../../../src/services/settings/settings.service.js';
import { GeneralSettingsService } from '../../../src/services/settings/general.service.js';
import { ProfileService } from '../../../src/services/settings/profile.service.js';
import { PasswordService } from '../../../src/services/settings/password.service.js';
import { NotificationsService } from '../../../src/services/settings/notifications.service.js';
import { AppearanceService } from '../../../src/services/settings/appearance.service.js';
import { AccountService } from '../../../src/services/settings/account.service.js';
import { 
  SettingsResponse, 
  UpdateProfileDTO, 
  ChangePasswordDTO,
  UpdateNotificationsDTO,
  UpdateAppearanceDTO
} from '../../../src/types/settings/index.js';

vi.mock('../../../src/services/settings/general.service.js', () => ({
  GeneralSettingsService: {
    getSettings: vi.fn()
  }
}));

vi.mock('../../../src/services/settings/profile.service.js', () => ({
  ProfileService: {
    updateProfile: vi.fn()
  }
}));

vi.mock('../../../src/services/settings/password.service.js', () => ({
  PasswordService: {
    changePassword: vi.fn()
  }
}));

vi.mock('../../../src/services/settings/notifications.service.js', () => ({
  NotificationsService: {
    updateNotifications: vi.fn()
  }
}));

vi.mock('../../../src/services/settings/appearance.service.js', () => ({
  AppearanceService: {
    updateAppearance: vi.fn()
  }
}));

vi.mock('../../../src/services/settings/account.service.js', () => ({
  AccountService: {
    deleteAccount: vi.fn()
  }
}));

describe('SettingsService', () => {
  const userId = 'user123';
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('getSettings', () => {
    it('should call GeneralSettingsService.getSettings with correct params', async () => {
      const mockResponse: SettingsResponse = {
        profile: {
          id: userId,
          username: 'testuser',
          email: 'test@example.com',
          bio: 'Test bio'
        },
        settings: {
          notifications: {
            email: true,
            push: true,
            dailyReminders: true,
            weeklyProgress: true,
            newFeatures: true,
            communityUpdates: false
          },
          appearance: {
            theme: 'dark',
            fontSize: 'medium',
            codeStyle: 'default'
          }
        }
      };
      
      vi.mocked(GeneralSettingsService.getSettings).mockResolvedValue(mockResponse);
      
      const result = await SettingsService.getSettings(userId);
      
      expect(GeneralSettingsService.getSettings).toHaveBeenCalledWith(userId);
      expect(result).toEqual(mockResponse);
    });
  });
  
  describe('updateProfile', () => {
    it('should call ProfileService.updateProfile with correct params', async () => {
      const profileData: UpdateProfileDTO = {
        username: 'newusername',
        bio: 'New bio',
        avatar: 'new-avatar-url.jpg'
      };
      
      const mockResponse = {
        id: userId,
        username: profileData.username,
        email: 'test@example.com',
        bio: profileData.bio || '',
        avatar: profileData.avatar
      };
      
      vi.mocked(ProfileService.updateProfile).mockResolvedValue(mockResponse);
      
      const result = await SettingsService.updateProfile(userId, profileData);
      
      expect(ProfileService.updateProfile).toHaveBeenCalledWith(userId, profileData);
      expect(result).toEqual(mockResponse);
    });
  });
  
  describe('changePassword', () => {
    it('should call PasswordService.changePassword with correct params', async () => {
      const passwordData: ChangePasswordDTO = {
        currentPassword: 'oldpassword',
        newPassword: 'newpassword'
      };
      
      vi.mocked(PasswordService.changePassword).mockResolvedValue(undefined);
      
      await SettingsService.changePassword(userId, passwordData);
      
      expect(PasswordService.changePassword).toHaveBeenCalledWith(userId, passwordData);
    });
  });
  
  describe('updateNotifications', () => {
    it('should call NotificationsService.updateNotifications with correct params', async () => {
      const notificationsData: UpdateNotificationsDTO = {
        emailNotifications: false,
        pushNotifications: true,
        dailyReminders: false,
        weeklyProgress: true
      };
      
      const mockResponse = {
        email: false,
        push: true,
        dailyReminders: false,
        weeklyProgress: true,
        newFeatures: true,
        communityUpdates: false
      };
      
      vi.mocked(NotificationsService.updateNotifications).mockResolvedValue(mockResponse);
      
      const result = await SettingsService.updateNotifications(userId, notificationsData);
      
      expect(NotificationsService.updateNotifications).toHaveBeenCalledWith(userId, notificationsData);
      expect(result).toEqual(mockResponse);
    });
  });
  
  describe('updateAppearance', () => {
    it('should call AppearanceService.updateAppearance with correct params', async () => {
      const appearanceData: UpdateAppearanceDTO = {
        theme: 'light',
        fontSize: 'large',
        codeStyle: 'github'
      };
      
      const mockResponse = {
        theme: 'light',
        fontSize: 'large',
        codeStyle: 'github'
      };
      
      vi.mocked(AppearanceService.updateAppearance).mockResolvedValue(mockResponse);
      
      const result = await SettingsService.updateAppearance(userId, appearanceData);
      
      expect(AppearanceService.updateAppearance).toHaveBeenCalledWith(userId, appearanceData);
      expect(result).toEqual(mockResponse);
    });
  });
  
  describe('deleteAccount', () => {
    it('should call AccountService.deleteAccount with correct params', async () => {
      const password = 'userpassword';
      
      vi.mocked(AccountService.deleteAccount).mockResolvedValue(undefined);
      
      await SettingsService.deleteAccount(userId, password);
      
      expect(AccountService.deleteAccount).toHaveBeenCalledWith(userId, password);
    });
  });
}); 