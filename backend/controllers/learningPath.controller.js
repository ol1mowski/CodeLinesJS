import { LearningPath } from '../models/index.js';
import { User } from '../models/user.model.js';
import { ValidationError } from '../utils/errors.js';

export const getLearningPaths = async (req, res, next) => {
  try {
    const { difficulty, search, category } = req.query;
    const query = { isActive: true };
    
    if (difficulty) query.difficulty = difficulty;
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const [learningPaths, user] = await Promise.all([
      LearningPath.find(query)
        .populate({
          path: 'lessons',
          select: 'title description category difficulty duration points'
        })
        .lean(),
      User.findById(req.user.userId)
        .select('stats.completedChallenges stats.progress.currentLevel')
        .lean()
    ]);

    const completedLessons = user.stats?.completedChallenges || [];
    const userLevel = user.stats?.progress?.currentLevel || 1;
    
    const pathsWithProgress = learningPaths.map(path => {
      const pathCompletedLessons = path.lessons.filter(lesson => 
        completedLessons.some(id => id.toString() === lesson._id.toString())
      );
      
      const progress = {
        completed: pathCompletedLessons.length,
        total: path.lessons.length,
        percentage: Math.round((pathCompletedLessons.length / path.lessons.length) * 100)
      };

      const isAvailableForUser = path.isAvailable && userLevel >= path.requiredLevel;
      
      return {
        id: path._id,
        title: path.title,
        description: path.description,
        difficulty: path.difficulty,
        category: path.category,
        estimatedTime: path.estimatedTime,
        requirements: path.requirements,
        outcomes: path.outcomes,
        progress,
        isAvailable: isAvailableForUser,
        requiredLevel: path.requiredLevel,
        isLocked: userLevel < path.requiredLevel,
        lessons: path.lessons.map(lesson => ({
          id: lesson._id,
          title: lesson.title,
          description: lesson.description,
          category: lesson.category,
          difficulty: lesson.difficulty,
          duration: lesson.duration,
          points: lesson.points,
          isCompleted: completedLessons.some(id => id.toString() === lesson._id.toString())
        }))
      };
    });
    
    res.json(pathsWithProgress);
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