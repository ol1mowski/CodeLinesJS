import { LessonProgress } from "../../types/lesson.types";

const API_URL = 'http://localhost:5001/api';

export const fetchUserProgress = async (userId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}/progress`);
  if (!response.ok) {
    throw new Error('Failed to fetch progress');
  }
  return response.json();
};

export const updateLessonProgress = async (userId: string, lessonId: string, progress: LessonProgress) => {
  const response = await fetch(
    `${API_URL}/users/${userId}/progress/${lessonId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(progress),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to update progress');
  }
  return response.json();
}; 