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

describe('User Profile Controller', () => {
  let req: Partial<Request & { user?: { userId: string; id: string; email: string; role: string } }>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      user: {
        userId: 'user123',
        id: 'user123',
        email: 'test@example.com',
        role: 'user'
      }
    };

    res = {
      json: vi.fn()
    };

    next = vi.fn() as unknown as NextFunction;
    vi.clearAllMocks();
  });

  describe('getUserProfile', () => {
    it('should return user profile when user ID is provided', async () => {
      const mockProfileResponse = {
        status: 'success',
        data: {
          username: 'testuser',
          email: 'test@example.com',
          profile: {
            bio: 'Test bio',
            avatar: 'avatar.jpg'
          },
          preferences: {
            theme: 'dark',
            language: 'en'
          },
          stats: {
            level: 5
          }
        }
      };

      vi.mocked(userService.getUserProfile).mockResolvedValue(mockProfileResponse);

      await getUserProfile(req as Request, res as Response, next);

      expect(userService.getUserProfile).toHaveBeenCalledWith('user123');
      expect(res.json).toHaveBeenCalledWith(mockProfileResponse);
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle missing user ID', async () => {
      req.user = undefined;

      await getUserProfile(req as Request, res as Response, next);

      expect(userService.getUserProfile).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(AuthError));
      expect(res.json).not.toHaveBeenCalled();
    });

    it('should pass service errors to next middleware', async () => {
      const mockError = new Error('Service error');
      vi.mocked(userService.getUserProfile).mockRejectedValue(mockError);

      await getUserProfile(req as Request, res as Response, next);

      expect(userService.getUserProfile).toHaveBeenCalledWith('user123');
      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('getActiveUsers', () => {
    it('should return active users', async () => {
      const mockActiveUsersResponse = {
        users: [
          { username: 'user1' },
          { username: 'user2' },
          { username: 'user3' }
        ]
      };

      vi.mocked(userService.getActiveUsers).mockResolvedValue(mockActiveUsersResponse);

      await getActiveUsers(req as Request, res as Response, next);

      expect(userService.getActiveUsers).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockActiveUsersResponse);
      expect(next).not.toHaveBeenCalled();
    });

    it('should pass service errors to next middleware', async () => {
      const mockError = new Error('Service error');
      vi.mocked(userService.getActiveUsers).mockRejectedValue(mockError);

      await getActiveUsers(req as Request, res as Response, next);

      expect(userService.getActiveUsers).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });
}); 