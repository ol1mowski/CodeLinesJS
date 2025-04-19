import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getStats, getDailyStats, updateStats } from '../../../../src/api/controllers/stats/index.js';
import { StatsService } from '../../../../src/services/stats/stats.service.js';
import { Request, Response, NextFunction } from 'express';
import { AuthError } from '../../../../src/utils/errors.js';
import { StatsSuccessResponseDTO, DailyStatsResponseDTO, UserStatsDTO } from '../../../../src/services/stats/types.js';

vi.mock('../../../../src/services/stats/stats.service.js', () => ({
  StatsService: {
    getUserStats: vi.fn(),
    getDailyStats: vi.fn(),
    updateStats: vi.fn()
  }
}));
  
interface CustomResponse extends Response {
  success: (data?: any, message?: string, statusCode?: number) => Response;
}

describe('Stats Controllers', () => {
  let req: Partial<Request & { user?: { userId: string; id: string; email: string; role: string } }>;
  let res: Partial<CustomResponse>;
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
      json: vi.fn(),
      success: vi.fn().mockReturnThis()
    };
    
    next = vi.fn() as unknown as NextFunction;
    
    vi.clearAllMocks();
  });
  
  describe('getStats', () => {
    it('should return user stats', async () => {
      const mockUserStats: UserStatsDTO = {
        level: 5,
        points: 1200,
        xp: 1500,
        pointsToNextLevel: 300,
        levelProgress: 75,
        streak: 7,
        bestStreak: 10,
        lastActive: new Date().toISOString(),
        experiencePoints: 1500,
        nextLevelThreshold: 300,
        completedChallenges: 20,
        currentStreak: 7,
        averageScore: 85,
        totalTimeSpent: 3600,
        badges: [],
        unlockedFeatures: [],
        chartData: {
          daily: [],
          progress: []
        }
      };
      
      const mockResponse: StatsSuccessResponseDTO = {
        status: 'success',
        data: mockUserStats
      };
      
      vi.mocked(StatsService.getUserStats).mockResolvedValue(mockResponse);
      
      await getStats(req as Request, res as Response, next);
      
      expect(StatsService.getUserStats).toHaveBeenCalledWith('user123');
      expect(res.success).toHaveBeenCalledWith(mockResponse, 'Statystyki użytkownika pobrane pomyślnie');
      expect(next).not.toHaveBeenCalled();
    });
    
    it('should handle missing user ID', async () => {
      req.user = undefined;
      
      await getStats(req as Request, res as Response, next);
      
      expect(StatsService.getUserStats).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(AuthError));
      expect(res.success).not.toHaveBeenCalled();
    });
    
    it('should pass service errors to next middleware', async () => {
      const mockError = new Error('Service error');
      vi.mocked(StatsService.getUserStats).mockRejectedValue(mockError);
      
      await getStats(req as Request, res as Response, next);
      
      expect(StatsService.getUserStats).toHaveBeenCalledWith('user123');
      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.success).not.toHaveBeenCalled();
    });
  });
  
  describe('getDailyStats', () => {
    it('should return daily stats', async () => {
      const mockDailyStats = [
        { date: '2023-08-01', points: 100, timeSpent: 60 },
        { date: '2023-08-02', points: 120, timeSpent: 75 }
      ];
      
      const mockResponse: DailyStatsResponseDTO = {
        status: 'success',
        data: mockDailyStats
      };
      
      vi.mocked(StatsService.getDailyStats).mockResolvedValue(mockResponse);
      
      await getDailyStats(req as Request, res as Response, next);
      
      expect(StatsService.getDailyStats).toHaveBeenCalledWith('user123');
      expect(res.success).toHaveBeenCalledWith(mockResponse, 'Dzienne statystyki użytkownika pobrane pomyślnie');
      expect(next).not.toHaveBeenCalled();
    });
    
    it('should handle missing user ID', async () => {
      req.user = undefined;
      
      await getDailyStats(req as Request, res as Response, next);
      
      expect(StatsService.getDailyStats).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(AuthError));
      expect(res.success).not.toHaveBeenCalled();
    });
    
    it('should pass service errors to next middleware', async () => {
      const mockError = new Error('Service error');
      vi.mocked(StatsService.getDailyStats).mockRejectedValue(mockError);
      
      await getDailyStats(req as Request, res as Response, next);
      
      expect(StatsService.getDailyStats).toHaveBeenCalledWith('user123');
      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.success).not.toHaveBeenCalled();
    });
  });
  
  describe('updateStats', () => {
    it('should update stats and return updated data', async () => {
      const statsUpdateData = {
        points: 50,
        timeSpent: 30,
        completedChallenges: 2
      };
      
      req.body = statsUpdateData;
      
      const mockUpdatedStats: UserStatsDTO & { leveledUp: boolean; levelsGained: number } = {
        level: 6,
        points: 1250,
        xp: 1550,
        pointsToNextLevel: 250,
        levelProgress: 80,
        streak: 8,
        bestStreak: 10,
        lastActive: new Date().toISOString(),
        experiencePoints: 1550,
        nextLevelThreshold: 250,
        completedChallenges: 25,
        currentStreak: 8,
        averageScore: 85,
        totalTimeSpent: 3630,
        badges: [],
        unlockedFeatures: [],
        leveledUp: true,
        levelsGained: 1,
        chartData: {
          daily: [{ date: new Date().toISOString().split('T')[0], points: 50, timeSpent: 30 }],
          progress: []
        }
      };
      
      const mockResponse: StatsSuccessResponseDTO = {
        status: 'success',
        data: mockUpdatedStats
      };
      
      vi.mocked(StatsService.updateStats).mockResolvedValue(mockResponse);
      
      await updateStats(req as Request, res as Response, next);
      
      expect(StatsService.updateStats).toHaveBeenCalledWith('user123', statsUpdateData);
      expect(res.success).toHaveBeenCalledWith(mockResponse, 'Statystyki użytkownika zaktualizowane pomyślnie');
      expect(next).not.toHaveBeenCalled();
    });
    
    it('should handle missing user ID', async () => {
      req.user = undefined;
      
      await updateStats(req as Request, res as Response, next);
      
      expect(StatsService.updateStats).not.toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(expect.any(AuthError));
      expect(res.success).not.toHaveBeenCalled();
    });
    
    it('should pass service errors to next middleware', async () => {
      const mockError = new Error('Service error');
      vi.mocked(StatsService.updateStats).mockRejectedValue(mockError);
      
      await updateStats(req as Request, res as Response, next);
      
      expect(StatsService.updateStats).toHaveBeenCalledWith('user123', req.body);
      expect(next).toHaveBeenCalledWith(mockError);
      expect(res.success).not.toHaveBeenCalled();
    });
  });
}); 