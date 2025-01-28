import { LessonProgress } from "../../types/lesson.types";

const API_URL = 'http://localhost:5001/api';

const token = localStorage.getItem('token') || sessionStorage.getItem('token');

export const fetchUserProgress = async (userId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}/progress`, {
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

export const fetchLessonProgress = async (userId: string, lessonId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}/lessons/${lessonId}/progress`, {
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

export const updateLessonProgress = async (userId: string, lessonId: string, progress: LessonProgress) => {
  const response = await fetch(
    `${API_URL}/users/${userId}/lessons/${lessonId}/progress`,
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