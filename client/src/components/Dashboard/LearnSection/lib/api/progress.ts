import { LessonProgress } from "../../types/lesson.types";
import { API_URL } from "../../../../../config/api.config";


export const fetchUserProgress = async (userId: string, token: string) => {
  const response = await fetch(`${API_URL}users/${userId}/progress`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch progress');
  }
  const data = await response.json();
  return data;
};

export const fetchLessonProgress = async (userId: string, lessonId: string, token: string) => {
    const response = await fetch(`${API_URL}users/${userId}/lessons/${lessonId}/progress`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch progress');
  }
  return response.json();
};

export const updateLessonProgress = async (userId: string, lessonId: string, progress: LessonProgress, token: string) => {
  const response = await fetch(
    `${API_URL}users/${userId}/lessons/${lessonId}/progress`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(progress)
    }
    
  );
  if (!response.ok) {
    throw new Error('Failed to update progress');
  }
  return response.json();
}; 