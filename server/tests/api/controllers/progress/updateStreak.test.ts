import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updateStreakController } from '../../../../src/api/controllers/progress/updateStreak.js';
import { StreakService } from '../../../../src/services/progress/index.js';
import { NextFunction, Response } from 'express';
import { IUserRequest } from '../../../../src/types/progress/index.js';
import { User } from '../../../../src/models/user.model.js';
import { ValidationError } from '../../../../src/utils/errors.js';

vi.mock('../../../../src/models/user.model.js', () => ({
  User: {
    findById: vi.fn()
  }
}));

vi.mock('../../../../src/services/progress/index.js', () => ({
  StreakService: {
    updateStreak: vi.fn()
  }
}));

describe('updateStreakController', () => {
  let req: Partial<IUserRequest>;
  let res: Partial<Response>;
  let next: NextFunction;
  let mockUser: any;
  
  beforeEach(() => {
    req = {
      user: {
        userId: 'user123',
        email: 'test@example.com',
        role: 'user'
      }
    };
    
    res = {
      json: vi.fn()
    };
    
    next = vi.fn() as unknown as NextFunction;
    
    mockUser = {
      _id: 'user123',
      stats: {
        level: 5,
        points: 2500,
        streak: 3,
        bestStreak: 7
      },
      save: vi.fn().mockResolvedValue(true)
    };
    
    vi.clearAllMocks();
  });
  
  it('should update user streak and return success response when streak is updated', async () => {
    User.findById = vi.fn().mockResolvedValue(mockUser);
    
    StreakService.updateStreak = vi.fn().mockReturnValue({
      streak: 4,
      bestStreak: 7,
      streakUpdated: true
    });
    
    await updateStreakController(req as IUserRequest, res as Response, next);
    
    expect(User.findById).toHaveBeenCalledWith('user123');
    expect(StreakService.updateStreak).toHaveBeenCalledWith(mockUser);
    expect(mockUser.save).toHaveBeenCalled();
    
    expect(res.json).toHaveBeenCalledWith({
      message: 'Świetnie! Twoje pasmo sukcesów wynosi teraz 4 dni!',
      streak: 4,
      bestStreak: 7,
      streakUpdated: true
    });
    
    expect(next).not.toHaveBeenCalled();
  });
  
  it('should return appropriate message when starting a new streak', async () => {
    User.findById = vi.fn().mockResolvedValue(mockUser);
    
    StreakService.updateStreak = vi.fn().mockReturnValue({
      streak: 1,
      bestStreak: 7,
      streakUpdated: true,
      streakBroken: true
    });
    
    await updateStreakController(req as IUserRequest, res as Response, next);
    
    expect(res.json).toHaveBeenCalledWith({
      message: 'Rozpoczęto nowe pasmo sukcesów!',
      streak: 1,
      bestStreak: 7,
      streakUpdated: true
    });
  });
  
  it('should return appropriate message for first day of learning', async () => {
    mockUser.stats.streak = 0;
    mockUser.stats.bestStreak = 0;
    
    User.findById = vi.fn().mockResolvedValue(mockUser);
    
    StreakService.updateStreak = vi.fn().mockReturnValue({
      streak: 1,
      bestStreak: 1,
      streakUpdated: true
    });
    
    await updateStreakController(req as IUserRequest, res as Response, next);
    
    expect(res.json).toHaveBeenCalledWith({
      message: 'Pierwszy dzień nauki! Rozpoczęto pasmo sukcesów.',
      streak: 1,
      bestStreak: 1,
      streakUpdated: true
    });
  });
  
  it('should return appropriate message when streak is not updated', async () => {
    User.findById = vi.fn().mockResolvedValue(mockUser);
    
    StreakService.updateStreak = vi.fn().mockReturnValue({
      streak: 3,
      bestStreak: 7,
      streakUpdated: false
    });
    
    await updateStreakController(req as IUserRequest, res as Response, next);
    
    expect(res.json).toHaveBeenCalledWith({
      message: 'Pasmo sukcesów nie zostało zaktualizowane',
      streak: 3,
      bestStreak: 7,
      streakUpdated: false
    });
  });
  
  it('should call next with error when user is not found', async () => {
    User.findById = vi.fn().mockResolvedValue(null);
    
    await updateStreakController(req as IUserRequest, res as Response, next);
    
    expect(User.findById).toHaveBeenCalledWith('user123');
    expect(StreakService.updateStreak).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });
  
  it('should call next with error when an unexpected error occurs', async () => {
    const mockError = new Error('Database error');
    User.findById = vi.fn().mockRejectedValue(mockError);
    
    await updateStreakController(req as IUserRequest, res as Response, next);
    
    expect(User.findById).toHaveBeenCalledWith('user123');
    expect(StreakService.updateStreak).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(mockError);
  });
}); 