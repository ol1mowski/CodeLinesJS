import { Topic, Tag } from '../../types/trending.types';

const BASE_URL = 'http://localhost:3000';

export const trendingApi = {
  getPopularTags: async (): Promise<Tag[]> => {
    const response = await fetch(`${BASE_URL}/trending/tags`);
    if (!response.ok) {
      throw new Error('Failed to fetch popular tags');
    }
    return response.json();
  },

  getTrendingTopics: async (): Promise<Topic[]> => {
    const response = await fetch(`${BASE_URL}/trending/topics`);
    if (!response.ok) {
      throw new Error('Failed to fetch trending topics');
    }
    return response.json();
  }
}; 