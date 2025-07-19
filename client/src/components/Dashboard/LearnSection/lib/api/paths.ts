import { httpClient } from "../../../../../api/httpClient.api";

export const fetchLearningPaths = async () => {
  
  const response = await httpClient.get(`Learning-paths`);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};

export const fetchLearningPathProgress = async (userId: string, pathId: string) => {
  
  const response = await httpClient.get(`users/${userId}/paths/${pathId}/progress`);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};
