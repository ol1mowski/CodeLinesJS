import { getTopics as getTopicsService, getTags as getTagsService } from '../services/trending.service.js';

export const getTopics = async (req, res) => {
  try {
    const topics = await getTopicsService();
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch topics' });
  }
};

export const getTags = async (req, res) => {
  try {
    const tags = await getTagsService();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tags' });
  }
}; 