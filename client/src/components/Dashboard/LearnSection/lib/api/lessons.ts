import type { Lesson } from "../../types/lesson.types";
import { API_URL } from "../../../../../config/api.config";

export const fetchLesson = async (lessonId: string, token: string): Promise<Lesson> => {
  const response = await fetch(`${API_URL}lessons/${lessonId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("lesson_not_found");
    }
    throw new Error("Failed to fetch lesson");
  }

  return response.json();
};

export const completeLesson = async ({
  lessonId,
  pathId,
  token
}: {
  lessonId: string;
  pathId?: string;
  token: string;
}) => {

  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_URL}lessons/${lessonId}/complete`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pathId })
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('API error:', error);
    throw new Error(error || 'Failed to complete lesson');
  }

  return response.json();
};

export const fetchLessons = async (token: string) => {   
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_URL}lessons`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized - please log in again');
    }
    throw new Error('Failed to fetch lessons');
  }
  
  const data = await response.json();
  return data;
}; 