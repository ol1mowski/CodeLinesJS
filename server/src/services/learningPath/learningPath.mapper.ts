import { Types } from 'mongoose';
import { 
  LearningPathResponse,
  LearningPathDetailResponse,
} from './types.js';

export class LearningPathMapper {
  static toLearningPathResponse(
    path: any, 
    userLevel: number,
    userLearningPaths: any[] = []
  ): LearningPathResponse {
    const userPathProgress = userLearningPaths.find(
      lp => lp.pathId.toString() === path._id.toString()
    );

    const completedPath = userLearningPaths.find(
      lp => lp.pathId.toString() === path._id.toString()
    );

    const completedLessons = completedPath?.progress?.completedLessons || [];
    const completedCount = Array.isArray(completedLessons) ? completedLessons.length : 0;
    const totalLessons = path.totalLessons || 0;

    return {
      id: path._id,
      title: path.title,
      description: path.description,
      difficulty: path.difficulty,
      estimatedTime: path.estimatedTime,
      requirements: path.requirements,
      outcomes: path.outcomes,
      requiredLevel: path.requiredLevel,
      isAvailable: userLevel >= path.requiredLevel,
      totalLessons,
      progress: {
        completed: completedLessons,
        total: totalLessons,
        percentage: totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0,
        isStarted: completedCount > 0,
        isCompleted: completedCount === totalLessons && totalLessons > 0
      }
    };
  }

  static toLearningPathDetailResponse(
    learningPath: any,
    userLevel: number,
    userPathProgress: any,
    completedLessons: Types.ObjectId[]
  ): LearningPathDetailResponse {
    const totalLessons = learningPath.lessons?.length || 0;
    const completedCount = Array.isArray(completedLessons) ? completedLessons.length : 0;

    return {
      id: learningPath._id,
      title: learningPath.title,
      description: learningPath.description,
      difficulty: learningPath.difficulty,
      category: learningPath.category,
      estimatedTime: learningPath.estimatedTime,
      requirements: learningPath.requirements,
      outcomes: learningPath.outcomes,
      isAvailable: userLevel >= learningPath.requiredLevel,
      requiredLevel: learningPath.requiredLevel,
      totalLessons,
      progress: {
        completed: completedLessons,
        total: totalLessons,
        percentage: totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0
      },
      completedLessons: completedLessons,
      lessons: learningPath.lessons.map((lesson: any) => ({
        id: lesson._id,
        title: lesson.title,
        description: lesson.description,
        category: lesson.category,
        difficulty: lesson.difficulty,
        duration: lesson.duration,
        points: lesson.points,
        slug: lesson.slug,
        isCompleted: completedLessons.some(
          (id: Types.ObjectId) => id.toString() === lesson._id.toString()
        ),
        requirements: lesson.requirements
      }))
    };
  }

  static calculateUserStats(paths: LearningPathResponse[], userLevel: number, userPoints: number): any {
    return {
      level: userLevel,
      totalPoints: userPoints,
      totalPaths: paths.length,
      completedPaths: paths.filter(p => p.progress.isCompleted).length,
      pathsInProgress: paths.filter(
        p => !p.progress.isCompleted && p.isAvailable
      ).length
    };
  }
} 