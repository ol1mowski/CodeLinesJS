import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRanking } from '../../../../src/api/controllers/ranking/ranking.controller.js';
import { NextFunction, Response, Request } from 'express';
import { User } from '../../../../src/models/user.model.js';
import { Types } from 'mongoose';

const userId = '507f1f77bcf86cd799439011';

vi.mock('../../../../src/models/user.model.js', () => ({
  User: {
    find: vi.fn().mockReturnThis(),
    findOne: vi.fn().mockReturnThis(),
    countDocuments: vi.fn().mockResolvedValue(3),
    select: vi.fn().mockReturnThis(),
    sort: vi.fn().mockReturnThis(),
    skip: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    lean: vi.fn()
  }
}));

const mockedUser = vi.mocked(User);

interface CustomResponse extends Response {
  success: (data?: any, message?: string, statusCode?: number) => Response;
}

describe('getRanking', () => {
  let req: Partial<Request & { user?: any }>;
  let res: Partial<CustomResponse>;
  let next: NextFunction;
  let mockUsers: any[];
  
  beforeEach(() => {
    req = {
      query: {},
      user: {
        id: userId,
        userId,
        email: 'test@example.com',
        role: 'user'
      }
    };
    
    res = {
      json: vi.fn(),
      success: vi.fn().mockReturnThis()
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
    
    mockedUser.find.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      sort: vi.fn().mockReturnThis(),
      skip: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue(mockUsers)
    } as any);
    
    mockedUser.findOne.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue(mockUsers[2])
    } as any);
    
    mockedUser.countDocuments.mockResolvedValue(3);
    
    vi.clearAllMocks();
  });
  
  it('should return top users and current user ranking', async () => {
    await getRanking(req as Request, res as Response, next);
    
    expect(mockedUser.find).toHaveBeenCalledWith({});
    expect(mockedUser.find().select).toHaveBeenCalled();
    expect(mockedUser.find().sort).toHaveBeenCalled();
    
    expect(res.success).toHaveBeenCalledWith(
      expect.objectContaining({
        ranking: expect.any(Array),
        userStats: expect.objectContaining({
          rank: expect.any(Number),
          total: expect.any(Number)
        }),
        totalUsers: expect.any(Number),
        meta: expect.any(Object)
      }),
      'Ranking pobrany pomyślnie'
    );
    
    const successCall = (res.success as any).mock.calls[0][0];
    expect(successCall.ranking.length).toBe(3);
    
    const currentUserEntry = successCall.ranking.find((u: any) => u.username === 'currentuser');
    expect(currentUserEntry?.isCurrentUser).toBe(true);
    
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
    
    const allUsers = [...topUsers, userRank12];
    
    mockedUser.find.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      sort: vi.fn().mockReturnThis(),
      skip: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue(allUsers)
    } as any);
    
    mockedUser.findOne.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue(userRank12)
    } as any);
    
    mockedUser.countDocuments.mockResolvedValueOnce(allUsers.length).mockResolvedValueOnce(11);
    
    await getRanking(req as Request, res as Response, next);
    
    expect(res.success).toHaveBeenCalledWith(
      expect.objectContaining({
        ranking: expect.any(Array),
        userStats: expect.objectContaining({
          rank: expect.any(Number)
        }),
        totalUsers: expect.any(Number),
        meta: expect.any(Object)
      }),
      'Ranking pobrany pomyślnie'
    );
  });
  
  it('should handle case when user is not authenticated', async () => {
    req.user = undefined;
    
    mockedUser.findOne.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue(null)
    } as any);
    
    await getRanking(req as Request, res as Response, next);
    
    expect(res.success).toHaveBeenCalledWith(
      expect.objectContaining({
        ranking: expect.any(Array),
        meta: expect.any(Object)
      }),
      'Ranking pobrany pomyślnie'
    );
    
    const successCall = (res.success as any).mock.calls[0][0];
    expect(successCall.ranking.length).toBeGreaterThanOrEqual(1);
    expect(successCall.ranking.every((item: any) => !item.isCurrentUser)).toBe(true);
  });
  
  it('should handle case when there are no users', async () => {
    mockedUser.find.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      sort: vi.fn().mockReturnThis(),
      skip: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue([])
    } as any);
    
    mockedUser.countDocuments.mockResolvedValue(0);
    
    mockedUser.findOne.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue(null)
    } as any);
    
    await getRanking(req as Request, res as Response, next);
    
    expect(res.success).toHaveBeenCalledWith(
      expect.objectContaining({
        ranking: [],
        totalUsers: 0,
        meta: expect.any(Object)
      }),
      'Ranking pobrany pomyślnie'
    );
  });
  
  it('should call next with error when an exception occurs', async () => {
    const mockError = new Error('Database error');
    
    mockedUser.countDocuments.mockRejectedValue(mockError);
    
    await getRanking(req as Request, res as Response, next);
    
    expect(res.success).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });
}); 