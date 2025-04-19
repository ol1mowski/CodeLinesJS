import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLearningPathsController } from '../../../../src/api/controllers/learningPath/getLearningPaths.js';
import { LearningPathService } from '../../../../src/services/learningPath/learningPath.service.js';
import { NextFunction } from 'express';
import { AuthRequest } from '../../../../src/services/learningPath/types.js';
import { mockResponseUtils } from '../../../setup/setupResponseMocks.js';

declare global {
  namespace Express {
    interface Response {
      success: any;
      fail: any;
    }
  }
}

vi.mock('../../../../src/services/learningPath/learningPath.service.js', () => ({
  LearningPathService: {
    getLearningPaths: vi.fn()
  }
}));

const mockedLearningPathService = vi.mocked(LearningPathService);

describe('getLearningPathsController', () => {
  let req: AuthRequest;
  let res: ReturnType<typeof mockResponseUtils.createMockResponse>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      user: {
        userId: 'user123',
        email: 'test@example.com',
        role: 'user'
      },
      query: {}
    } as unknown as AuthRequest;

    res = mockResponseUtils.createMockResponse();

    next = vi.fn() as unknown as NextFunction;

    vi.clearAllMocks();
  });

  it('should call LearningPathService.getLearningPaths and return the result', async () => {
    const mockResult = {
      paths: [
        {
          id: 'path1',
          title: 'JavaScript Basics',
          description: 'Learn JavaScript fundamentals',
          difficulty: 'beginner',
          estimatedTime: 120,
          requirements: [],
          outcomes: [],
          requiredLevel: 1,
          isAvailable: true,
          totalLessons: 10,
          progress: {
            completed: [],
            total: 10,
            percentage: 0,
            isStarted: false,
            isCompleted: false
          }
        }
      ],
      userStats: {
        level: 2,
        totalPoints: 500,
        totalPaths: 1,
        completedPaths: 0,
        pathsInProgress: 1
      }
    };

    mockedLearningPathService.getLearningPaths.mockResolvedValue(mockResult as any);

    await getLearningPathsController(req, res as any, next);

    expect(mockedLearningPathService.getLearningPaths).toHaveBeenCalledWith('user123', {});
    expect(res.success).toHaveBeenCalledWith(mockResult, 'Ścieżki nauki zostały pobrane');
    expect(next).not.toHaveBeenCalled();
  });

  it('should pass query parameters to the service', async () => {
    req.query = {
      difficulty: 'advanced',
      search: 'javascript'
    };

    const mockResult = {
      paths: [
        {
          id: 'path2',
          title: 'Advanced JavaScript',
          description: 'Learn advanced JavaScript concepts',
          difficulty: 'advanced',
          estimatedTime: 240,
          requirements: [],
          outcomes: [],
          requiredLevel: 3,
          isAvailable: true,
          totalLessons: 15,
          progress: {
            completed: [],
            total: 15,
            percentage: 0,
            isStarted: false,
            isCompleted: false
          }
        }
      ],
      userStats: {
        level: 4,
        totalPoints: 1200,
        totalPaths: 1,
        completedPaths: 0,
        pathsInProgress: 1
      }
    };

    mockedLearningPathService.getLearningPaths.mockResolvedValue(mockResult as any);

    await getLearningPathsController(req, res as any, next);

    expect(mockedLearningPathService.getLearningPaths).toHaveBeenCalledWith('user123', {
      difficulty: 'advanced',
      search: 'javascript'
    });
    expect(res.success).toHaveBeenCalledWith(mockResult, 'Ścieżki nauki zostały pobrane');
  });

  it('should pass errors to the next middleware', async () => {
    const mockError = new Error('Service error');
    mockedLearningPathService.getLearningPaths.mockRejectedValue(mockError);

    await getLearningPathsController(req, res as any, next);

    expect(mockedLearningPathService.getLearningPaths).toHaveBeenCalledWith('user123', {});
    expect(res.success).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });
}); 