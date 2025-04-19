import { describe, it, expect, vi, beforeEach, MockInstance } from 'vitest';
import { updateProgressController } from '../../../../src/api/controllers/progress/updateProgress.js';
import { ProgressService } from '../../../../src/services/progress/index.js';
import { NextFunction, Response } from 'express';
import { IUserRequest, UpdateProgressDTO } from '../../../../src/types/progress/index.js';
import { ValidationError } from '../../../../src/utils/errors.js';
import { mockResponseUtils } from '../../../setup/setupResponseMocks.js';

// Rozszerzenie typu Response dla testów
declare global {
  namespace Express {
    interface Response {
      success: any;
    }
  }
}

vi.mock('../../../../src/services/progress/index.js', () => ({
  ProgressService: {
    updateLessonProgress: vi.fn()
  }
}));

describe('updateProgressController', () => {
  let req: Partial<IUserRequest & { body: UpdateProgressDTO }>;
  let res: ReturnType<typeof mockResponseUtils.createMockResponse>;
  let next: MockInstance;
  
  beforeEach(() => {
    req = {
      user: {
        userId: 'user123',
        email: 'test@example.com',
        role: 'user'
      },
      body: {
        lessonId: 'javascript-basics'
      }
    };
    
    res = mockResponseUtils.createMockResponse();
    
    next = vi.fn();
    
    vi.clearAllMocks();
  });
  
  it('should update lesson progress and return success response', async () => {
    const mockProgressResult = {
      message: 'Postęp zaktualizowany pomyślnie',
      stats: {
        points: 750,
        pointsRequired: 250,
        xp: 1000,
        level: 4,
        levelProgress: 75,
        streak: 5,
        bestStreak: 8,
        lastActive: new Date(),
        pathProgress: {
          completedLessons: 5,
          totalLessons: 10,
          percentage: 50,
          status: 'active'
        }
      }
    };
    
    ProgressService.updateLessonProgress = vi.fn().mockResolvedValue(mockProgressResult);
    
    await updateProgressController(req as IUserRequest & { body: UpdateProgressDTO }, res as any, next as unknown as NextFunction);
    
    expect(ProgressService.updateLessonProgress).toHaveBeenCalledWith('user123', 'javascript-basics');
    expect(res.success).toHaveBeenCalledWith(mockProgressResult, 'Postęp lekcji zaktualizowany pomyślnie');
    expect(next).not.toHaveBeenCalled();
  });
  
  it('should call next with validation error when lessonId is missing', async () => {
    req.body = {} as UpdateProgressDTO;
    
    await updateProgressController(req as IUserRequest & { body: UpdateProgressDTO }, res as any, next as unknown as NextFunction);
    
    expect(ProgressService.updateLessonProgress).not.toHaveBeenCalled();
    expect(res.success).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
    expect(next).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Brak ID lekcji'
    }));
  });
  
  it('should call next with error when service throws exception', async () => {
    const mockError = new Error('Lesson not found');
    
    ProgressService.updateLessonProgress = vi.fn().mockRejectedValue(mockError);
    
    await updateProgressController(req as IUserRequest & { body: UpdateProgressDTO }, res as any, next as unknown as NextFunction);
    
    expect(ProgressService.updateLessonProgress).toHaveBeenCalledWith('user123', 'javascript-basics');
    expect(res.success).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });
}); 