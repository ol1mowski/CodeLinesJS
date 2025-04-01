import { Types } from 'mongoose';
import { User } from '../../models/user.model.js';
import { ValidationError } from '../../utils/errors.js';
import { calculateLearningPathsProgress } from './utils/learning-path.utils.js';
import { calculateStreak } from './utils/date.utils.js';
import { 
  UserProfileResponse, 
  ActiveUsersResponse, 
  UserProgressResponse,
  UserStatsResponse,
  UpdateUserStatsRequest,
  IUserService
} from './interfaces/user.interfaces.js';
import { IUser } from '../../types/user.types.js';

export class UserService implements IUserService {
  async getUserProfile(userId: string): Promise<UserProfileResponse> {
    const user = await User.findById(userId)
      .select('username email profile preferences stats.level')
      .lean();

    if (!user) {
      throw new ValidationError('Nie znaleziono użytkownika');
    }

    return {
      status: 'success',
      data: {
        username: user.username,
        email: user.email,
        profile: user.profile || {},
        preferences: user.preferences || {},
        stats: {
          level: user.stats?.level || 1
        }
      }
    };
  }

  async getActiveUsers(): Promise<ActiveUsersResponse> {
    const activeUsers = await User.find({ isActive: true })
      .select('username')
      .limit(10)
      .lean();

    return {
      users: activeUsers.map(user => ({ username: user.username }))
    };
  }

  async getUserProgress(userId: string): Promise<UserProgressResponse> {
    const user = await User.findById(userId)
      .select('stats.learningPaths')
      .lean();

    if (!user) {
      throw new ValidationError('Nie znaleziono użytkownika');
    }

    const learningPaths = await this.getLearningPaths();
    
    const progressData = calculateLearningPathsProgress(user.stats, learningPaths);

    const formattedData = progressData.map(path => ({
      pathId: path.pathId,
      title: path.title,
      status: path.progress.status,
      progress: {
        completed: path.progress.completed,
        total: path.progress.total,
        percentage: path.progress.percentage,
        lastActivity: new Date(),
        startedAt: new Date(),
        completedAt: undefined
      }
    }));

    return {
      status: 'success',
      data: formattedData
    };
  }

  async getUserStats(userId: string): Promise<UserStatsResponse> {
    const user = await User.findById(userId)
      .select('stats badges')
      .lean();

    if (!user) {
      throw new ValidationError('Nie znaleziono użytkownika');
    }

    const stats = user.stats || {};
    
    const typedStats = stats as NonNullable<IUser['stats']>;
    
    const learningPaths = await this.getLearningPaths();
    
    const progressData = calculateLearningPathsProgress(typedStats, learningPaths);

    const dailyData = typedStats.daily || typedStats.chartData?.daily || [];
    
    const streak = calculateStreak(dailyData);
    
    const currentLevel = typedStats.level || 1;
    const pointsToNextLevel = this.calculatePointsToNextLevel(currentLevel, typedStats.points || 0);

    return {
      status: 'success',
      data: {
        points: typedStats.points || 0,
        level: currentLevel,
        streak: streak,
        bestStreak: typedStats.bestStreak || 0,
        pointsToNextLevel,
        completedChallenges: typedStats.completedChallenges || 0,
        badges: typedStats.badges || [],
        lastActive: typedStats.lastActive || new Date(),
        learningPaths: progressData,
        chartData: {
          daily: dailyData,
          progress: progressData
        }
      }
    };
  }

  async updateUserStats(userId: string, statsData: UpdateUserStatsRequest): Promise<UserStatsResponse> {
    const { points = 0, xp = 0 } = statsData;
    
    const user = await User.findById(userId);
    if (!user) {
      throw new ValidationError('Nie znaleziono użytkownika');
    }

    if (!user.stats) user.stats = {} as any;
    
    const typedStats = user.stats as any;
    
    typedStats.points = (typedStats.points || 0) + points + xp;
    
    const newLevel = this.calculateLevel(typedStats.points);
    const leveledUp = newLevel > (typedStats.level || 1);
    typedStats.level = newLevel;
    
    const today = new Date().toISOString().split('T')[0];
    
    if (!typedStats.dailyData) {
      if (typedStats.daily) {
        typedStats.dailyData = typedStats.daily;
      } else {
        typedStats.dailyData = [];
      }
    }
    
    const todayEntry = typedStats.dailyData.find(entry => entry.date === today);
    
    if (todayEntry) {
      todayEntry.points += points;
    } else {
      typedStats.dailyData.push({
        date: today,
        points: points
      });
    }
    
    const streak = calculateStreak(typedStats.dailyData);
    typedStats.streak = streak;
    
    if (streak > (typedStats.bestStreak || 0)) {
      typedStats.bestStreak = streak;
    }
    
    typedStats.lastActive = new Date();
    
    user.markModified('stats');
    await user.save();
    
    return this.getUserStats(userId);
  }

  private async getLearningPaths() {
    return [
      {
        _id: new Types.ObjectId(),
        title: "JavaScript Fundamentals",
        totalLessons: 10,
        level: 1
      },
      {
        _id: new Types.ObjectId(),
        title: "Advanced JavaScript",
        totalLessons: 8,
        level: 2
      },
      {
        _id: new Types.ObjectId(),
        title: "TypeScript Fundamentals",
        totalLessons: 12,
        level: 2
      }
    ];
  }

  private calculateLevel(points: number): number {
    return Math.max(1, Math.floor(points / 1000) + 1);
  }

  private calculatePointsToNextLevel(currentLevel: number, currentPoints: number): number {
    const pointsForNextLevel = currentLevel * 1000;
    return Math.max(0, pointsForNextLevel - currentPoints);
  }
}

export const userService = new UserService(); 