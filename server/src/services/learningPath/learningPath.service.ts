import { ValidationError } from '../../utils/errors.js';
import { LearningPathRepository, UserRepository } from './learningPath.repository.js';
import { LearningPathMapper } from './learningPath.mapper.js';
import { LearningPathResponse, LearningPathDetailResponse } from './types.js';

// Lokalna definicja typu zapytania
interface QueryOptions {
  difficulty?: string; 
  search?: string;
}

export class LearningPathService {
  static async getLearningPaths(userId: string, query: QueryOptions): Promise<{
    paths: LearningPathResponse[],
    userStats: any
  }> {
    const { difficulty, search } = query;
    const pathQuery: any = { isActive: true };

    if (difficulty) pathQuery.difficulty = difficulty;
    if (search) {
      pathQuery.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const [paths, user] = await Promise.all([
      LearningPathRepository.findAll(pathQuery),
      UserRepository.findUserWithLearningPathStats(userId)
    ]);

    const userLevel = user?.stats?.level || 1;
    const userLearningPaths = user?.stats?.learningPaths || [];

    const formattedPaths = paths.map(path => 
      LearningPathMapper.toLearningPathResponse(path, userLevel, userLearningPaths)
    );

    const userStats = LearningPathMapper.calculateUserStats(
      formattedPaths, 
      userLevel, 
      user?.stats?.points || 0
    );

    return {
      paths: formattedPaths,
      userStats
    };
  }

  static async getLearningPathById(pathId: string, userId: string): Promise<LearningPathDetailResponse> {
    const [learningPath, user] = await Promise.all([
      LearningPathRepository.findById(pathId),
      UserRepository.findUserWithLearningPathStats(userId)
    ]);

    if (!learningPath) {
      throw new ValidationError('Ścieżka nauki nie została znaleziona');
    }

    const userLevel = user?.stats?.level || 1;
    
    if (userLevel < learningPath.requiredLevel) {
      throw new ValidationError('Nie masz dostępu do tej ścieżki nauki');
    }

    const { pathProgress, completedLessons } = UserRepository.getUserLearningPathProgress(
      user, 
      learningPath._id
    );

    return LearningPathMapper.toLearningPathDetailResponse(
      learningPath,
      userLevel,
      pathProgress,
      completedLessons
    );
  }
} 