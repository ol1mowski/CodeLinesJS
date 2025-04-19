import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLeaderboardController } from '../../../../src/api/controllers/progress/getLeaderboard.js';
import { ProgressService } from '../../../../src/services/progress/index.js';
import { NextFunction} from 'express';
import { IUserRequest, LeaderboardQueryDTO } from '../../../../src/types/progress/index.js';
import { mockResponseUtils } from '../../../setup/setupResponseMocks.js';

declare global {
  namespace Express {
    interface Response {
      success: any;
    }
  }
}

vi.mock('../../../../src/services/progress/index.js', () => ({
  ProgressService: {
    getLeaderboard: vi.fn()
  }
}));

describe('getLeaderboardController', () => {
  let req: Partial<IUserRequest & { query: LeaderboardQueryDTO }>;
  let res: ReturnType<typeof mockResponseUtils.createMockResponse>;
  let next: NextFunction;
  
  beforeEach(() => {
    req = {
      user: {
        userId: 'user123',
        email: 'test@example.com',
        role: 'user'
      },
      query: {
        limit: '10',
        type: 'points'
      }
    };
    
    res = mockResponseUtils.createMockResponse();
    
    next = vi.fn() as unknown as NextFunction;
    
    vi.clearAllMocks();
  });
  
  it('should fetch leaderboard data with default parameters and return it in response', async () => {
    const mockLeaderboardData = {
      leaderboard: [
        {
          id: 'user456',
          username: 'topuser',
          avatar: 'avatar1.png',
          level: 10,
          rank: 1,
          value: 5000,
          isCurrentUser: false
        },
        {
          id: 'user123',
          username: 'currentuser',
          avatar: 'avatar2.png',
          level: 5,
          rank: 2,
          value: 2500,
          isCurrentUser: true
        }
      ],
      currentUser: {
        id: 'user123',
        username: 'currentuser',
        avatar: 'avatar2.png',
        level: 5,
        rank: 2,
        value: 2500
      },
      type: 'points'
    };
    
    ProgressService.getLeaderboard = vi.fn().mockResolvedValue(mockLeaderboardData);
    
    await getLeaderboardController(req as IUserRequest & { query: LeaderboardQueryDTO }, res as any, next);
    
    expect(ProgressService.getLeaderboard).toHaveBeenCalledWith('user123', {
      limit: '10',
      type: 'points'
    });
    expect(res.success).toHaveBeenCalledWith(mockLeaderboardData, 'Dane rankingowe pobrane pomyślnie');
    expect(next).not.toHaveBeenCalled();
  });
  
  it('should pass custom query parameters to service', async () => {
    req.query = {
      limit: '5',
      type: 'streak'
    };
    
    const mockLeaderboardData = {
      leaderboard: [],
      currentUser: {
        id: 'user123',
        username: 'currentuser',
        avatar: 'avatar2.png',
        level: 5,
        rank: 10,
        value: 3
      },
      type: 'streak'
    };
    
    ProgressService.getLeaderboard = vi.fn().mockResolvedValue(mockLeaderboardData);
    
    await getLeaderboardController(req as IUserRequest & { query: LeaderboardQueryDTO }, res as any, next);
    
    expect(ProgressService.getLeaderboard).toHaveBeenCalledWith('user123', {
      limit: '5',
      type: 'streak'
    });
    expect(res.success).toHaveBeenCalledWith(mockLeaderboardData, 'Dane rankingowe pobrane pomyślnie');
  });
  
  it('should call next with error when service throws exception', async () => {
    const mockError = new Error('Database error');
    
    ProgressService.getLeaderboard = vi.fn().mockRejectedValue(mockError);
    
    await getLeaderboardController(req as IUserRequest & { query: LeaderboardQueryDTO }, res as any, next);
    
    expect(ProgressService.getLeaderboard).toHaveBeenCalledWith('user123', {
      limit: '10',
      type: 'points'
    });
    expect(res.success).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });
}); 