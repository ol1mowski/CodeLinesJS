import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  getSettingsController,
  updateProfileController,
  changePasswordController,
  updateNotificationsController,
  updateAppearanceController,
  deleteAccountController
} from '../../../../src/api/controllers/settings/index.js';
import { SettingsService } from '../../../../src/services/settings/settings.service.js';
import { NextFunction, Response } from 'express';
import { ValidationError } from '../../../../src/utils/errors.js';
import { 
  AuthRequest, 
  SettingsResponse,
  UpdateProfileDTO,
  UpdateNotificationsDTO,
  UpdateAppearanceDTO
} from '../../../../src/types/settings/index.js';

vi.mock('../../../../src/services/settings/settings.service.js', () => ({
  SettingsService: {
    getSettings: vi.fn(),
    updateProfile: vi.fn(),
    changePassword: vi.fn(),
    updateNotifications: vi.fn(),
    updateAppearance: vi.fn(),
    deleteAccount: vi.fn()
  }
}));

describe('Settings Controllers', () => {
  let req: Partial<AuthRequest>;
  let res: Partial<Response>;
  let next: NextFunction;
  
  beforeEach(() => {
    req = {
      user: {
        userId: 'user123',
        email: 'test@example.com',
        role: 'user'
      },
      body: {}
    };
    
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    
    next = vi.fn() as unknown as NextFunction;
    
    vi.clearAllMocks();
  });
  
  describe('getSettingsController', () => {
    it('should fetch user settings and return them', async () => {
      const mockSettings: SettingsResponse = {
        profile: {
          id: 'user123',
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
      
      vi.mocked(SettingsService.getSettings).mockResolvedValue(mockSettings);
      
      await getSettingsController(req as AuthRequest, res as Response, next);
      
      expect(SettingsService.getSettings).toHaveBeenCalledWith('user123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockSettings
      });
      expect(next).not.toHaveBeenCalled();
    });
    
    it('should handle unauthorized request', async () => {
      req.user = undefined;
      
      await getSettingsController(req as AuthRequest, res as Response, next);
      
      expect(SettingsService.getSettings).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
    
    it('should handle error from service', async () => {
      const error = new Error('Service error');
      vi.mocked(SettingsService.getSettings).mockRejectedValue(error);
      
      await getSettingsController(req as AuthRequest, res as Response, next);
      
      expect(next).toHaveBeenCalledWith(error);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
  
  describe('updateProfileController', () => {
    it('should update profile and return success', async () => {
      const profileData: UpdateProfileDTO = {
        username: 'newusername',
        bio: 'New bio',
        avatar: 'new-avatar-url.jpg'
      };
      
      req.body = profileData;
      
      const mockUpdatedProfile = {
        id: 'user123',
        username: 'newusername',
        email: 'test@example.com',
        bio: 'New bio',
        avatar: 'new-avatar-url.jpg'
      };
      
      vi.mocked(SettingsService.updateProfile).mockResolvedValue(mockUpdatedProfile);
      
      await updateProfileController(req as AuthRequest, res as Response, next);
      
      expect(SettingsService.updateProfile).toHaveBeenCalledWith('user123', profileData);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Profil został zaktualizowany',
        data: mockUpdatedProfile
      });
      expect(next).not.toHaveBeenCalled();
    });
    
    it('should handle unauthorized request', async () => {
      req.user = undefined;
      
      await updateProfileController(req as AuthRequest, res as Response, next);
      
      expect(SettingsService.updateProfile).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
  
  describe('changePasswordController', () => {
    it('should change password and return success', async () => {
      req.body = {
        currentPassword: 'oldpassword',
        newPassword: 'newpassword'
      };
      
      vi.mocked(SettingsService.changePassword).mockResolvedValue(undefined);
      
      await changePasswordController(req as AuthRequest, res as Response, next);
      
      expect(SettingsService.changePassword).toHaveBeenCalledWith(
        'user123', 
        {
          currentPassword: 'oldpassword',
          newPassword: 'newpassword'
        }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Hasło zostało zmienione'
      });
      expect(next).not.toHaveBeenCalled();
    });
    
    it('should handle unauthorized request', async () => {
      req.user = undefined;
      
      await changePasswordController(req as AuthRequest, res as Response, next);
      
      expect(SettingsService.changePassword).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
  
  describe('updateNotificationsController', () => {
    it('should update notifications and return success', async () => {
      const notificationsData: UpdateNotificationsDTO = {
        emailNotifications: false,
        pushNotifications: true,
        dailyReminders: false,
        weeklyProgress: true
      };
      
      req.body = notificationsData;
      
      const mockUpdatedNotifications = {
        email: false,
        push: true,
        dailyReminders: false,
        weeklyProgress: true,
        newFeatures: true,
        communityUpdates: true
      };
      
      vi.mocked(SettingsService.updateNotifications).mockResolvedValue(mockUpdatedNotifications);
      
      await updateNotificationsController(req as AuthRequest, res as Response, next);
      
      expect(SettingsService.updateNotifications).toHaveBeenCalledWith('user123', notificationsData);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Ustawienia powiadomień zostały zaktualizowane',
        data: mockUpdatedNotifications
      });
      expect(next).not.toHaveBeenCalled();
    });
    
    it('should handle unauthorized request', async () => {
      req.user = undefined;
      
      await updateNotificationsController(req as AuthRequest, res as Response, next);
      
      expect(SettingsService.updateNotifications).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
  
  describe('updateAppearanceController', () => {
    it('should update appearance and return success', async () => {
      const appearanceData: UpdateAppearanceDTO = {
        theme: 'light',
        fontSize: 'large',
        codeStyle: 'github'
      };
      
      req.body = appearanceData;
      
      const mockUpdatedAppearance = {
        theme: 'light',
        fontSize: 'large',
        codeStyle: 'github'
      };
      
      vi.mocked(SettingsService.updateAppearance).mockResolvedValue(mockUpdatedAppearance);
      
      await updateAppearanceController(req as AuthRequest, res as Response, next);
      
      expect(SettingsService.updateAppearance).toHaveBeenCalledWith('user123', appearanceData);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Ustawienia wyglądu zostały zaktualizowane',
        data: mockUpdatedAppearance
      });
      expect(next).not.toHaveBeenCalled();
    });
    
    it('should handle unauthorized request', async () => {
      req.user = undefined;
      
      await updateAppearanceController(req as AuthRequest, res as Response, next);
      
      expect(SettingsService.updateAppearance).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
  
  describe('deleteAccountController', () => {
    it('should delete account and return success', async () => {
      req.body = {
        password: 'userpassword'
      };
      
      vi.mocked(SettingsService.deleteAccount).mockResolvedValue(undefined);
      
      await deleteAccountController(req as AuthRequest, res as Response, next);
      
      expect(SettingsService.deleteAccount).toHaveBeenCalledWith('user123', 'userpassword');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Konto zostało usunięte'
      });
      expect(next).not.toHaveBeenCalled();
    });
    
    it('should handle unauthorized request', async () => {
      req.user = undefined;
      
      await deleteAccountController(req as AuthRequest, res as Response, next);
      
      expect(SettingsService.deleteAccount).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
    
    it('should handle missing password', async () => {
      req.body = {}; // Empty body without password
      
      // Mocka funkcję dla tego konkretnego testu, żeby sprawdzić, czy kontroler wywołuje next z błędem
      const mockValidationError = new ValidationError('Hasło jest wymagane');
      vi.mocked(SettingsService.deleteAccount).mockImplementation(() => {
        throw mockValidationError;
      });
      
      await deleteAccountController(req as AuthRequest, res as Response, next);
      
      // W tym podejściu kontroler próbuje wywołać serwis, ale ten rzuca błąd walidacji
      expect(SettingsService.deleteAccount).toHaveBeenCalledWith('user123', undefined);
      expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();
    });
  });
}); 