import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLessonsController } from '../../../../src/api/controllers/lessons/getLessons.js';
import { NextFunction, Response, Request } from 'express';
import { Lesson } from '../../../../src/models/lesson.model.js';
import { User } from '../../../../src/models/user.model.js';
import { LevelService } from '../../../../src/services/level.service.js';
import { Types } from 'mongoose';

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
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  
  beforeEach(() => {
    req = {
      user: {
        id: 'user123',
        email: 'test@example.com',
        role: 'user'
      },
      query: {}
    };
    
    res = {
      json: vi.fn()
    };
    
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
    
    await getLessonsController(req as Request, res as Response, next);
    
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
    
    await getLessonsController(req as Request, res as Response, next);
    
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      stats: expect.objectContaining({
        total: 1,
        completed: 0,
        progress: 0
      })
    }));
  });
  
  it('should handle error and pass to next middleware', async () => {
    const mockError = new Error('Database error');
    
    const mockSelectFn = vi.fn().mockReturnThis();
    const mockLeanFn = vi.fn().mockRejectedValue(mockError);
    
    const mockFindById = vi.fn().mockImplementation(() => {
      return {
        select: mockSelectFn,
        lean: mockLeanFn
      };
    });
    
    User.findById = mockFindById;
    
    await getLessonsController(req as Request, res as Response, next);
    
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.json).not.toHaveBeenCalled();
  });
}); 