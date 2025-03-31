import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ActivityService } from '../../src/services/activity.service.js';
import { ValidationError } from '../../src/utils/errors.js';
import { User } from '../../src/models/user.model.js';
import { LevelService } from '../../src/services/level.service.js';


vi.mock('../../src/models/user.model.js', () => ({
  User: {
    findById: vi.fn()
  }
}));

vi.mock('../../src/services/level.service.js', () => ({
  LevelService: {
    updateUserLevelAndStreak: vi.fn(),
    getUserLevelStats: vi.fn()
  }
}));

describe('ActivityService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('findUserById', () => {
    it('should find a user by id', async () => {
      const mockUser = { id: 'user123', name: 'Test User' };
      // @ts-ignore
      User.findById.mockResolvedValue(mockUser);

      const result = await ActivityService.findUserById('user123');
      
      expect(User.findById).toHaveBeenCalledWith('user123');
      expect(result).toEqual(mockUser);
    });

    it('should throw ValidationError when user is not found', async () => {
      // @ts-ignore
      User.findById.mockResolvedValue(null);

      await expect(ActivityService.findUserById('nonexistent')).rejects.toThrow(ValidationError);
      await expect(ActivityService.findUserById('nonexistent')).rejects.toThrow('Nie znaleziono użytkownika');
    });
  });

  describe('updateUserLevelAndActivity', () => {
    it('should update user level and activity', async () => {
      const userId = 'user123';
      const points = 100;
      const progress = { points: 100, challenges: 5, timeSpent: 300 };
      
      const mockLevelResult = {
        level: {
          level: 2,
          leveledUp: true,
          levelsGained: 1
        },
        streak: 3,
        dailyProgress: {
          date: '2024-03-30',
          points: 100,
          challenges: 5,
          timeSpent: 300
        }
      };

      const mockUser = {
        id: userId,
        stats: {
          bestStreak: 5,
          totalTimeSpent: 3000,
          completedChallenges: 50
        }
      };

      // @ts-ignore
      LevelService.updateUserLevelAndStreak.mockResolvedValue(mockLevelResult);
      // @ts-ignore
      vi.spyOn(ActivityService, 'findUserById').mockResolvedValue(mockUser);

      const result = await ActivityService.updateUserLevelAndActivity(userId, points, progress);

      expect(LevelService.updateUserLevelAndStreak).toHaveBeenCalledWith(userId, points, progress);
      expect(ActivityService.findUserById).toHaveBeenCalledWith(userId);
      
      expect(result).toEqual({
        level: mockLevelResult.level,
        streak: {
          streak: mockLevelResult.streak,
          bestStreak: mockUser.stats.bestStreak,
          streakUpdated: true,
          streakBroken: false,
          daysInactive: 0
        },
        dailyProgress: {
          dailyProgress: mockLevelResult.dailyProgress,
          totalTimeSpent: mockUser.stats.totalTimeSpent,
          completedChallenges: mockUser.stats.completedChallenges
        }
      });
    });
  });

  describe('prepareActivityResponse', () => {
    it('should prepare a response about activity with a message about leveling up', () => {
      const mockUser = {
        id: 'user123',
        stats: {
          level: 2,
          points: 300,
          pointsToNextLevel: 1000
        }
      };
      
      const mockUpdate = {
        level: {
          level: 2,
          leveledUp: true,
          levelsGained: 1
        },
        streak: {
          streak: 3,
          bestStreak: 5,
          streakUpdated: true,
          streakBroken: false,
          daysInactive: 0
        },
        dailyProgress: {
          dailyProgress: {
            date: '2024-03-30',
            points: 100,
            challenges: 5,
            timeSpent: 300
          },
          totalTimeSpent: 3000,
          completedChallenges: 50
        }
      };

      const mockLevelStats = {
        level: 2,
        points: 300,
        pointsToNextLevel: 1000,
        progress: 30
      };

      // @ts-ignore
      LevelService.getUserLevelStats.mockReturnValue(mockLevelStats);

      const result = ActivityService.prepareActivityResponse(mockUser, mockUpdate as any);

      expect(LevelService.getUserLevelStats).toHaveBeenCalledWith(mockUser);
      expect(result.status).toBe('success');
      expect(result.message).toContain('Awansowałeś na poziom');
      expect(result.data).toEqual({
        streak: {
          current: mockUpdate.streak.streak,
          best: mockUpdate.streak.bestStreak,
          updated: mockUpdate.streak.streakUpdated,
          broken: mockUpdate.streak.streakBroken,
          daysInactive: mockUpdate.streak.daysInactive,
        },
        dailyProgress: {
          date: mockUpdate.dailyProgress.dailyProgress.date,
          points: mockUpdate.dailyProgress.dailyProgress.points,
          challenges: mockUpdate.dailyProgress.dailyProgress.challenges,
          timeSpent: mockUpdate.dailyProgress.dailyProgress.timeSpent,
        },
        level: {
          level: mockLevelStats.level,
          points: mockLevelStats.points,
          pointsRequired: mockLevelStats.pointsToNextLevel,
          progress: mockLevelStats.progress,
          leveledUp: mockUpdate.level.leveledUp,
          levelsGained: mockUpdate.level.levelsGained,
        },
        stats: {
          totalTimeSpent: mockUpdate.dailyProgress.totalTimeSpent,
          completedChallenges: mockUpdate.dailyProgress.completedChallenges,
        },
      });
    });

    it('should prepare a standard response about activity without leveling up', () => {
      const mockUser = {
        id: 'user123',
        stats: {
          level: 2,
          points: 300,
          pointsToNextLevel: 1000
        }
      };
      
      const mockUpdate = {
        level: {
          level: 2,
          leveledUp: false,
          levelsGained: 0
        },
        streak: {
          streak: 3,
          bestStreak: 5,
          streakUpdated: true,
          streakBroken: false,
          daysInactive: 0
        },
        dailyProgress: {
          dailyProgress: {
            date: '2024-03-30',
            points: 100,
            challenges: 5,
            timeSpent: 300
          },
          totalTimeSpent: 3000,
          completedChallenges: 50
        }
      };

      const mockLevelStats = {
        level: 2,
        points: 300,
        pointsToNextLevel: 1000,
        progress: 30
      };

      // @ts-ignore
      LevelService.getUserLevelStats.mockReturnValue(mockLevelStats);

      const result = ActivityService.prepareActivityResponse(mockUser, mockUpdate as any);

      expect(LevelService.getUserLevelStats).toHaveBeenCalledWith(mockUser);
      expect(result.status).toBe('success');
      expect(result.message).toBe('Aktywność zaktualizowana pomyślnie');
      expect(result.data.level.leveledUp).toBe(false);
    });
  });

  describe('prepareStreakResponse', () => {
    it('should prepare a response about streak', () => {
      const mockUser = {
        id: 'user123',
        stats: {
          streak: 3,
          bestStreak: 5
        }
      };

      const result = ActivityService.prepareStreakResponse(mockUser);

      expect(result).toEqual({
        status: 'success',
        data: {
          streak: 3,
          bestStreak: 5
        }
      });
    });

    it('should handle missing data statistics', () => {
      const mockUser = {
        id: 'user123'
      };

      const result = ActivityService.prepareStreakResponse(mockUser);

      expect(result).toEqual({
        status: 'success',
        data: {
          streak: 0,
          bestStreak: 0
        }
      });
    });
  });

  describe('prepareDailyProgressResponse', () => {
    it('should prepare a response about daily progress', () => {
      const mockUser = {
        id: 'user123',
        stats: {
          dailyProgress: {
            date: '2024-03-30',
            points: 100,
            challenges: 5,
            timeSpent: 300
          }
        }
      };

      const mockLevelStats = {
        level: 2,
        points: 300,
        pointsToNextLevel: 1000,
        progress: 30
      };

      // @ts-ignore
      LevelService.getUserLevelStats.mockReturnValue(mockLevelStats);

      const result = ActivityService.prepareDailyProgressResponse(mockUser);

      expect(LevelService.getUserLevelStats).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual({
        status: 'success',
        data: {
          dailyProgress: mockUser.stats.dailyProgress,
          level: {
            level: mockLevelStats.level,
            points: mockLevelStats.points,
            pointsRequired: mockLevelStats.pointsToNextLevel,
            progress: mockLevelStats.progress,
          }
        }
      });
    });

    it('should handle missing daily progress data', () => {
      const mockUser = {
        id: 'user123',
        stats: {}
      };

      const mockLevelStats = {
        level: 1,
        points: 0,
        pointsToNextLevel: 1000,
        progress: 0
      };

      // @ts-ignore
      LevelService.getUserLevelStats.mockReturnValue(mockLevelStats);

      const result = ActivityService.prepareDailyProgressResponse(mockUser);

      expect(result).toEqual({
        status: 'success',
        data: {
          dailyProgress: {},
          level: {
            level: mockLevelStats.level,
            points: mockLevelStats.points,
            pointsRequired: mockLevelStats.pointsToNextLevel,
            progress: mockLevelStats.progress,
          }
        }
      });
    });
  });

  describe('prepareActivityHistoryResponse', () => {
    it('should prepare a response about activity history', () => {
      const mockHistory = [
        { date: '2024-03-30', points: 100, challenges: 5, timeSpent: 300 },
        { date: '2024-03-29', points: 80, challenges: 4, timeSpent: 250 }
      ];
      
      const mockUser = {
        id: 'user123',
        stats: {
          activityHistory: mockHistory
        }
      };

      const result = ActivityService.prepareActivityHistoryResponse(mockUser);

      expect(result).toEqual({
        status: 'success',
        data: {
          activityHistory: mockHistory
        }
      });
    });

    it('should handle missing activity history data', () => {
      const mockUser = {
        id: 'user123',
        stats: {}
      };

      const result = ActivityService.prepareActivityHistoryResponse(mockUser);

      expect(result).toEqual({
        status: 'success',
        data: {
          activityHistory: []
        }
      });
    });
  });
}); 