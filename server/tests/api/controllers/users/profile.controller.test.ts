import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUserProfile, getActiveUsers } from '../../../../src/api/controllers/users/profile.controller.js';
import { userService } from '../../../../src/services/users/user.service.js';
import { Request, Response, NextFunction } from 'express';
import { AuthError } from '../../../../src/utils/errors.js';

vi.mock('../../../../src/services/users/user.service.js', () => ({
  userService: {
    getUserProfile: vi.fn(),
    getActiveUsers: vi.fn()
  }
}));

interface CustomResponse extends Response {
  success: (data?: any, message?: string, statusCode?: number) => Response;
}

describe('User Profile Controller', () => {
  let req: Partial<Request & { user?: { userId: string; id: string; email: string; role: string }, params?: any }>;
  let res: Partial<CustomResponse>;
  let next: NextFunction;
  let mockProfileResponse: any;
  let mockActiveUsersResponse: any;

  beforeEach(() => {
    req = {
      user: {
        userId: 'user123',
        id: 'user123',
        email: 'test@example.com',
        role: 'user'
      },
      params: {},
      body: {}
    };

    res = {
      json: vi.fn(),
      success: vi.fn().mockReturnThis()
    };

    next = vi.fn() as unknown as NextFunction;

    mockProfileResponse = {
      status: 'success',
      data: {
        username: 'testuser',
        email: 'test@example.com',
        avatar: 'avatar.png',
        bio: 'Test bio',
        level: 5,
        stats: {
          points: 1200,
          streak: 7,
          completedChallenges: 25
        }
      }
    };

    mockActiveUsersResponse = {
      users: [
        {
          id: 'user1',
          username: 'user1',
          avatar: 'avatar1.png',
          lastActive: new Date()
        },
        {
          id: 'user2',
          username: 'user2',
          avatar: 'avatar2.png',
          lastActive: new Date()
        },
        {
          id: 'user3',
          username: 'user3',
          avatar: 'avatar3.png',
          lastActive: new Date()
        }
      ]
    };

    vi.clearAllMocks();
  });

  describe('getUserProfile', () => {
    it('should return user profile when user ID is provided', async () => {
      vi.mocked(userService.getUserProfile).mockResolvedValue(mockProfileResponse);

      await getUserProfile(req as Request, res as Response, next);

      expect(userService.getUserProfile).toHaveBeenCalledWith('user123');
      expect(res.success).toHaveBeenCalledWith(mockProfileResponse.data, 'Profil użytkownika pobrany pomyślnie');
      expect(next).not.toHaveBeenCalled();
    });

    it('should use profile ID from params if provided', async () => {
      req.params = { id: 'otherUser456' };
      
      vi.mocked(userService.getUserProfile).mockResolvedValue(mockProfileResponse);

      await getUserProfile(req as Request, res as Response, next);

      expect(userService.getUserProfile).toHaveBeenCalledWith('otherUser456');
      expect(res.success).toHaveBeenCalledWith(mockProfileResponse.data, 'Profil użytkownika pobrany pomyślnie');
    });

    it('should handle missing user ID', async () => {
      req.user = undefined;
      req.params = {};

      await getUserProfile(req as Request, res as Response, next);

      expect(userService.getUserProfile).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(AuthError));
      expect(res.success).not.toHaveBeenCalled();
    });

    it('should pass service errors to next middleware', async () => {
      const mockError = new Error('Service error');
      vi.mocked(userService.getUserProfile).mockRejectedValue(mockError);

      await getUserProfile(req as Request, res as Response, next);

      expect(userService.getUserProfile).toHaveBeenCalledWith('user123');
      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.success).not.toHaveBeenCalled();
    });
  });

  describe('getActiveUsers', () => {
    it('should return active users', async () => {
      vi.mocked(userService.getActiveUsers).mockResolvedValue(mockActiveUsersResponse.users);

      await getActiveUsers(req as Request, res as Response, next);

      expect(userService.getActiveUsers).toHaveBeenCalled();
      expect(res.success).toHaveBeenCalledWith(mockActiveUsersResponse.users, 'Aktywni użytkownicy pobrani pomyślnie');
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle service errors', async () => {
      const mockError = new Error('Service error');
      vi.mocked(userService.getActiveUsers).mockRejectedValue(mockError);

      await getActiveUsers(req as Request, res as Response, next);

      expect(userService.getActiveUsers).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.success).not.toHaveBeenCalled();
    });
  });
}); 