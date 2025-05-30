import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getGames } from '../../../../src/api/controllers/games/getGames.js';
import { GameService } from '../../../../src/services/game.service.js';
import { mockResponseUtils } from '../../../setup/setupResponseMocks.js';

declare global {
  namespace Express {
    interface Response {
      success: any;
      error: any;
      paginated: any;
    }
  }
}

vi.mock('../../../../src/services/game.service.js', () => ({
  GameService: {
    getGames: vi.fn()
  }
}));

describe('getGames Controller', () => {
  let req: any;
  let res: ReturnType<typeof mockResponseUtils.createMockResponse>;
  let next: any;

  beforeEach(() => {
    vi.clearAllMocks();

    req = {
      query: {},
      user: { userId: 'user123' }
    };

    res = mockResponseUtils.createMockResponse();

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

    await getGames(req, res as any, next);

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

    // Sprawdzamy, czy została wywołana metoda paginated dla wyników z paginacją
    expect(res.paginated).toHaveBeenCalledWith(
      mockGamesResponse.games,
      1,
      10,
      mockGamesResponse.pagination.total,
      'Gry pobrane pomyślnie'
    );

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

    await getGames(req, res as any, next);

    // Kontroler ustawia domyślne wartości dla page i limit
    expect(GameService.getGames).toHaveBeenCalledWith(
      {
        difficulty: undefined,
        category: undefined,
        sort: undefined,
        order: undefined,
        page: '1',
        limit: '10'
      },
      'user123'
    );

    // Sprawdzamy, czy została wywołana metoda paginated
    expect(res.paginated).toHaveBeenCalledWith(
      mockGamesResponse.games,
      1,
      10,
      mockGamesResponse.pagination.total,
      'Gry pobrane pomyślnie'
    );
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

    await getGames(req, res as any, next);

    expect(GameService.getGames).toHaveBeenCalledWith(
      {
        difficulty: undefined,
        category: undefined,
        sort: undefined,
        order: undefined,
        page: '1',
        limit: '10'
      },
      undefined
    );

    // Sprawdzamy, czy została wywołana metoda paginated
    expect(res.paginated).toHaveBeenCalledWith(
      mockGamesResponse.games,
      1,
      10,
      mockGamesResponse.pagination.total,
      'Gry pobrane pomyślnie'
    );
  });

  it('should call next with error if GameService throws', async () => {
    const mockError = new Error('Service error');
    (GameService.getGames as any).mockRejectedValue(mockError);

    await getGames(req, res as any, next);

    expect(next).toHaveBeenCalledWith(mockError);
    expect(res.paginated).not.toHaveBeenCalled();
    expect(res.success).not.toHaveBeenCalled();
  });
}); 