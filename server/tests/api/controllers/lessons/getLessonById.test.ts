import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLessonByIdController } from '../../../../src/api/controllers/lessons/getLessonById.js';
import { NextFunction, Response, Request } from 'express';
import { ValidationError } from '../../../../src/utils/errors.js';
import { Types } from 'mongoose';
import { mockResponseUtils } from '../../../setup/setupResponseMocks.js';

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
    getUserLevelStats: vi.fn().mockReturnValue({
      level: 1,
      points: 100,
      pointsToNextLevel: 250,
      progress: 20
    })
  }
}));

import { Lesson } from '../../../../src/models/lesson.model.js';
import { LessonContent } from '../../../../src/models/lessonContent.model.js';
import { User } from '../../../../src/models/user.model.js';

describe('getLessonByIdController', () => {
  let req: Partial<Request>;
  let res: Response;
  let next: NextFunction;
  
  beforeEach(() => {
    req = {
      params: {
        id: 'javascript-functions'
      },
      user: {
        userId: 'user123',
        id: 'user123',
        email: 'test@example.com',
        role: 'user'
      }
    };
    
    res = mockResponseUtils.createMockResponse();
    
    next = vi.fn() as unknown as NextFunction;
    
    vi.clearAllMocks();
  });
  
  it('should throw error when lesson is not found', async () => {
    const populateMock = vi.fn().mockResolvedValue(null);
    const lessonContentMock = vi.fn().mockResolvedValue({});
    const userMock = vi.fn().mockResolvedValue({
      stats: { level: 1, learningPaths: [] }
    });
    
    (Lesson.findOne as any).mockReturnValue({ populate: populateMock });
    (LessonContent.findOne as any).mockReturnValue({ lean: lessonContentMock });
    (User.findById as any).mockReturnValue({ 
      select: vi.fn().mockReturnValue({
        lean: userMock
      })
    });
    
    await getLessonByIdController(req as Request, res, next);
    
    expect(mockResponseUtils.failMock).toHaveBeenCalledWith(
      'Lekcja nie została znaleziona',
      [{ code: 'LESSON_NOT_FOUND', message: 'Lekcja nie została znaleziona', field: 'id' }],
      404
    );
    expect(res.json).toHaveBeenCalled();
  });
  
  it('should throw error when lesson content is not found', async () => {
    const mockLessonData = {
      _id: new Types.ObjectId(),
      title: 'JavaScript Functions',
      slug: 'javascript-functions',
      requiredLevel: 1
    };
    
    const populateMock = vi.fn().mockResolvedValue(mockLessonData);
    const lessonContentMock = vi.fn().mockResolvedValue(null);
    const userMock = vi.fn().mockResolvedValue({
      stats: { level: 1, learningPaths: [] }
    });
    
    (Lesson.findOne as any).mockReturnValue({ populate: populateMock });
    (LessonContent.findOne as any).mockReturnValue({ lean: lessonContentMock });
    (User.findById as any).mockReturnValue({ 
      select: vi.fn().mockReturnValue({
        lean: userMock
      })
    });
    
    await getLessonByIdController(req as Request, res, next);
    
    expect(mockResponseUtils.failMock).toHaveBeenCalledWith(
      'Treść lekcji nie została znaleziona',
      [{ code: 'LESSON_CONTENT_NOT_FOUND', message: 'Treść lekcji nie została znaleziona', field: 'id' }],
      404
    );
    expect(res.json).toHaveBeenCalled();
  });
  
  it('should throw error when user level is too low', async () => {
    const mockLessonData = {
      _id: new Types.ObjectId(),
      title: 'Advanced React',
      slug: 'advanced-react',
      requiredLevel: 5,
      requirements: []
    };
    
    const mockLessonContentData = {
      sections: [],
      quiz: {}
    };
    
    const populateMock = vi.fn().mockResolvedValue(mockLessonData);
    const lessonContentMock = vi.fn().mockResolvedValue(mockLessonContentData);
    const userMock = vi.fn().mockResolvedValue({
      stats: {
        level: 2,
        learningPaths: []
      }
    });
    
    (Lesson.findOne as any).mockReturnValue({ populate: populateMock });
    (LessonContent.findOne as any).mockReturnValue({ lean: lessonContentMock });
    (User.findById as any).mockReturnValue({
      select: vi.fn().mockReturnValue({
        lean: userMock
      })
    });
    
    await getLessonByIdController(req as Request, res, next);
    
    expect(mockResponseUtils.failMock).toHaveBeenCalledWith(
      'Wymagany poziom 5 do odblokowania tej lekcji',
      [{ code: 'LEVEL_REQUIREMENT_NOT_MET', message: 'Wymagany poziom 5 do odblokowania tej lekcji' }],
      403
    );
    expect(res.json).toHaveBeenCalled();
  });
  
  it('should handle errors and pass to next middleware', async () => {
    const mockError = new Error('Database error');
    
    const populateMock = vi.fn().mockRejectedValue(mockError);
    
    (Lesson.findOne as any).mockReturnValue({ populate: populateMock });
    
    await getLessonByIdController(req as Request, res, next);
    
    expect(next).toHaveBeenCalledWith(mockError);
    expect(mockResponseUtils.successMock).not.toHaveBeenCalled();
  });
}); 