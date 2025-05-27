import { API_URL } from '../../../config/api.config';

export interface LatestFeature {
  _id: string;
  title: string;
  description: string;
  category: 'feature' | 'update' | 'improvement' | 'bugfix';
  version?: string;
  isActive: boolean;
  priority: number;
  releaseDate: string;
  tags: string[];
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LatestFeaturesResponse {
  success: boolean;
  data: LatestFeature[];
  count: number;
}

export const fetchLatestFeatures = async (): Promise<LatestFeature[]> => {
  try {
    const response = await fetch(`${API_URL}latest-features?limit=2&isActive=true&sortBy=releaseDate&sortOrder=desc`);

    if (!response.ok) {
      throw new Error('Błąd podczas pobierania najnowszych funkcji');
    }

    const responseData: LatestFeaturesResponse = await response.json();
    
    return responseData.data || [];
  } catch (error) {
    console.error('Błąd podczas pobierania najnowszych funkcji:', error);
    throw error;
  }
}; 