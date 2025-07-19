import { httpClient } from "../../../../../api/httpClient.api";  
import { LessonProgress } from '../../types/lesson.types';

export const fetchUserProgress = async (userId: string) => {
  
  const response = await httpClient.get(`users/${userId}/progress`);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};

export const fetchLessonProgress = async (userId: string, lessonId: string) => {
  
  const response = await httpClient.get(`users/${userId}/lessons/${lessonId}/progress`);

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
  
  const response = await httpClient.put(`users/${userId}/lessons/${lessonId}/progress`, progress);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};
