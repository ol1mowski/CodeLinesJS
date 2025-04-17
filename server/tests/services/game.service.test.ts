import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GameService } from '../../src/services/game.service.js';
import { ValidationError } from '../../src/utils/errors.js';

vi.mock('../../src/models/game.model.js', () => ({
  Game: {
    find: vi.fn(),
    findOne: vi.fn(),
    countDocuments: vi.fn()
  }
}));

vi.mock('../../src/models/user.model.js', () => ({
  User: {
    findById: vi.fn()
  }
}));

import { Game } from '../../src/models/game.model.js';
import { User } from '../../src/models/user.model.js';

type MockedFunction<T extends (..._: any) => any> = {
  [P in keyof ReturnType<typeof vi.fn>]: ReturnType<typeof vi.fn>[P]
} & T;

interface MockedGame {
  find: MockedFunction<typeof Game.find>;
  findOne: MockedFunction<typeof Game.findOne>;
  countDocuments: MockedFunction<typeof Game.countDocuments>;
}

interface MockedUser {
  findById: MockedFunction<typeof User.findById>;
}

describe('GameService', () => {
  let mockedGame: MockedGame;
  let mockedUser: MockedUser;
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    mockedGame = Game as unknown as MockedGame;
    mockedUser = User as unknown as MockedUser;
  });
  
  describe('getRandomElements', () => {
    it('should return random elements from array', () => {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const result = GameService.getRandomElements(array, 3);
      
      expect(result).toHaveLength(3);
      result.forEach(element => {
        expect(array).toContain(element);
      });
    });
    
    it('should return full array if count is greater than array length', () => {
      const array = [1, 2, 3];
      const result = GameService.getRandomElements(array, 5);
      
      expect(result).toHaveLength(3);
      expect(result).toEqual(array);
    });
    
    it('should handle empty array', () => {
      const result = GameService.getRandomElements([], 3);
      expect(result).toEqual([]);
    });
    
    it('should handle undefined input', () => {
      const result = GameService.getRandomElements(undefined as any, 3);
      expect(result).toEqual([]);
    });
  });
  
  describe('getUserLevel', () => {
    it('should return user level when userId is provided', async () => {
      const mockUser = { stats: { level: 5 } };
      mockedUser.findById.mockReturnValue({
        select: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue(mockUser)
        })
      } as any);
      
      const result = await GameService.getUserLevel('user123');
      
      expect(mockedUser.findById).toHaveBeenCalledWith('user123');
      expect(result).toBe(5);
    });
    
    it('should return default level 1 when user not found', async () => {
      mockedUser.findById.mockReturnValue({
        select: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue(null)
        })
      } as any);
      
      const result = await GameService.getUserLevel('nonexistent');
      
      expect(result).toBe(1);
    });
    
    it('should return default level 1 when userId is not provided', async () => {
      const result = await GameService.getUserLevel(undefined);
      
      expect(mockedUser.findById).not.toHaveBeenCalled();
      expect(result).toBe(1);
    });
  });
  
  describe('enrichGameWithUserInfo', () => {
    it('should add user-specific information to game', () => {
      const mockGame = {
        _id: 'game123',
        title: 'Test Game',
        slug: 'test-game',
        description: 'A test game',
        difficulty: 'medium',
        requiredLevel: 3,
        rating: { average: 4.5, count: 10 },
        completions: { users: ['user123', 'user456'], count: 2 },
        rewardPoints: 100,
        gameData: [
          { id: 1, task: 'Task 1' },
          { id: 2, task: 'Task 2' },
          { id: 3, task: 'Task 3' },
        ],
        isActive: true,
        category: 'javascript',
        estimatedTime: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = GameService.enrichGameWithUserInfo(mockGame, 'user123', 5);
      
      expect(result.isCompleted).toBe(true);
      expect(result.isLevelAvailable).toBe(true);
      expect(result.gameData).toHaveLength(3);
      expect(result.gameData[0].isCompleted).toBe(true);
      expect(result.gameData[0].isLevelAvailable).toBe(true);
    });
    
    
    it('should limit game data based on gameDataLimit parameter', () => {
      const mockGame = {
        _id: 'game123',
        gameData: [
          { id: 1, task: 'Task 1' },
          { id: 2, task: 'Task 2' },
          { id: 3, task: 'Task 3' },
          { id: 4, task: 'Task 4' },
          { id: 5, task: 'Task 5' },
        ],
        requiredLevel: 1
      };
      
      const result = GameService.enrichGameWithUserInfo(mockGame, undefined, 1, 2);
      
      expect(result.gameData).toHaveLength(2);
    });
  });
  
  describe('getGames', () => {
    it('should retrieve games with pagination and user info', async () => {
      const mockGames = [
        {
          _id: 'game1',
          title: 'Game 1',
          slug: 'game-1',
          difficulty: 'easy',
          requiredLevel: 1,
          completions: { users: ['user123'] },
          isActive: true
        },
        {
          _id: 'game2',
          title: 'Game 2',
          slug: 'game-2',
          difficulty: 'medium',
          requiredLevel: 3,
          completions: { users: [] },
          isActive: true
        }
      ];
      
      mockedUser.findById.mockReturnValue({
        select: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue({ stats: { level: 4 } })
        })
      } as any);
      
      mockedGame.find.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        lean: vi.fn().mockResolvedValue(mockGames)
      } as any);
      
      mockedGame.countDocuments.mockResolvedValue(10);
      
      const query = {
        difficulty: 'medium',
        category: 'javascript',
        sort: 'title',
        order: 'asc',
        page: 2,
        limit: 5
      };
      
      const result = await GameService.getGames(query, 'user123');
      
      expect(mockedGame.find).toHaveBeenCalledWith({
        isActive: true,
        difficulty: 'medium',
        category: 'javascript'
      });
      
      expect(mockedUser.findById).toHaveBeenCalledWith('user123');
      expect(result.games).toHaveLength(2);
      expect(result.pagination).toEqual({
        page: 2,
        limit: 5,
        total: 10,
        hasNextPage: true
      });
    });
    
    it('should handle default query parameters', async () => {
      mockedUser.findById.mockReturnValue({
        select: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue(null)
        })
      } as any);
      
      mockedGame.find.mockReturnValue({
        sort: vi.fn().mockReturnThis(),
        skip: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        lean: vi.fn().mockResolvedValue([])
      } as any);
      
      mockedGame.countDocuments.mockResolvedValue(0);
      
      const result = await GameService.getGames({});
      
      expect(mockedGame.find).toHaveBeenCalledWith({ isActive: true });
      expect(result.pagination.page).toBe(1);
      expect(result.pagination.limit).toBe(10);
      expect(result.pagination.hasNextPage).toBe(false);
    });
  });
  
  describe('getGameBySlug', () => {
    it('should retrieve a game by slug', async () => {
      const mockGame = {
        _id: 'game123',
        title: 'Test Game',
        slug: 'test-game',
        requiredLevel: 2,
        completions: { users: ['user123'] },
        isActive: true
      };
      
      mockedGame.findOne.mockReturnValue({
        lean: vi.fn().mockResolvedValue(mockGame)
      } as any);
      
      mockedUser.findById.mockReturnValue({
        select: vi.fn().mockReturnValue({
          lean: vi.fn().mockResolvedValue({ stats: { level: 3 } })
        })
      } as any);
      
      const result = await GameService.getGameBySlug('test-game', 'user123');
      
      expect(mockedGame.findOne).toHaveBeenCalledWith({
        slug: 'test-game',
        isActive: true
      });
      
      expect(result.game.isCompleted).toBe(true);
      expect(result.game.isLevelAvailable).toBe(true);
    });
    
    it('should throw ValidationError if game not found', async () => {
      mockedGame.findOne.mockReturnValue({
        lean: vi.fn().mockResolvedValue(null)
      } as any);
      
      await expect(GameService.getGameBySlug('nonexistent-game')).rejects.toThrow(ValidationError);
      expect(mockedGame.findOne).toHaveBeenCalledWith({
        slug: 'nonexistent-game',
        isActive: true
      });
    });
  });
}); 