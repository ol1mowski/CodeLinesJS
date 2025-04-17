import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserService } from '../../../src/services/users/user.service.js';
import { User } from '../../../src/models/user.model.js';
import { ValidationError } from '../../../src/utils/errors.js';
import { Types } from 'mongoose';

vi.mock('../../../src/models/user.model.js', () => ({
  User: {
    findById: vi.fn(),
    find: vi.fn()
  }
}));

describe('UserService', () => {
  let userService: UserService;
  const userId = new Types.ObjectId().toString();
  
  beforeEach(() => {
    userService = new UserService();
    vi.clearAllMocks();
  });
  
  describe('getUserProfile', () => {
    it('should return user profile when user exists', async () => {
      const mockUser = {
        _id: userId,
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
      };
      
      vi.mocked(User.findById).mockReturnValue({
        select: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue(mockUser)
        })
      } as any);
      
      const result = await userService.getUserProfile(userId);
      
      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(result.status).toBe('success');
      expect(result.data).toEqual({
        username: mockUser.username,
        email: mockUser.email,
        profile: mockUser.profile,
        preferences: mockUser.preferences,
        stats: {
          level: mockUser.stats.level
        }
      });
    });
    
    it('should throw ValidationError when user not found', async () => {
      vi.mocked(User.findById).mockReturnValue({
        select: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue(null)
        })
      } as any);
      
      await expect(userService.getUserProfile(userId)).rejects.toThrow(ValidationError);
      expect(User.findById).toHaveBeenCalledWith(userId);
    });
  });
  
  describe('getActiveUsers', () => {
    it('should return active users', async () => {
      const mockUsers = [
        { username: 'user1' },
        { username: 'user2' },
        { username: 'user3' }
      ];
      
      vi.mocked(User.find).mockReturnValue({
        select: vi.fn().mockReturnValue({
          limit: vi.fn().mockReturnValue({
            lean: vi.fn().mockResolvedValue(mockUsers)
          })
        })
      } as any);
      
      const result = await userService.getActiveUsers();
      
      expect(User.find).toHaveBeenCalled();
      expect(result.users).toHaveLength(3);
      expect(result.users[0].username).toBe('user1');
      expect(result.users[1].username).toBe('user2');
      expect(result.users[2].username).toBe('user3');
    });
  });
  
  describe('getUserProgress', () => {
    it('should return user progress when user exists', async () => {
      const mockUser = {
        _id: userId,
        stats: {
          learningPaths: [
            { pathId: new Types.ObjectId(), progress: { completedLessons: ['lesson1', 'lesson2'] } }
          ]
        }
      };
      
      vi.mocked(User.findById).mockReturnValue({
        select: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue(mockUser)
        })
      } as any);
      
      // Mock the private getLearningPaths method
      const getLearningPathsSpy = vi.spyOn(userService as any, 'getLearningPaths').mockResolvedValue([
        {
          _id: mockUser.stats.learningPaths[0].pathId,
          title: 'JavaScript Fundamentals',
          totalLessons: 10,
          level: 1
        }
      ]);
      
      const result = await userService.getUserProgress(userId);
      
      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(getLearningPathsSpy).toHaveBeenCalled();
      expect(result.status).toBe('success');
      expect(result.data).toBeInstanceOf(Array);
      expect(result.data[0]).toHaveProperty('pathId');
      expect(result.data[0]).toHaveProperty('title');
      expect(result.data[0]).toHaveProperty('status');
      expect(result.data[0]).toHaveProperty('progress');
    });
    
    it('should throw ValidationError when user not found', async () => {
      vi.mocked(User.findById).mockReturnValue({
        select: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue(null)
        })
      } as any);
      
      await expect(userService.getUserProgress(userId)).rejects.toThrow(ValidationError);
      expect(User.findById).toHaveBeenCalledWith(userId);
    });
  });
  
  describe('getUserStats', () => {
    it('should return user stats when user exists', async () => {
      const mockUser = {
        _id: userId,
        stats: {
          points: 1200,
          level: 5,
          streak: 7,
          bestStreak: 10,
          daily: [
            { date: '2023-08-01', points: 100 },
            { date: '2023-08-02', points: 120 }
          ],
          completedChallenges: 20,
          badges: [],
          lastActive: new Date()
        }
      };
      
      vi.mocked(User.findById).mockReturnValue({
        select: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue(mockUser)
        })
      } as any);
      
      // Mock the private getLearningPaths method
      const getLearningPathsSpy = vi.spyOn(userService as any, 'getLearningPaths').mockResolvedValue([
        {
          _id: new Types.ObjectId(),
          title: 'JavaScript Fundamentals',
          totalLessons: 10,
          level: 1
        }
      ]);
      
      const result = await userService.getUserStats(userId);
      
      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(result.status).toBe('success');
      expect(result.data).toHaveProperty('points', mockUser.stats.points);
      expect(result.data).toHaveProperty('level', mockUser.stats.level);
      expect(result.data).toHaveProperty('streak');
      expect(result.data).toHaveProperty('bestStreak', mockUser.stats.bestStreak);
      expect(result.data).toHaveProperty('completedChallenges', mockUser.stats.completedChallenges);
      expect(result.data).toHaveProperty('chartData');
    });
    
    it('should throw ValidationError when user not found', async () => {
      vi.mocked(User.findById).mockReturnValue({
        select: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue(null)
        })
      } as any);
      
      await expect(userService.getUserStats(userId)).rejects.toThrow(ValidationError);
      expect(User.findById).toHaveBeenCalledWith(userId);
    });
  });
  
  describe('updateUserStats', () => {
    it('should update user stats and return updated stats', async () => {
      const mockUser = {
        _id: userId,
        stats: {
          points: 1200,
          level: 5,
          streak: 7,
          bestStreak: 10,
          dailyData: [
            { date: '2023-08-01', points: 100 }
          ],
          lastActive: new Date()
        },
        markModified: vi.fn(),
        save: vi.fn().mockResolvedValue(true)
      };
      
      vi.mocked(User.findById).mockResolvedValue(mockUser as any);
      
      // Mock getUserStats to be called at the end of updateUserStats
      const getUserStatsSpy = vi.spyOn(userService, 'getUserStats').mockResolvedValue({
        status: 'success',
        data: {
          points: 1250,
          level: 5,
          streak: 7,
          bestStreak: 10,
          pointsToNextLevel: 750,
          completedChallenges: 20,
          badges: [],
          lastActive: new Date(),
          learningPaths: [],
          chartData: {
            daily: [
              { date: '2023-08-01', points: 100 },
              { date: new Date().toISOString().split('T')[0], points: 50 }
            ],
            progress: []
          }
        }
      });
      
      const result = await userService.updateUserStats(userId, { points: 50 });
      
      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(mockUser.markModified).toHaveBeenCalledWith('stats');
      expect(mockUser.save).toHaveBeenCalled();
      expect(getUserStatsSpy).toHaveBeenCalledWith(userId);
      expect(result.status).toBe('success');
      expect(result.data.points).toBe(1250);
    });
    
    it('should initialize stats if user has no stats', async () => {
      const mockUser = {
        _id: userId,
        markModified: vi.fn(),
        save: vi.fn().mockResolvedValue(true)
      };
      
      vi.mocked(User.findById).mockResolvedValue(mockUser as any);
      
      // Mock getUserStats to be called at the end of updateUserStats
      const getUserStatsSpy = vi.spyOn(userService, 'getUserStats').mockResolvedValue({
        status: 'success',
        data: {
          points: 50,
          level: 1,
          streak: 1,
          bestStreak: 1,
          pointsToNextLevel: 950,
          completedChallenges: 0,
          badges: [],
          lastActive: new Date(),
          learningPaths: [],
          chartData: {
            daily: [
              { date: new Date().toISOString().split('T')[0], points: 50 }
            ],
            progress: []
          }
        }
      });
      
      const result = await userService.updateUserStats(userId, { points: 50 });
      
      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(mockUser.markModified).toHaveBeenCalledWith('stats');
      expect(mockUser.save).toHaveBeenCalled();
      expect(getUserStatsSpy).toHaveBeenCalledWith(userId);
      expect(result.status).toBe('success');
      expect(result.data.points).toBe(50);
      expect(result.data.level).toBe(1);
    });
    
    it('should throw ValidationError when user not found', async () => {
      vi.mocked(User.findById).mockResolvedValue(null);
      
      await expect(userService.updateUserStats(userId, { points: 50 })).rejects.toThrow(ValidationError);
      expect(User.findById).toHaveBeenCalledWith(userId);
    });
  });
}); 