import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StatsService } from '../../../src/services/stats/stats.service.js';
import { User } from '../../../src/models/user.model.js';
import { LearningPath } from '../../../src/models/learningPath.model.js';
import { LevelService } from '../../../src/services/stats/level.service.js';
import { StreakService } from '../../../src/services/stats/streak.service.js';
import { ChartsService } from '../../../src/services/stats/charts.service.js';
import { ValidationError } from '../../../src/utils/errors.js';
import { Types } from 'mongoose';

vi.mock('../../../src/models/user.model.js', () => ({
  User: {
    findById: vi.fn()
  }
}));

vi.mock('../../../src/models/learningPath.model.js', () => ({
  LearningPath: {
    find: vi.fn()
  }
}));

vi.mock('../../../src/services/stats/level.service.js', () => ({
  LevelService: {
    getUserLevelStats: vi.fn(),
    updateUserLevel: vi.fn()
  }
}));

vi.mock('../../../src/services/stats/streak.service.js', () => ({
  StreakService: {
    updateUserStreak: vi.fn()
  }
}));

vi.mock('../../../src/services/stats/charts.service.js', () => ({
  ChartsService: {
    updateUserDailyStats: vi.fn()
  }
}));

describe('StatsService', () => {
  const userId = 'user123';
  const mockObjectId = new Types.ObjectId();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('getUserStats', () => {
    it('should return user stats', async () => {
      const mockUser = {
        _id: mockObjectId,
        username: 'testuser',
        stats: {
          points: 1200,
          xp: 1500,
          level: 5,
          streak: 7,
          bestStreak: 10,
          lastActive: new Date(),
          completedChallenges: 20,
          averageScore: 85,
          totalTimeSpent: 3600,
          badges: [],
          unlockedFeatures: [],
          chartData: {
            daily: [],
            progress: []
          },
          learningPaths: []
        }
      };
      
      const mockLearningPaths = [
        {
          _id: new Types.ObjectId(),
          title: 'JavaScript Basics',
          lessons: [
            { _id: new Types.ObjectId() },
            { _id: new Types.ObjectId() }
          ]
        },
        {
          _id: new Types.ObjectId(),
          title: 'React Fundamentals',
          lessons: [
            { _id: new Types.ObjectId() },
            { _id: new Types.ObjectId() }
          ]
        }
      ];
      
      const mockLevelStats = {
        level: 5,
        points: 1200,
        pointsToNextLevel: 300,
        progress: 75
      };
      
      vi.mocked(User.findById).mockReturnValue({
        select: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue(mockUser)
        })
      } as any);
      
      vi.mocked(LearningPath.find).mockReturnValue({
        lean: vi.fn().mockResolvedValue(mockLearningPaths)
      } as any);
      
      vi.mocked(LevelService.getUserLevelStats).mockReturnValue(mockLevelStats);
      
      const result = await StatsService.getUserStats(userId);
      
      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(LearningPath.find).toHaveBeenCalled();
      expect(LevelService.getUserLevelStats).toHaveBeenCalled();
      
      expect(result.status).toBe('success');
      expect(result.data.username).toBe(mockUser.username);
      expect(result.data.level).toBe(mockLevelStats.level);
      expect(result.data.points).toBe(mockLevelStats.points);
      expect(result.data.pointsToNextLevel).toBe(mockLevelStats.pointsToNextLevel);
      expect(result.data.levelProgress).toBe(mockLevelStats.progress);
      expect(result.data.streak).toBe(mockUser.stats.streak);
      expect(result.data.bestStreak).toBe(mockUser.stats.bestStreak);
    });
    
    it('should throw ValidationError when user not found', async () => {
      vi.mocked(User.findById).mockReturnValue({
        select: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue(null)
        })
      } as any);
      
      await expect(StatsService.getUserStats(userId)).rejects.toThrow(ValidationError);
    });
  });
  
  describe('getDailyStats', () => {
    it('should return daily stats', async () => {
      const mockDailyStats = [
        { date: '2023-08-01', points: 100, timeSpent: 60 },
        { date: '2023-08-02', points: 120, timeSpent: 75 }
      ];
      
      const mockUser = {
        _id: mockObjectId,
        stats: {
          chartData: {
            daily: mockDailyStats
          }
        }
      };
      
      vi.mocked(User.findById).mockReturnValue({
        select: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue(mockUser)
        })
      } as any);
      
      const result = await StatsService.getDailyStats(userId);
      
      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(result.status).toBe('success');
      expect(result.data).toEqual(mockDailyStats);
    });
    
    it('should return empty array when user has no daily stats', async () => {
      const mockUser = {
        _id: mockObjectId,
        stats: {
          chartData: {}
        }
      };
      
      vi.mocked(User.findById).mockReturnValue({
        select: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue(mockUser)
        })
      } as any);
      
      const result = await StatsService.getDailyStats(userId);
      
      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(result.status).toBe('success');
      expect(result.data).toEqual([]);
    });
    
    it('should throw ValidationError when user not found', async () => {
      vi.mocked(User.findById).mockReturnValue({
        select: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue(null)
        })
      } as any);
      
      await expect(StatsService.getDailyStats(userId)).rejects.toThrow(ValidationError);
    });
  });
  
  describe('updateStats', () => {
    it('should update user stats', async () => {
      const statsUpdateData = {
        points: 50,
        timeSpent: 30,
        completedChallenges: 2
      };
      
      const mockUser = {
        _id: mockObjectId,
        stats: {
          points: 1200,
          xp: 1500,
          level: 5,
          streak: 7,
          bestStreak: 10,
          lastActive: new Date(),
          completedChallenges: 20,
          averageScore: 85,
          totalTimeSpent: 3600,
          chartData: {
            daily: [],
            progress: []
          }
        },
        markModified: vi.fn(),
        save: vi.fn().mockResolvedValue(true)
      };
      
      const mockLevelUpdate = {
        leveledUp: true,
        levelsGained: 1
      };
      
      const mockLevelStats = {
        level: 6,
        points: 1250,
        pointsToNextLevel: 250,
        progress: 80
      };
      
      const mockStreakResult = {
        streak: 8,
        bestStreak: 10,
        streakUpdated: true
      };
      
      vi.mocked(User.findById).mockResolvedValue(mockUser as any);
      vi.mocked(LevelService.updateUserLevel).mockResolvedValue(mockLevelUpdate);
      vi.mocked(StreakService.updateUserStreak).mockReturnValue(mockStreakResult);
      vi.mocked(LevelService.getUserLevelStats).mockReturnValue(mockLevelStats);
      
      const result = await StatsService.updateStats(userId, statsUpdateData);
      
      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(LevelService.updateUserLevel).toHaveBeenCalledWith(mockUser, statsUpdateData.points);
      expect(StreakService.updateUserStreak).toHaveBeenCalledWith(mockUser);
      expect(ChartsService.updateUserDailyStats).toHaveBeenCalledWith(
        mockUser,
        statsUpdateData.points,
        statsUpdateData.timeSpent
      );
      
      expect(mockUser.markModified).toHaveBeenCalledWith('stats');
      expect(mockUser.save).toHaveBeenCalled();
      
      expect(result.status).toBe('success');
      expect(result.data.level).toBe(mockLevelStats.level);
      expect(result.data.points).toBe(mockLevelStats.points);
      expect(result.data.leveledUp).toBe(mockLevelUpdate.leveledUp);
      expect(result.data.levelsGained).toBe(mockLevelUpdate.levelsGained);
    });
    
    it('should initialize user stats if not present', async () => {
      const statsUpdateData = {
        points: 50,
        timeSpent: 30
      };
      
      const mockUser = {
        _id: mockObjectId,
        markModified: vi.fn(),
        save: vi.fn().mockResolvedValue(true)
      };
      
      const mockLevelUpdate = {
        leveledUp: false,
        levelsGained: 0
      };
      
      const mockLevelStats = {
        level: 1,
        points: 50,
        pointsToNextLevel: 450,
        progress: 10
      };
      
      const mockStreakResult = {
        streak: 1,
        bestStreak: 1, 
        streakUpdated: true
      };
      
      vi.mocked(User.findById).mockResolvedValue(mockUser as any);
      vi.mocked(LevelService.updateUserLevel).mockResolvedValue(mockLevelUpdate);
      vi.mocked(StreakService.updateUserStreak).mockReturnValue(mockStreakResult);
      vi.mocked(LevelService.getUserLevelStats).mockReturnValue(mockLevelStats);
      
      await StatsService.updateStats(userId, statsUpdateData);
      
      expect((mockUser as any).stats).toBeDefined();
      expect(mockUser.markModified).toHaveBeenCalledWith('stats');
      expect(mockUser.save).toHaveBeenCalled();
    });
    
    it('should throw ValidationError when user not found', async () => {
      vi.mocked(User.findById).mockResolvedValue(null);
      
      await expect(StatsService.updateStats(userId, { points: 50 })).rejects.toThrow(ValidationError);
    });
  });
}); 