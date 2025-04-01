import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLearningPathByIdController } from '../../../../src/api/controllers/learningPath/getLearningPathById.js';
import { LearningPathService } from '../../../../src/services/learningPath/learningPath.service.js';
import { NextFunction, Response } from 'express';
import { AuthRequest, LearningPathDetailResponse } from '../../../../src/services/learningPath/types.js';
import { Types } from 'mongoose';
import { ValidationError } from '../../../../src/utils/errors.js';

vi.mock('../../../../src/services/learningPath/learningPath.service.js', () => ({
  LearningPathService: {
    getLearningPathById: vi.fn()
  }
}));

const mockedLearningPathService = vi.mocked(LearningPathService);

describe('getLearningPathByIdController', () => {
  let req: AuthRequest;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      user: {
        userId: 'user123',
        email: 'test@example.com',
        role: 'user'
      },
      params: {
        id: 'path123'
      }
    } as unknown as AuthRequest;

    res = {
      json: vi.fn()
    } as unknown as Response;

    next = vi.fn() as unknown as NextFunction;

    vi.clearAllMocks();
  });

  it('should call LearningPathService.getLearningPathById and return the detailed path', async () => {
    const mockDetailResponse = {
      id: new Types.ObjectId('507f1f77bcf86cd799439011'),
      title: 'JavaScript Basics',
      description: 'Learn JavaScript fundamentals',
      difficulty: 'beginner',
      category: 'javascript',
      estimatedTime: 120,
      requirements: ['Basic HTML knowledge'],
      outcomes: ['Understand JS basics'],
      requiredLevel: 1,
      isAvailable: true,
      totalLessons: 3,
      progress: {
        completed: [new Types.ObjectId('507f1f77bcf86cd799439021')],
        total: 3,
        percentage: 33
      },
      completedLessons: [new Types.ObjectId('507f1f77bcf86cd799439021')],
      lessons: [
        {
          id: new Types.ObjectId('507f1f77bcf86cd799439021'),
          title: 'Lesson 1',
          description: 'Introduction to JS',
          category: 'javascript',
          difficulty: 'beginner',
          duration: 30,
          points: 100,
          slug: 'lesson-1',
          isCompleted: true,
          requirements: []
        },
        {
          id: new Types.ObjectId('507f1f77bcf86cd799439022'),
          title: 'Lesson 2',
          description: 'Variables and Data Types',
          category: 'javascript',
          difficulty: 'beginner',
          duration: 45,
          points: 150,
          slug: 'lesson-2',
          isCompleted: false,
          requirements: []
        },
        {
          id: new Types.ObjectId('507f1f77bcf86cd799439023'),
          title: 'Lesson 3',
          description: 'Functions and Scope',
          category: 'javascript',
          difficulty: 'beginner',
          duration: 45,
          points: 150,
          slug: 'lesson-3',
          isCompleted: false,
          requirements: []
        }
      ]
    } as unknown as LearningPathDetailResponse;

    mockedLearningPathService.getLearningPathById.mockResolvedValue(mockDetailResponse);

    await getLearningPathByIdController(req, res, next);

    expect(mockedLearningPathService.getLearningPathById).toHaveBeenCalledWith('path123', 'user123');
    expect(res.json).toHaveBeenCalledWith(mockDetailResponse);
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle validation errors', async () => {
    const mockError = new ValidationError('Ścieżka nauki nie została znaleziona');
    mockedLearningPathService.getLearningPathById.mockRejectedValue(mockError);

    await getLearningPathByIdController(req, res, next);

    expect(mockedLearningPathService.getLearningPathById).toHaveBeenCalledWith('path123', 'user123');
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });

  it('should handle access level errors', async () => {
    const mockError = new ValidationError('Nie masz dostępu do tej ścieżki nauki');
    mockedLearningPathService.getLearningPathById.mockRejectedValue(mockError);

    await getLearningPathByIdController(req, res, next);

    expect(mockedLearningPathService.getLearningPathById).toHaveBeenCalledWith('path123', 'user123');
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });

  it('should handle unexpected errors', async () => {
    const mockError = new Error('Unexpected server error');
    mockedLearningPathService.getLearningPathById.mockRejectedValue(mockError);

    await getLearningPathByIdController(req, res, next);

    expect(mockedLearningPathService.getLearningPathById).toHaveBeenCalledWith('path123', 'user123');
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });
}); 