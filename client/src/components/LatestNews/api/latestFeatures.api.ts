import { httpClient } from "../../../api/httpClient.api";

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
    const response = await httpClient.get(`latest-features?limit=2&isActive=true&sortBy=releaseDate&sortOrder=desc`);

    if (response.error) {
      throw new Error(response.error);
    }

    if (!response.data) {
      throw new Error('Brak danych z serwera');
    }

    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania najnowszych funkcji:', error);
    throw error;
  }
}; 