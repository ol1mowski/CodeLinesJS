import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getGameBySlug } from '../../../../src/api/controllers/games/getGameBySlug.js';
import { GameService } from '../../../../src/services/game.service.js';
import { ValidationError } from '../../../../src/utils/errors.js';
import { mockResponseUtils } from '../../../setup/setupResponseMocks.js';

declare global {
  namespace Express {
    interface Response {
      success: any;
      fail: any;
      error: any;
    }
  }
}

vi.mock('../../../../src/services/game.service.js', () => ({
  GameService: {
    getGameBySlug: vi.fn()
  }
}));

describe('getGameBySlug Controller', () => {
  let req: any;
  let res: ReturnType<typeof mockResponseUtils.createMockResponse>;
  let next: any;
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    req = {
      params: { slug: 'test-game' },
      user: { userId: 'user123' }
    };
    
    res = mockResponseUtils.createMockResponse();
    
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
    
    await getGameBySlug(req, res as any, next);
    
    expect(GameService.getGameBySlug).toHaveBeenCalledWith(
      'test-game',
      'user123'
    );
    
    expect(res.success).toHaveBeenCalledWith(mockGameResponse, 'Gra pobrana pomyślnie');
    
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
    
    await getGameBySlug(req, res as any, next);
    
    expect(GameService.getGameBySlug).toHaveBeenCalledWith(
      'test-game',
      undefined
    );
    
    expect(res.success).toHaveBeenCalledWith(mockGameResponse, 'Gra pobrana pomyślnie');
  });
  
  it('should handle ValidationError from GameService', async () => {
    const mockError = new ValidationError('Game not found');
    (GameService.getGameBySlug as any).mockRejectedValue(mockError);
    
    await getGameBySlug(req, res as any, next);
    
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.success).not.toHaveBeenCalled();
  });
  
  it('should handle unexpected errors from GameService', async () => {
    const mockError = new Error('Internal server error');
    (GameService.getGameBySlug as any).mockRejectedValue(mockError);
    
    await getGameBySlug(req, res as any, next);
    
    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.success).not.toHaveBeenCalled();
  });
}); 