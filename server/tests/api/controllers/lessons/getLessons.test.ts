import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLessonsController } from '../../../../src/api/controllers/lessons/getLessons.js';
import { NextFunction } from 'express';
import { Lesson } from '../../../../src/models/lesson.model.js';
import { User } from '../../../../src/models/user.model.js';
import { LevelService } from '../../../../src/services/level.service.js';
import { Types } from 'mongoose';
import { mockResponseUtils } from '../../../setup/setupResponseMocks.js';

declare global {
  namespace Express {
    interface Response {
      success: any;
      fail: any;
    }
  }
}

vi.mock('../../../../src/models/lesson.model.js', () => ({
  Lesson: {
    find: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    sort: vi.fn().mockReturnThis(),
    lean: vi.fn()
  }
}));

vi.mock('../../../../src/models/user.model.js', () => ({
  User: {
    findById: vi.fn(),
    select: vi.fn().mockReturnThis(),
    lean: vi.fn()
  }
}));

vi.mock('../../../../src/services/level.service.js', () => ({
  LevelService: {
    getUserLevelStats: vi.fn()
  }
}));

describe('getLessonsController', () => {
  let req: any;
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
    };
    
    res = mockResponseUtils.createMockResponse();
    
    next = vi.fn() as unknown as NextFunction;
    
    vi.clearAllMocks();
  });
  
  
  it('should handle query parameters (category, difficulty, search)', async () => {
    req.query = {
      category: 'javascript',
      difficulty: 'beginner',
      search: 'function'
    };
    
    const mockUser = {
      stats: {
        level: 1,
        points: 100,
        learningPaths: []
      }
    };
    
    const mockLessons = [];
    
    const mockLevelStats = {
      level: 1,
      points: 100,
      pointsToNextLevel: 300,
      progress: 25
    };
    
    const mockSelectFn = vi.fn().mockReturnThis();
    const mockLeanFn = vi.fn().mockResolvedValue(mockUser);
    
    const mockFindById = vi.fn().mockImplementation(() => {
      return {
        select: mockSelectFn,
        lean: mockLeanFn
      };
    });
    
    User.findById = mockFindById;
    
    const mockLearnFindSortLean = vi.fn().mockResolvedValue(mockLessons);
    
    Lesson.find = vi.fn().mockImplementation(() => {
      return {
        select: () => ({
          sort: () => ({
            lean: mockLearnFindSortLean
          })
        })
      };
    });
    
    LevelService.getUserLevelStats = vi.fn().mockReturnValue(mockLevelStats);
    
    await getLessonsController(req, res as any, next);
    
    expect(Lesson.find).toHaveBeenCalledWith({
      isPublished: true,
      isAvailable: true,
      category: 'javascript',
      difficulty: 'beginner',
      $or: [
        { title: { $regex: 'function', $options: 'i' } },
        { description: { $regex: 'function', $options: 'i' } }
      ]
    });
    
    expect(res.success).toHaveBeenCalledWith(
      expect.objectContaining({
        lessons: expect.any(Object),
        stats: expect.any(Object)
      }),
      'Lekcje zostały pobrane'
    );
  });
  
  it('should handle users with no completed lessons', async () => {
    const mockUser = {
      stats: {
        level: 1,
        points: 50,
        learningPaths: []
      }
    };
    
    const mockLessons = [
      {
        _id: new Types.ObjectId(),
        title: 'JavaScript Basics',
        description: 'Introduction to JavaScript',
        category: 'javascript',
        difficulty: 'beginner',
        duration: 20,
        points: 80,
        slug: 'javascript-basics',
        requirements: [],
        requiredLevel: 1
      }
    ];
    
    const mockLevelStats = {
      level: 1,
      points: 50,
      pointsToNextLevel: 250,
      progress: 20
    };
    
    const mockSelectFn = vi.fn().mockReturnThis();
    const mockLeanFn = vi.fn().mockResolvedValue(mockUser);
    
    const mockFindById = vi.fn().mockImplementation(() => {
      return {
        select: mockSelectFn,
        lean: mockLeanFn
      };
    });
    
    User.findById = mockFindById;
    
    const mockLearnFindSortLean = vi.fn().mockResolvedValue(mockLessons);
    
    Lesson.find = vi.fn().mockImplementation(() => {
      return {
        select: () => ({
          sort: () => ({
            lean: mockLearnFindSortLean
          })
        })
      };
    });
    
    LevelService.getUserLevelStats = vi.fn().mockReturnValue(mockLevelStats);
    
    await getLessonsController(req, res as any, next);
    
    expect(res.success).toHaveBeenCalledWith(
      expect.objectContaining({
        stats: expect.objectContaining({
          total: 1,
          completed: 0,
          progress: 0
        })
      }),
      'Lekcje zostały pobrane'
    );
  });
  
  it('should handle error and pass to next middleware', async () => {
    // Przygotowanie błędu
    const mockError = new Error('Database error');
    
    // Upewniamy się, że mockFindById jest odpowiednio skonstruowany
    const mockSelectFn = vi.fn().mockImplementation(() => {
      // Rzucanie błędu wewnątrz łańcucha promisów
      throw mockError;
    });
    
    // Mockowanie User.findById
    User.findById = vi.fn().mockImplementation(() => {
      return {
        select: mockSelectFn,
        lean: vi.fn()
      };
    });
    
    // Wywołanie kontrolera
    await getLessonsController(req, res as any, next);
    
    // Sprawdzenie, czy next został wywołany z błędem
    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(res.success).not.toHaveBeenCalled();
  });
}); 