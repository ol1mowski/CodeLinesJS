import { LearningPath } from '../../models/learningPath.model.js';
import { User } from '../../models/user.model.js';
import { Types } from 'mongoose';

interface LearningPathQuery {
  isActive: boolean;
  difficulty?: string;
  $or?: Array<{
    title: { $regex: string; $options: string };
  } | {
    description: { $regex: string; $options: string };
  }>;
}

export class LearningPathRepository {
  static async findAll(query: LearningPathQuery): Promise<any[]> {
    return LearningPath.find(query).lean();
  }

  static async findById(id: string): Promise<any | null> {
    return LearningPath.findOne({
      _id: id,
      isActive: true
    }).populate({
      path: 'lessons',
      select: 'title description category difficulty duration points requirements slug'
    });
  }

  static async checkPathExists(id: string): Promise<boolean> {
    const count = await LearningPath.countDocuments({ _id: id, isActive: true });
    return count > 0;
  }
}

export class UserRepository {
  static async findUserWithLearningPathStats(userId: string): Promise<any | null> {
    return User.findById(userId)
      .select('stats.level stats.points stats.learningPaths')
      .lean();
  }

  static async getUserLevel(userId: string): Promise<number> {
    const user = await this.findUserWithLearningPathStats(userId);
    return user?.stats?.level || 1;
  }

  static getUserLearningPathProgress(
    user: any,
    pathId: string | Types.ObjectId
  ): { 
    pathProgress: any; 
    completedLessons: any;
  } {
    const userLearningPaths = user?.stats?.learningPaths || [];
    const pathProgress = userLearningPaths.find(
      lp => lp.pathId.toString() === pathId.toString()
    );

    const completedLessons = pathProgress?.progress?.completedLessons || [];
    
    return { pathProgress, completedLessons };
  }
} 