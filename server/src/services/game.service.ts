import { Game } from '../models/game.model.js';
import { User } from '../models/user.model.js';
import { ValidationError } from '../utils/errors.js';
import {
  GameWithUserInfo,
  GameQuery,
  SortOptions,
  GamesResponse,
  GameResponse,
  GameDifficulty,
  GameCategory
} from '../types/game.types.js';

export class GameService {
  static getRandomElements<T>(array: T[], count: number): T[] {
    if (!array || array.length <= count) return array || [];
    
    const shuffled = [...array];
    
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, count);
  }

  static async getUserLevel(userId?: string): Promise<number> {
    if (!userId) return 1;
    
    const user = await User.findById(userId).select('stats.level').lean();
    return user?.stats?.level || 1;
  }

  static enrichGameWithUserInfo(
    game: Record<string, any>,
    userId?: string,
    userLevel: number = 1,
    gameDataLimit: number = 7
  ): GameWithUserInfo {
    const enrichedGameData = this.getRandomElements(game.gameData || [], gameDataLimit).map((item: Record<string, any>) => ({
      ...item,
      isCompleted: userId ? game.completions?.users?.includes(userId) : false,
      isLevelAvailable: userLevel >= (game.requiredLevel || 1)
    }));

    return {
      _id: game._id,
      title: game.title,
      slug: game.slug,
      description: game.description,
      difficulty: game.difficulty,
      requiredLevel: game.requiredLevel,
      rating: game.rating,
      completions: game.completions,
      rewardPoints: game.rewardPoints,
      gameData: enrichedGameData,
      isActive: game.isActive,
      category: game.category,
      estimatedTime: game.estimatedTime,
      isCompleted: userId ? game.completions?.users?.includes(userId) : false,
      isLevelAvailable: userLevel >= (game.requiredLevel || 1),
      createdAt: game.createdAt,
      updatedAt: game.updatedAt
    };
  }

  static async getGames(
    query: {
      difficulty?: string;
      category?: string;
      sort?: string;
      order?: string;
      page?: string | number;
      limit?: string | number;
    },
    userId?: string
  ): Promise<GamesResponse> {
    const {
      difficulty,
      category,
      sort = 'rating.average',
      order = 'desc',
      page = 1,
      limit = 10,
    } = query;

    const userLevel = await this.getUserLevel(userId);
    const parsedPage = typeof page === 'string' ? parseInt(page, 10) : page;
    const parsedLimit = typeof limit === 'string' ? parseInt(limit, 10) : limit;

    const gameQuery: GameQuery = { isActive: true };
    
    if (difficulty) {
      gameQuery.difficulty = difficulty as GameDifficulty;
    }
    
    if (category) {
      gameQuery.category = category as GameCategory;
    }

    const skip = (parsedPage - 1) * parsedLimit;
    const sortOptions: SortOptions = { [sort]: order === 'desc' ? -1 : 1 };

    const [games, total] = await Promise.all([
      Game.find(gameQuery)
        .sort(sortOptions)
        .skip(skip)
        .limit(parsedLimit)
        .lean(),
      Game.countDocuments(gameQuery)
    ]);

    const hasNextPage = skip + games.length < total;
    
    const gamesWithUserInfo = games.map(game => 
      this.enrichGameWithUserInfo(game, userId, userLevel)
    );
    
    return {
      games: gamesWithUserInfo,
      pagination: {
        page: parsedPage,
        limit: parsedLimit,
        total,
        hasNextPage
      }
    };
  }

  static async getGameBySlug(slug: string, userId?: string): Promise<GameResponse> {
    const game = await Game.findOne({ slug, isActive: true }).lean();

    if (!game) {
      throw new ValidationError('Gra nie istnieje');
    }

    const userLevel = await this.getUserLevel(userId);
    const gameWithUserInfo = this.enrichGameWithUserInfo(game, userId, userLevel);

    return { game: gameWithUserInfo };
  }
} 