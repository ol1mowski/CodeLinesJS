import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUserProgressController } from '../../../../src/api/controllers/progress/getUserProgress.js';
import { ProgressService } from '../../../../src/services/progress/index.js';
import { NextFunction} from 'express';
import { IUserRequest } from '../../../../src/types/progress/index.js';
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
    getUserProgress: vi.fn()
  }
}));

describe('getUserProgressController', () => {
  let req: Partial<IUserRequest>;
  let res: ReturnType<typeof mockResponseUtils.createMockResponse>;
  let next: NextFunction;
  
  beforeEach(() => {
    req = {
      user: {
        userId: 'user123',
        email: 'test@example.com',
        role: 'user'
      }
    };
    
    res = mockResponseUtils.createMockResponse();
    
    next = vi.fn() as unknown as NextFunction;
    
    vi.clearAllMocks();
  });
  
  it('should fetch user progress and return it in response', async () => {
    const mockProgressData = {
      level: 3,
      points: 450,
      pointsToNextLevel: 150,
      levelProgress: 75,
      streak: 5,
      bestStreak: 8,
      completedChallenges: 42,
      timeSpent: 3600,
      learningPaths: [
        {
          id: 'path123',
          title: 'JavaScript Basics',
          difficulty: 'beginner',
          progress: {
            completed: 8,
            total: 10,
            percentage: 80
          }
        }
      ]
    };
    
    ProgressService.getUserProgress = vi.fn().mockResolvedValue(mockProgressData);
    
    await getUserProgressController(req as IUserRequest, res as any, next);
    
    expect(ProgressService.getUserProgress).toHaveBeenCalledWith('user123');
    expect(res.success).toHaveBeenCalledWith(mockProgressData, 'Postęp użytkownika pobrany pomyślnie');
    expect(next).not.toHaveBeenCalled();
  });
  
  it('should call next with error when service throws exception', async () => {
    const mockError = new Error('User not found');
    
    ProgressService.getUserProgress = vi.fn().mockRejectedValue(mockError);
    
    await getUserProgressController(req as IUserRequest, res as any, next);
    
    expect(ProgressService.getUserProgress).toHaveBeenCalledWith('user123');
    expect(res.success).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });
}); 