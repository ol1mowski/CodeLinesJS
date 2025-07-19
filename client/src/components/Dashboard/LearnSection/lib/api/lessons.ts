import { httpClient } from "../../../../../api/httpClient.api";
import type { Lesson } from '../../types/lesson.types';

export const fetchLesson = async (lessonId: string): Promise<Lesson> => {
  
  const response = await httpClient.get(`lessons/${lessonId}`);

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
  
  const response = await httpClient.post(`lessons/${lessonId}/complete`, { pathId });

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};

export const fetchLessons = async () => {
  
  const response = await httpClient.get(`lessons`);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};
