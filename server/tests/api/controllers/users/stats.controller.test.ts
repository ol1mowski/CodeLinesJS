import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUserStats, getUserProgress, updateUserStats } from '../../../../src/api/controllers/users/stats.controller.js';
import { userService } from '../../../../src/services/users/user.service.js';
import { Request, Response, NextFunction } from 'express';
import { AuthError } from '../../../../src/utils/errors.js';

vi.mock('../../../../src/services/users/user.service.js', () => ({
  userService: {
    getUserStats: vi.fn(),
    getUserProgress: vi.fn(),
    updateUserStats: vi.fn()
  }
}));

describe('User Stats Controller', () => {
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
      },
      body: {}
    };

    res = {
      json: vi.fn()
    };

    next = vi.fn() as unknown as NextFunction;
    vi.clearAllMocks();
  });

  describe('getUserStats', () => {
    it('should return user stats when user ID is provided', async () => {
      const mockStatsResponse = {
        status: 'success',
        data: {
          points: 1200,
          level: 5,
          streak: 7,
          bestStreak: 10,
          pointsToNextLevel: 800,
          completedChallenges: 20,
          badges: [],
          lastActive: new Date().toISOString(),
          learningPaths: [],
          chartData: {
            daily: [],
            progress: []
          }
        }
      };

      vi.mocked(userService.getUserStats).mockResolvedValue(mockStatsResponse as any);

      await getUserStats(req as Request, res as Response, next);

      expect(userService.getUserStats).toHaveBeenCalledWith('user123');
      expect(res.json).toHaveBeenCalledWith(mockStatsResponse);
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle missing user ID', async () => {
      req.user = undefined;

      await getUserStats(req as Request, res as Response, next);

      expect(userService.getUserStats).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(AuthError));
      expect(res.json).not.toHaveBeenCalled();
    });

    it('should pass service errors to next middleware', async () => {
      const mockError = new Error('Service error');
      vi.mocked(userService.getUserStats).mockRejectedValue(mockError);

      await getUserStats(req as Request, res as Response, next);

      expect(userService.getUserStats).toHaveBeenCalledWith('user123');
      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('getUserProgress', () => {
    it('should return user progress when user ID is provided', async () => {
      const mockProgressResponse = {
        status: 'success',
        data: [
          {
            pathId: 'path1',
            title: 'JavaScript Basics',
            status: 'active',
            progress: {
              completed: 3,
              total: 10,
              percentage: 30,
              lastActivity: new Date().toISOString(),
              startedAt: new Date().toISOString(),
              completedAt: null
            }
          },
          {
            pathId: 'path2',
            title: 'React Fundamentals',
            status: 'completed',
            progress: {
              completed: 8,
              total: 8,
              percentage: 100,
              lastActivity: new Date().toISOString(),
              startedAt: new Date().toISOString(),
              completedAt: new Date().toISOString()
            }
          }
        ]
      };

      vi.mocked(userService.getUserProgress).mockResolvedValue(mockProgressResponse as any);

      await getUserProgress(req as Request, res as Response, next);

      expect(userService.getUserProgress).toHaveBeenCalledWith('user123');
      expect(res.json).toHaveBeenCalledWith(mockProgressResponse);
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle missing user ID', async () => {
      req.user = undefined;

      await getUserProgress(req as Request, res as Response, next);

      expect(userService.getUserProgress).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(AuthError));
      expect(res.json).not.toHaveBeenCalled();
    });

    it('should pass service errors to next middleware', async () => {
      const mockError = new Error('Service error');
      vi.mocked(userService.getUserProgress).mockRejectedValue(mockError);

      await getUserProgress(req as Request, res as Response, next);

      expect(userService.getUserProgress).toHaveBeenCalledWith('user123');
      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });

  describe('updateUserStats', () => {
    it('should update user stats and return updated data', async () => {
      const statsUpdateData = {
        points: 50,
        xp: 30
      };

      req.body = statsUpdateData;

      const mockUpdatedStatsResponse = {
        status: 'success',
        data: {
          points: 1250,
          level: 5,
          streak: 7,
          bestStreak: 10,
          lastActive: new Date().toISOString(),
          chartData: {
            daily: { date: new Date().toISOString().split('T')[0], points: 50 }
          }
        }
      };

      vi.mocked(userService.updateUserStats).mockResolvedValue(mockUpdatedStatsResponse as any);

      await updateUserStats(req as Request, res as Response, next);

      expect(userService.updateUserStats).toHaveBeenCalledWith('user123', statsUpdateData);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedStatsResponse);
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle missing user ID', async () => {
      req.user = undefined;

      await updateUserStats(req as Request, res as Response, next);

      expect(userService.updateUserStats).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(AuthError));
      expect(res.json).not.toHaveBeenCalled();
    });

    it('should pass service errors to next middleware', async () => {
      const mockError = new Error('Service error');
      vi.mocked(userService.updateUserStats).mockRejectedValue(mockError);

      await updateUserStats(req as Request, res as Response, next);

      expect(userService.updateUserStats).toHaveBeenCalledWith('user123', req.body);
      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});