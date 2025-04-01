import { describe, it, expect, vi, beforeEach } from 'vitest';
import { completeLessonController } from '../../../../src/api/controllers/lessons/completeLesson.js';
import { NextFunction, Response, Request } from 'express';
import { Lesson } from '../../../../src/models/lesson.model.js';
import { User } from '../../../../src/models/user.model.js';
import { LevelService } from '../../../../src/services/level.service.js';
import { ValidationError } from '../../../../src/utils/errors.js';
import { Types } from 'mongoose';

vi.mock('../../../../src/models/lesson.model.js', () => ({
  Lesson: {
    findOne: vi.fn()
  }
}));

vi.mock('../../../../src/models/user.model.js', () => ({
  User: {
    findById: vi.fn()
  }
}));

vi.mock('../../../../src/services/level.service.js', () => ({
  LevelService: {
    updateUserLevelAndStreak: vi.fn(),
    getUserLevelStats: vi.fn()
  }
}));

const mockedLesson = vi.mocked(Lesson);
const mockedUser = vi.mocked(User);
const mockedLevelService = vi.mocked(LevelService);

describe('completeLessonController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  
  beforeEach(() => {
    req = {
      params: {
        id: '507f1f77bcf86cd799439011'
      },
      user: {
        userId: 'user123',
        email: 'test@example.com',
        role: 'user',
        id: 'user123'
      }
    };
    
    res = {
      json: vi.fn()
    };
    
    next = vi.fn() as unknown as NextFunction;
    
    vi.clearAllMocks();
  });
  
  it('should mark lesson as completed when it was not completed before', async () => {
    const lessonId = '507f1f77bcf86cd799439011';
    const mockLesson = {
      _id: new Types.ObjectId(lessonId),
      title: 'JavaScript Functions',
      points: 100,
      duration: 30
    };
    
    const mockUser = {
      _id: new Types.ObjectId('507f1f77bcf86cd799439012'), // Prawidłowy format ObjectId
      stats: {
        level: 2,
        points: 300,
        xp: 500,
        streak: 1,
        bestStreak: 3,
        learningPaths: [
          {
            progress: {
              completedLessons: []
            }
          }
        ]
      },
      save: vi.fn().mockResolvedValue(true)
    };
    
    const mockLevelUpdate = {
      level: {
        leveledUp: false,
        levelsGained: 0,
        level: 2
      },
      streak: {
        streakUpdated: true
      }
    };
    
    const mockLevelStats = {
      level: 2,
      points: 400,
      pointsToNextLevel: 100,
      progress: 80
    };
    
    mockedLesson.findOne.mockResolvedValue(mockLesson as any);
    mockedUser.findById.mockResolvedValue(mockUser as any);
    mockedLevelService.updateUserLevelAndStreak.mockResolvedValue(mockLevelUpdate as any);
    mockedLevelService.getUserLevelStats.mockReturnValue(mockLevelStats as any);
    
    await completeLessonController(req as Request, res as Response, next);
    
    expect(mockedLesson.findOne).toHaveBeenCalledWith({ _id: lessonId });
    expect(mockedUser.findById).toHaveBeenCalledWith('user123');
    
    expect(mockUser.stats.learningPaths[0].progress.completedLessons).toHaveLength(1);
    //@ts-ignore
    expect(mockUser.stats.learningPaths[0].progress.completedLessons[0]._id.toString()).toEqual(mockLesson._id.toString());
    
    expect(mockedLevelService.updateUserLevelAndStreak).toHaveBeenCalledWith(
      'user123', 
      100, 
      {
        points: 100,
        challenges: 1,
        timeSpent: 30
      }
    );
    
    expect(mockUser.save).toHaveBeenCalled();
    
    expect(res.json).toHaveBeenCalledWith({
      message: 'Lekcja ukończona',
      stats: {
        points: 400,
        pointsRequired: 100,
        xp: 500,
        level: 2,
        levelProgress: 80,
        completedLessons: 1,
        leveledUp: false,
        levelsGained: 0,
        streak: 1,
        bestStreak: 3,
        streakUpdated: true
      }
    });
    
    expect(next).not.toHaveBeenCalled();
  });
  
  it('should return appropriate response when lesson is already completed', async () => {
    const lessonId = '507f1f77bcf86cd799439011';
    const mockLesson = {
      _id: new Types.ObjectId(lessonId),
      title: 'JavaScript Functions',
      points: 100,
      duration: 30
    };
    
    const mockCompletedLessons = [
      { _id: new Types.ObjectId(lessonId), completedAt: new Date() }
    ];
    
    const mockUser = {
      _id: new Types.ObjectId('507f1f77bcf86cd799439012'), // Prawidłowy format ObjectId
      stats: {
        level: 2,
        points: 400,
        xp: 500,
        streak: 1,
        bestStreak: 3,
        learningPaths: [
          {
            progress: {
              completedLessons: mockCompletedLessons
            }
          }
        ]
      },
      save: vi.fn().mockResolvedValue(true)
    };
    
    const mockLevelStats = {
      level: 2,
      points: 400,
      pointsToNextLevel: 100,
      progress: 80
    };
    
    mockedLesson.findOne.mockResolvedValue(mockLesson as any);
    mockedUser.findById.mockResolvedValue(mockUser as any);
    mockedLevelService.getUserLevelStats.mockReturnValue(mockLevelStats as any);
    
    await completeLessonController(req as Request, res as Response, next);
    
    expect(mockedLevelService.updateUserLevelAndStreak).not.toHaveBeenCalled();
    expect(mockUser.save).not.toHaveBeenCalled();
    
    expect(res.json).toHaveBeenCalledWith({
      message: 'Lekcja została już wcześniej ukończona',
      stats: {
        points: 400,
        pointsRequired: 100,
        xp: 500,
        level: 2,
        levelProgress: 80,
        completedLessons: 1,
        streak: 1,
        bestStreak: 3
      }
    });
  });
  
  it('should handle lesson not found error', async () => {
    mockedLesson.findOne.mockResolvedValue(null);
    
    await completeLessonController(req as Request, res as Response, next);
    
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
    expect(res.json).not.toHaveBeenCalled();
  });
  
  it('should handle user with no learning paths error', async () => {
    const mockLesson = {
      _id: new Types.ObjectId('507f1f77bcf86cd799439011'),
      title: 'JavaScript Functions'
    };
    
    const mockUser = {
      _id: new Types.ObjectId('507f1f77bcf86cd799439012'), // Prawidłowy format ObjectId
      stats: {
                        // No learningPaths array
      }
    };
    
    mockedLesson.findOne.mockResolvedValue(mockLesson as any);
    mockedUser.findById.mockResolvedValue(mockUser as any);
    
    await completeLessonController(req as Request, res as Response, next);
    
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
    expect(res.json).not.toHaveBeenCalled();
  });
  
  it('should handle level up response', async () => {
    const mockLesson = {
      _id: new Types.ObjectId('507f1f77bcf86cd799439011'),
      title: 'JavaScript Functions',
      points: 100,
      duration: 30
    };
    
    const mockUser = {
      _id: new Types.ObjectId('507f1f77bcf86cd799439012'), // Prawidłowy format ObjectId
      stats: {
        level: 2,
        points: 990, // About to level up
        xp: 1500,
        streak: 2,
        bestStreak: 5,
        learningPaths: [
          {
            progress: {
              completedLessons: []
            }
          }
        ]
      },
      save: vi.fn().mockResolvedValue(true)
    };
    
    const mockLevelUpdate = {
      level: {
        leveledUp: true,
        levelsGained: 1,
        level: 3
      },
      streak: {
        streakUpdated: false
      }
    };
    
    const mockLevelStats = {
      level: 3, // Leveled up
      points: 90, // Reset after level up
      pointsToNextLevel: 400,
      progress: 22
    };
    
    mockedLesson.findOne.mockResolvedValue(mockLesson as any);
    mockedUser.findById.mockResolvedValue(mockUser as any);
    mockedLevelService.updateUserLevelAndStreak.mockResolvedValue(mockLevelUpdate as any);
    mockedLevelService.getUserLevelStats.mockReturnValue(mockLevelStats as any);
    
    await completeLessonController(req as Request, res as Response, next);
    
    expect(res.json).toHaveBeenCalledWith({
      message: 'Lekcja ukończona! Awansowałeś na poziom 3!',
      stats: {
        points: 90,
        pointsRequired: 400,
        xp: 1500,
        level: 3,
        levelProgress: 22,
        completedLessons: 1,
        leveledUp: true,
        levelsGained: 1,
        streak: 2,
        bestStreak: 5,
        streakUpdated: false
      }
    });
  });
  
  it('should handle unexpected errors', async () => {
    const mockError = new Error('Database error');
    mockedLesson.findOne.mockRejectedValue(mockError);
    
    await completeLessonController(req as Request, res as Response, next);
    
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.json).not.toHaveBeenCalled();
  });
}); 