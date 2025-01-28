import { Resource } from '../models/index.js';
import { User } from '../models/user.model.js';
import { ValidationError } from '../utils/errors.js';

export const getResources = async (req, res, next) => {
  try {
    const { category, type, difficulty, search, tag } = req.query;
    const query = { isPublished: true };
    
    if (category) query.category = category;
    if (type) query.type = type;
    if (difficulty) query.difficulty = difficulty;
    if (tag) query.tags = tag;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }
    
    const user = await User.findById(req.user.userId)
      .select('stats.progress.currentLevel preferences.savedResources')
      .lean();
    
    const userLevel = user.stats?.progress?.currentLevel || 1;
    query.requiredLevel = { $lte: userLevel };
    
    const resources = await Resource.find(query)
      .sort({ likes: -1, createdAt: -1 })
      .lean();
    
    const savedResources = user.preferences?.savedResources || [];
    
    const formattedResources = resources.map(resource => ({
      id: resource._id,
      title: resource.title,
      description: resource.description,
      url: resource.url,
      type: resource.type,
      category: resource.category,
      difficulty: resource.difficulty,
      tags: resource.tags,
      author: resource.author,
      likes: resource.likes,
      views: resource.views,
      requiredLevel: resource.requiredLevel,
      isSaved: savedResources.includes(resource._id),
      createdAt: resource.createdAt
    }));
    
    res.json({
      resources: formattedResources,
      total: formattedResources.length
    });
  } catch (error) {
    next(error);
  }
};

export const getResourceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const [resource, user] = await Promise.all([
      Resource.findById(id).lean(),
      User.findById(req.user.userId)
        .select('stats.progress.currentLevel preferences.savedResources')
        .lean()
    ]);
    
    if (!resource || !resource.isPublished) {
      throw new ValidationError('Zasób nie został znaleziony');
    }
    
    const userLevel = user.stats?.progress?.currentLevel || 1;
    if (userLevel < resource.requiredLevel) {
      throw new ValidationError('Nie masz wystarczającego poziomu, aby zobaczyć ten zasób');
    }
    
    // Inkrementuj licznik wyświetleń
    await Resource.findByIdAndUpdate(id, { $inc: { views: 1 } });
    
    const savedResources = user.preferences?.savedResources || [];
    
    res.json({
      ...resource,
      isSaved: savedResources.includes(resource._id)
    });
  } catch (error) {
    next(error);
  }
};

export const toggleSaveResource = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    const resource = await Resource.findById(id);
    if (!resource) {
      throw new ValidationError('Zasób nie został znaleziony');
    }
    
    const user = await User.findById(userId);
    const savedResources = user.preferences?.savedResources || [];
    
    const isAlreadySaved = savedResources.includes(id);
    
    if (isAlreadySaved) {
      user.preferences.savedResources = savedResources.filter(
        resourceId => resourceId.toString() !== id
      );
    } else {
      if (!user.preferences) user.preferences = {};
      if (!user.preferences.savedResources) user.preferences.savedResources = [];
      user.preferences.savedResources.push(id);
    }
    
    await user.save();
    
    res.json({
      message: isAlreadySaved ? 'Usunięto z zapisanych' : 'Dodano do zapisanych',
      isSaved: !isAlreadySaved
    });
  } catch (error) {
    next(error);
  }
}; 