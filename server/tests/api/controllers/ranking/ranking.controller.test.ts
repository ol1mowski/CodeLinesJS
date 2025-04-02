import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRanking } from '../../../../src/api/controllers/ranking/ranking.controller.js';
import { NextFunction, Response, Request } from 'express';
import { User } from '../../../../src/models/user.model.js';
import { Types } from 'mongoose';

const userId = '507f1f77bcf86cd799439011';

vi.mock('../../../../src/models/user.model.js', () => ({
  User: {
    find: vi.fn()
  }
}));

const mockedUser = vi.mocked(User);

describe('getRanking', () => {
  let req: Partial<Request & { user?: any }>;
  let res: Partial<Response>;
  let next: NextFunction;
  let mockUsers: any[];
  
  beforeEach(() => {
    req = {
      user: {
        id: userId,
        userId,
        email: 'test@example.com',
        role: 'user'
      }
    };
    
    res = {
      json: vi.fn()
    };
    
    next = vi.fn() as unknown as NextFunction;
    
    mockUsers = [
      {
        _id: new Types.ObjectId('507f1f77bcf86cd799439001'),
        username: 'user1',
        avatar: 'avatar1.png',
        stats: {
          points: 5000,
          level: 10,
          streak: 7,
          bestStreak: 15,
          lastActive: new Date()
        }
      },
      {
        _id: new Types.ObjectId('507f1f77bcf86cd799439002'),
        username: 'user2',
        avatar: 'avatar2.png',
        stats: {
          points: 4500,
          level: 9,
          streak: 5,
          bestStreak: 10,
          lastActive: new Date()
        }
      },
      {
        _id: new Types.ObjectId(userId),
        username: 'currentuser',
        avatar: 'avatar3.png',
        stats: {
          points: 4000,
          level: 8,
          streak: 3,
          bestStreak: 7,
          lastActive: new Date()
        }
      }
    ];
    
    const mockSelectFn = vi.fn().mockReturnThis();
    const mockSortFn = vi.fn().mockReturnThis();
    const mockLeanFn = vi.fn().mockResolvedValue(mockUsers);
    
    const mockFindChain = {
      select: mockSelectFn,
      sort: mockSortFn,
      lean: mockLeanFn
    };
    
    mockedUser.find = vi.fn().mockReturnValue(mockFindChain);
    
    vi.clearAllMocks();
  });
  
  it('should return top users and current user ranking', async () => {
    await getRanking(req as Request, res as Response, next);
    
    expect(mockedUser.find).toHaveBeenCalledWith({});
    expect(mockedUser.find().select).toHaveBeenCalled();
    expect(mockedUser.find().sort).toHaveBeenCalled();
    
    const firstCall = (res.json as any).mock.calls[0][0];
    expect(firstCall.ranking.length).toBe(3);
    
    // Sprawdzamy, czy użytkownik z mocka jest oznaczony jako aktualny użytkownik
    const currentUserEntry = firstCall.ranking.find((u: any) => u.username === 'currentuser');
    expect(currentUserEntry.isCurrentUser).toBe(true);
    
    // Sprawdzamy, czy statystyki aktualnego użytkownika są poprawne
    expect(firstCall.userStats).toEqual({
      rank: 3,
      total: 3,
      username: 'currentuser',
      avatar: 'avatar3.png',
      stats: {
        points: 4000,
        level: 8,
        streak: 3,
        bestStreak: 7,
        lastActive: expect.any(Date)
      },
      isCurrentUser: true
    });
    
    expect(next).not.toHaveBeenCalled();
  });
  
  it('should handle case when current user is not in top 10', async () => {
    const topUsers = Array(10).fill(0).map((_, i) => ({
      _id: new Types.ObjectId(`507f1f77bcf86cd7994390${i.toString().padStart(2, '0')}`),
      username: `topuser${i+1}`,
      avatar: `avatar${i+1}.png`,
      stats: {
        points: 10000 - i * 500,
        level: 20 - i,
        streak: 10 - i,
        bestStreak: 20 - i,
        lastActive: new Date()
      }
    }));
    
    const userRank12 = {
      _id: new Types.ObjectId(userId),
      username: 'currentuser',
      avatar: 'currentavatar.png',
      stats: {
        points: 3000,
        level: 6,
        streak: 2,
        bestStreak: 5,
        lastActive: new Date()
      }
    };
    
    const lowerRankedUsers = Array(5).fill(0).map((_, i) => ({
      _id: new Types.ObjectId(`507f1f77bcf86cd7994391${i.toString().padStart(2, '0')}`),
      username: `loweruser${i+1}`,
      avatar: `loweravatar${i+1}.png`,
      stats: {
        points: 2500 - i * 100,
        level: 5 - i,
        streak: 1,
        bestStreak: 3,
        lastActive: new Date()
      }
    }));
    
    // Dodajemy element, który umieści użytkownika na 12. pozycji
    const extraUser = {
      _id: new Types.ObjectId('507f1f77bcf86cd799439022'),
      username: 'extrauser',
      avatar: 'extraavatar.png',
      stats: {
        points: 3500,
        level: 7,
        streak: 1,
        bestStreak: 3,
        lastActive: new Date()
      }
    };
    
    const allUsers = [...topUsers, extraUser, userRank12, ...lowerRankedUsers];
    
    const mockSelectFn = vi.fn().mockReturnThis();
    const mockSortFn = vi.fn().mockReturnThis();
    const mockLeanFn = vi.fn().mockResolvedValue(allUsers);
    
    const mockFindChain = {
      select: mockSelectFn,
      sort: mockSortFn,
      lean: mockLeanFn
    };
    
    mockedUser.find = vi.fn().mockReturnValue(mockFindChain);
    
    await getRanking(req as Request, res as Response, next);
    
    const result = (res.json as any).mock.calls[0][0];
    
    // Powinniśmy mieć 10 użytkowników top + separator + kilka elementów wokół użytkownika (minimum 1)
    expect(result.ranking.length).toBeGreaterThan(10);
    expect(result.ranking[10]).toEqual({ isSeparator: true });
    expect(result.ranking.some((item: any) => item.username === 'currentuser')).toBe(true);
    
    // Sprawdzamy, czy statystyki aktualnego użytkownika są poprawne
    expect(result.userStats.rank).toBe(12);
    expect(result.totalUsers).toBe(allUsers.length);
  });
  
  it('should handle case when user is not authenticated', async () => {
    req.user = undefined;
    
    await getRanking(req as Request, res as Response, next);
    
    const result = (res.json as any).mock.calls[0][0];
    
    expect(result.ranking.length).toBeLessThanOrEqual(10);
    expect(result.userStats).toBeNull();
    expect(result.totalUsers).toBe(mockUsers.length);
  });
  
  it('should handle case when there are no users', async () => {
    const mockSelectFn = vi.fn().mockReturnThis();
    const mockSortFn = vi.fn().mockReturnThis();
    const mockLeanFn = vi.fn().mockResolvedValue([]);
    
    const mockFindChain = {
      select: mockSelectFn,
      sort: mockSortFn,
      lean: mockLeanFn
    };
    
    mockedUser.find = vi.fn().mockReturnValue(mockFindChain);
    
    await getRanking(req as Request, res as Response, next);
    
    expect(res.json).toHaveBeenCalledWith({
      ranking: [],
      userStats: null,
      totalUsers: 0
    });
  });
  
  it('should call next with error when an exception occurs', async () => {
    const mockError = new Error('Database error');
    
    const mockSelectFn = vi.fn().mockReturnThis();
    const mockSortFn = vi.fn().mockReturnThis();
    const mockLeanFn = vi.fn().mockRejectedValue(mockError);
    
    const mockFindChain = {
      select: mockSelectFn,
      sort: mockSortFn,
      lean: mockLeanFn
    };
    
    mockedUser.find = vi.fn().mockReturnValue(mockFindChain);
    
    await getRanking(req as Request, res as Response, next);
    
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });
}); 