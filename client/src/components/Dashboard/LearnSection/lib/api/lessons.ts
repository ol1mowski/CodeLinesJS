import type { Lesson } from '../../types/lesson.types';
import { API_URL } from '../../../../../config/api.config';
import { useApi } from '../../../../../api/hooks/useApi.hook';

export const fetchLesson = async (lessonId: string): Promise<Lesson> => {
  const api = useApi<any>();
  const response = await api.get(`${API_URL}lessons/${lessonId}`);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};

export const completeLesson = async ({
  lessonId,
  pathId,
}: {
  lessonId: string;
  pathId?: string;
}) => {
  const api = useApi<any>();
  const response = await api.post(`${API_URL}lessons/${lessonId}/complete`, { pathId });

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};

export const fetchLessons = async () => {
  const api = useApi<any>();
  const response = await api.get(`${API_URL}lessons`);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};
