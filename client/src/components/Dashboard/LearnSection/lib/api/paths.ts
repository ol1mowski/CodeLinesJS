import { API_URL } from '../../../../../config/api.config';
import { useApi } from '../../../../../api/hooks/useApi.hook';

export const fetchLearningPaths = async () => {
  const api = useApi<any>();
  const response = await api.get(`${API_URL}Learning-paths`);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};

export const fetchLearningPathProgress = async (userId: string, pathId: string) => {
  const api = useApi<any>();
  const response = await api.get(`${API_URL}users/${userId}/paths/${pathId}/progress`);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};
