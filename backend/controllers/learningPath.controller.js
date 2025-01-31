import { LearningPath } from '../models/index.js';
import { User } from '../models/user.model.js';
import { ValidationError } from '../utils/errors.js';

export const getLearningPaths = async (req, res, next) => {
  try {
    const { difficulty, search } = req.query;
    const query = { isActive: true };
    
    if (difficulty) query.difficulty = difficulty;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const [paths, user] = await Promise.all([
      LearningPath.find(query).lean(),
      User.findById(req.user.userId)
        .select('stats.completedLessons stats.learningPaths stats.points stats.level')
        .lean()
    ]);

    const userLevel = user.stats?.level || 1;

    const formattedPaths = paths.map(path => {
      const userProgress = user.stats?.learningPaths?.find(
        p => p.pathId.toString() === path._id.toString()
      ) || {
        completedLessonsCount: 0,
        startedAt: null,
        lastCompletedAt: null
      };

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
        totalLessons: path.totalLessons,
        progress: {
          completed: userProgress.completedLessonsCount,
          total: path.totalLessons,
          percentage: Math.round((userProgress.completedLessonsCount / path.totalLessons) * 100),
          lastCompletedAt: userProgress.lastCompletedAt,
          startedAt: userProgress.startedAt,
          isStarted: !!userProgress.startedAt,
          isCompleted: userProgress.completedLessonsCount === path.totalLessons,
          totalLessons: path.totalLessons
        }
      };
    });

    res.json({
      paths: formattedPaths,
      userStats: {
        level: userLevel,
        totalPoints: user.stats?.points || 0,
        totalPaths: paths.length,
        completedPaths: user.stats?.learningPaths?.filter(
          p => p.completedLessonsCount === paths.find(
            path => path._id.toString() === p.pathId.toString()
          )?.totalLessons
        )?.length || 0,
        pathsInProgress: user.stats?.learningPaths?.filter(
          p => p.completedLessonsCount > 0 && p.completedLessonsCount < paths.find(
            path => path._id.toString() === p.pathId.toString()
          )?.totalLessons
        )?.length || 0,
        recentActivity: user.stats?.learningPaths
          ?.sort((a, b) => b.lastCompletedAt - a.lastCompletedAt)
          ?.slice(0, 3)
          ?.map(p => ({
            pathId: p.pathId,
            completedLessons: p.completedLessonsCount,
            lastCompletedAt: p.lastCompletedAt
          }))
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getLearningPathById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const [learningPath, user] = await Promise.all([
      LearningPath.findOne({ 
        _id: id,
        isActive: true 
      }).populate({
        path: 'lessons',
        select: 'title description category difficulty duration points requirements'
      }),
      User.findById(req.user.userId)
        .select('stats.completedChallenges stats.progress.currentLevel')
        .lean()
    ]);
    
    if (!learningPath) {
      throw new ValidationError('Ścieżka nauki nie została znaleziona');
    }

    const userLevel = user.stats?.progress?.currentLevel || 1;
    
    if (!learningPath.isAvailable || userLevel < learningPath.requiredLevel) {
      throw new ValidationError('Nie masz dostępu do tej ścieżki nauki');
    }
    
    const completedLessons = learningPath.lessons.filter(lesson => 
      user.stats.completedChallenges.includes(lesson._id)
    );
    
    const response = {
      id: learningPath._id,
      title: learningPath.title,
      description: learningPath.description,
      difficulty: learningPath.difficulty,
      category: learningPath.category,
      estimatedTime: learningPath.estimatedTime,
      requirements: learningPath.requirements,
      outcomes: learningPath.outcomes,
      isAvailable: learningPath.isAvailable,
      requiredLevel: learningPath.requiredLevel,
      progress: {
        completed: completedLessons.length,
        total: learningPath.lessons.length,
        percentage: Math.round((completedLessons.length / learningPath.lessons.length) * 100)
      },
      lessons: learningPath.lessons.map(lesson => ({
        id: lesson._id,
        title: lesson.title,
        description: lesson.description,
        category: lesson.category,
        difficulty: lesson.difficulty,
        duration: lesson.duration,
        points: lesson.points,
        isCompleted: user.stats.completedChallenges.includes(lesson._id),
        requirements: lesson.requirements
      }))
    };
    
    res.json(response);
  } catch (error) {
    next(error);
  }
}; 