import { LessonProgress } from '../../types/lesson.types';
import { API_URL } from '../../../../../config/api.config';
import { useApi } from '../../../../../api/hooks/useApi.hook';

export const fetchUserProgress = async (userId: string) => {
  const api = useApi<any>();
  const response = await api.get(`${API_URL}users/${userId}/progress`);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};

export const fetchLessonProgress = async (userId: string, lessonId: string) => {
  const api = useApi<any>();
  const response = await api.get(`${API_URL}users/${userId}/lessons/${lessonId}/progress`);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};

export const updateLessonProgress = async (
  userId: string,
  lessonId: string,
  progress: LessonProgress,
) => {
  const api = useApi<any>();
  const response = await api.put(`${API_URL}users/${userId}/lessons/${lessonId}/progress`, progress);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};
