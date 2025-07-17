import { LessonProgress } from '../../types/lesson.types';
import { API_URL } from '../../../../../config/api.config';

export const fetchUserProgress = async (userId: string) => {
  const response = await fetch(`${API_URL}users/${userId}/progress`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Błąd podczas pobierania postępu');
  }
  const data = await response.json();
  return data;
};

export const fetchLessonProgress = async (userId: string, lessonId: string) => {
  const response = await fetch(`${API_URL}users/${userId}/lessons/${lessonId}/progress`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Błąd podczas pobierania postępu');
  }
  return response.json();
};

export const updateLessonProgress = async (
  userId: string,
  lessonId: string,
  progress: LessonProgress,
) => {
  const response = await fetch(`${API_URL}users/${userId}/lessons/${lessonId}/progress`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(progress),
  });
  if (!response.ok) {
    throw new Error('Błąd podczas aktualizacji postępu');
  }
  return response.json();
};
