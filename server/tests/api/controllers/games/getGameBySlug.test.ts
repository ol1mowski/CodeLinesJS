import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getGameBySlug } from '../../../../src/api/controllers/games/getGameBySlug.js';
import { GameService } from '../../../../src/services/game.service.js';
import { ValidationError } from '../../../../src/utils/errors.js';

vi.mock('../../../../src/services/game.service.js', () => ({
  GameService: {
    getGameBySlug: vi.fn()
  }
}));

describe('getGameBySlug Controller', () => {
  let req: any;
  let res: any;
  let next: any;
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    req = {
      params: { slug: 'test-game' },
      user: { userId: 'user123' }
    };
    
    res = {
      json: vi.fn()
    };
    
    next = vi.fn();
  });
  
  it('should call GameService and return game with status success', async () => {
    const mockGameResponse = {
      game: {
        _id: 'game123',
        title: 'Test Game',
        slug: 'test-game',
        description: 'A test game',
        difficulty: 'medium',
        isCompleted: true,
        isLevelAvailable: true
      }
    };
    
    (GameService.getGameBySlug as any).mockResolvedValue(mockGameResponse);
    
    await getGameBySlug(req, res, next);
    
    expect(GameService.getGameBySlug).toHaveBeenCalledWith(
      'test-game',
      'user123'
    );
    
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: mockGameResponse
    });
    
    expect(next).not.toHaveBeenCalled();
  });
  
  it('should handle absence of user', async () => {
    req.user = undefined;
    
    const mockGameResponse = {
      game: {
        _id: 'game123',
        title: 'Test Game',
        slug: 'test-game',
        isCompleted: false,
        isLevelAvailable: true
      }
    };
    
    (GameService.getGameBySlug as any).mockResolvedValue(mockGameResponse);
    
    await getGameBySlug(req, res, next);
    
    expect(GameService.getGameBySlug).toHaveBeenCalledWith(
      'test-game',
      undefined
    );
    
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: mockGameResponse
    });
  });
  
  it('should handle ValidationError from GameService', async () => {
    const mockError = new ValidationError('Game not found');
    (GameService.getGameBySlug as any).mockRejectedValue(mockError);
    
    await getGameBySlug(req, res, next);
    
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.json).not.toHaveBeenCalled();
  });
  
  it('should handle unexpected errors from GameService', async () => {
    const mockError = new Error('Internal server error');
    (GameService.getGameBySlug as any).mockRejectedValue(mockError);
    
    await getGameBySlug(req, res, next);
    
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.json).not.toHaveBeenCalled();
  });
}); 