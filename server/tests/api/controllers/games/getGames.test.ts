import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getGames } from '../../../../src/api/controllers/games/getGames.js';
import { GameService } from '../../../../src/services/game.service.js';

vi.mock('../../../../src/services/game.service.js', () => ({
  GameService: {
    getGames: vi.fn()
  }
}));

describe('getGames Controller', () => {
  let req: any;
  let res: any;
  let next: any;

  beforeEach(() => {
    vi.clearAllMocks();

    req = {
      query: {},
      user: { userId: 'user123' }
    };

    res = {
      json: vi.fn()
    };

    next = vi.fn();
  });

  it('should call GameService and return games with status success', async () => {
    const mockGamesResponse = {
      games: [
        { _id: 'game1', title: 'Game 1' },
        { _id: 'game2', title: 'Game 2' }
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 2,
        hasNextPage: false
      }
    };

    (GameService.getGames as any).mockResolvedValue(mockGamesResponse);

    req.query = {
      difficulty: 'medium',
      category: 'javascript',
      sort: 'title',
      order: 'asc',
      page: '1',
      limit: '10'
    };

    await getGames(req, res, next);

    expect(GameService.getGames).toHaveBeenCalledWith(
      {
        difficulty: 'medium',
        category: 'javascript',
        sort: 'title',
        order: 'asc',
        page: '1',
        limit: '10'
      },
      'user123'
    );

    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: mockGamesResponse
    });

    expect(next).not.toHaveBeenCalled();
  });

  it('should handle empty query parameters', async () => {
    const mockGamesResponse = {
      games: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        hasNextPage: false
      }
    };

    (GameService.getGames as any).mockResolvedValue(mockGamesResponse);

    await getGames(req, res, next);

    expect(GameService.getGames).toHaveBeenCalledWith(
      {
        difficulty: undefined,
        category: undefined,
        sort: undefined,
        order: undefined,
        page: undefined,
        limit: undefined
      },
      'user123'
    );

    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: mockGamesResponse
    });
  });

  it('should handle absence of user', async () => {
    req.user = undefined;

    const mockGamesResponse = {
      games: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        hasNextPage: false
      }
    };

    (GameService.getGames as any).mockResolvedValue(mockGamesResponse);

    await getGames(req, res, next);

    expect(GameService.getGames).toHaveBeenCalledWith(
      expect.any(Object),
      undefined
    );

    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      data: mockGamesResponse
    });
  });

  it('should call next with error if GameService throws', async () => {
    const mockError = new Error('Service error');
    (GameService.getGames as any).mockRejectedValue(mockError);

    await getGames(req, res, next);

    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.json).not.toHaveBeenCalled();
  });
}); 