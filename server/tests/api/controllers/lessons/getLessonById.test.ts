import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLessonByIdController } from '../../../../src/api/controllers/lessons/getLessonById.js';
import { NextFunction, Response, Request } from 'express';
import { ValidationError } from '../../../../src/utils/errors.js';
import { Types } from 'mongoose';

vi.mock('../../../../src/models/lesson.model.js', () => ({
  Lesson: {
    findOne: vi.fn().mockReturnThis(),
    populate: vi.fn().mockReturnThis()
  }
}));

vi.mock('../../../../src/models/lessonContent.model.js', () => ({
  LessonContent: {
    findOne: vi.fn().mockReturnThis(),
    lean: vi.fn()
  }
}));

vi.mock('../../../../src/models/user.model.js', () => ({
  User: {
    findById: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    lean: vi.fn()
  }
}));

vi.mock('../../../../src/services/level.service.js', () => ({
  LevelService: {
    getUserLevelStats: vi.fn()
  }
}));

describe('getLessonByIdController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  
  beforeEach(() => {
    req = {
      params: {
        id: 'javascript-functions'
      },
      user: {
        id: 'user123',
        email: 'test@example.com',
        role: 'user'
      }
    };
    
    res = {
      json: vi.fn()
    };
    
    next = vi.fn() as unknown as NextFunction;
    
    vi.clearAllMocks();
  });
  
  it('should throw error when lesson is not found', async () => {
    const originalPromiseAll = Promise.all;
    global.Promise.all = vi.fn().mockResolvedValue([null, {}, {}]);
    
    await getLessonByIdController(req as Request, res as Response, next);
    
    global.Promise.all = originalPromiseAll;
    
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
    expect(res.json).not.toHaveBeenCalled();
  });
  
  it('should throw error when lesson content is not found', async () => {
    const mockLesson = {
      _id: new Types.ObjectId(),
      title: 'JavaScript Functions',
    };
    
    const originalPromiseAll = Promise.all;
    global.Promise.all = vi.fn().mockResolvedValue([mockLesson, null, {}]);
    
    await getLessonByIdController(req as Request, res as Response, next);
    
    global.Promise.all = originalPromiseAll;
    
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
    expect(res.json).not.toHaveBeenCalled();
  });
  
  it('should throw error when user level is too low', async () => {
    const mockLesson = {
      _id: new Types.ObjectId(),
      title: 'Advanced React',
      requiredLevel: 5,
    };
    
    const mockLessonContent = {
    };
    
    const mockUser = {
      stats: {
        level: 2,
      }
    };
    
    const originalPromiseAll = Promise.all;
    global.Promise.all = vi.fn().mockResolvedValue([mockLesson, mockLessonContent, mockUser]);
    
    await getLessonByIdController(req as Request, res as Response, next);
    
    global.Promise.all = originalPromiseAll;
    
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
    expect(res.json).not.toHaveBeenCalled();
  });
  
  it('should handle errors and pass to next middleware', async () => {
    const mockError = new Error('Database error');
    const originalPromiseAll = Promise.all;
    global.Promise.all = vi.fn().mockRejectedValue(mockError);
    
    await getLessonByIdController(req as Request, res as Response, next);
    
    global.Promise.all = originalPromiseAll;
    
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.json).not.toHaveBeenCalled();
  });
}); 