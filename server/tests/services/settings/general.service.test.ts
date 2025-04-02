import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeneralSettingsService } from '../../../src/services/settings/general.service.js';
import { User } from '../../../src/models/user.model.js';
import { ValidationError } from '../../../src/utils/errors.js';
import { SettingsDefaultsService } from '../../../src/services/settings/defaults.service.js';
import { Types } from 'mongoose';

vi.mock('../../../src/models/user.model.js', () => ({
  User: {
    findById: vi.fn()
  }
}));

vi.mock('../../../src/services/settings/defaults.service.js', () => ({
  SettingsDefaultsService: {
    DEFAULT_NOTIFICATION_SETTINGS: {
      email: true,
      push: true,
      dailyReminders: true,
      weeklyProgress: true,
      newFeatures: true,
      communityUpdates: true
    },
    DEFAULT_APPEARANCE_SETTINGS: {
      theme: 'system',
      fontSize: 'medium',
      codeStyle: 'default'
    }
  }
}));

describe('GeneralSettingsService', () => {
  const userId = 'user123';
  const mockObjectId = new Types.ObjectId();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('getSettings', () => {
    it('should return user settings when user exists', async () => {
      const mockUser = {
        _id: mockObjectId,
        username: 'testuser',
        email: 'test@example.com',
        bio: 'Test bio',
        avatar: 'avatar-url.jpg',
        settings: {
          notifications: {
            email: false,
            push: true,
            dailyReminders: false,
            weeklyProgress: true,
            newFeatures: true,
            communityUpdates: false
          },
          appearance: {
            theme: 'dark',
            fontSize: 'large',
            codeStyle: 'monokai'
          }
        }
      };
      
      const mockSelectFn = vi.fn().mockReturnValue({
        lean: vi.fn().mockResolvedValue(mockUser)
      });
      
      const mockFindByIdFn = vi.fn().mockReturnValue({
        select: mockSelectFn
      });
      
      vi.mocked(User.findById).mockImplementation(mockFindByIdFn);
      
      const result = await GeneralSettingsService.getSettings(userId);
      
      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(mockSelectFn).toHaveBeenCalledWith('username email bio avatar settings');
      
      expect(result).toEqual({
        profile: {
          id: mockUser._id,
          username: mockUser.username,
          email: mockUser.email,
          bio: mockUser.bio,
          avatar: mockUser.avatar
        },
        settings: mockUser.settings
      });
    });
    
    it('should return default settings when user has no settings', async () => {
      const mockUser = {
        _id: mockObjectId,
        username: 'testuser',
        email: 'test@example.com',
        bio: '',
        avatar: null,
        settings: null
      };
      
      const mockSelectFn = vi.fn().mockReturnValue({
        lean: vi.fn().mockResolvedValue(mockUser)
      });
      
      const mockFindByIdFn = vi.fn().mockReturnValue({
        select: mockSelectFn
      });
      
      vi.mocked(User.findById).mockImplementation(mockFindByIdFn);
      
      const result = await GeneralSettingsService.getSettings(userId);
      
      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(mockSelectFn).toHaveBeenCalledWith('username email bio avatar settings');
      
      expect(result).toEqual({
        profile: {
          id: mockUser._id,
          username: mockUser.username,
          email: mockUser.email,
          bio: mockUser.bio || '',
          avatar: mockUser.avatar
        },
        settings: {
          notifications: SettingsDefaultsService.DEFAULT_NOTIFICATION_SETTINGS,
          appearance: SettingsDefaultsService.DEFAULT_APPEARANCE_SETTINGS
        }
      });
    });
    
    it('should merge default settings when user has partial settings', async () => {
      const mockUser = {
        _id: mockObjectId,
        username: 'testuser',
        email: 'test@example.com',
        bio: 'Test bio',
        avatar: 'avatar-url.jpg',
        settings: {
          notifications: {
            email: false,
            push: false,
            dailyReminders: false,
            weeklyProgress: false,
            newFeatures: false,
            communityUpdates: false
          }
        }
      };
      
      const mockSelectFn = vi.fn().mockReturnValue({
        lean: vi.fn().mockResolvedValue(mockUser)
      });
      
      const mockFindByIdFn = vi.fn().mockReturnValue({
        select: mockSelectFn
      });
      
      vi.mocked(User.findById).mockImplementation(mockFindByIdFn);
      
      const result = await GeneralSettingsService.getSettings(userId);
      
      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(mockSelectFn).toHaveBeenCalledWith('username email bio avatar settings');
      
      expect(result).toEqual({
        profile: {
          id: mockUser._id,
          username: mockUser.username,
          email: mockUser.email,
          bio: mockUser.bio,
          avatar: mockUser.avatar
        },
        settings: mockUser.settings
      });
    });
    
    it('should handle user with undefined bio and avatar', async () => {
      const mockUser = {
        _id: mockObjectId,
        username: 'testuser',
        email: 'test@example.com',
        settings: {
          notifications: SettingsDefaultsService.DEFAULT_NOTIFICATION_SETTINGS,
          appearance: SettingsDefaultsService.DEFAULT_APPEARANCE_SETTINGS
        }
      };
      
      const mockSelectFn = vi.fn().mockReturnValue({
        lean: vi.fn().mockResolvedValue(mockUser)
      });
      
      const mockFindByIdFn = vi.fn().mockReturnValue({
        select: mockSelectFn
      });
      
      vi.mocked(User.findById).mockImplementation(mockFindByIdFn);
      
      const result = await GeneralSettingsService.getSettings(userId);
      
      expect(result.profile.bio).toBe('');
      expect(result.profile.avatar).toBeUndefined();
    });
    
    it('should throw ValidationError when user not found', async () => {
      const mockSelectFn = vi.fn().mockReturnValue({
        lean: vi.fn().mockResolvedValue(null)
      });
      
      const mockFindByIdFn = vi.fn().mockReturnValue({
        select: mockSelectFn
      });
      
      vi.mocked(User.findById).mockImplementation(mockFindByIdFn);
      
      await expect(GeneralSettingsService.getSettings(userId)).rejects.toThrow(ValidationError);
    });
  });
}); 