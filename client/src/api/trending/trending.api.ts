import { Topic, Tag } from '../../types/trending.types';
import { API_URL } from '../../config/api.config';

export const trendingApi = {
  getPopularTags: async (): Promise<Tag[]> => {
    const response = await fetch(`${API_URL}/api/trending/tags`);
    if (!response.ok) {
      throw new Error('Błąd podczas pobierania popularnych tagów');
    }
    return response.json();
  },

  getTrendingTopics: async (): Promise<Topic[]> => {
    const response = await fetch(`${API_URL}/api/trending/topics`);
    if (!response.ok) {
      throw new Error('Błąd podczas pobierania trendy');
    }
    return response.json();
  }
}; 