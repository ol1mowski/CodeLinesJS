import { getAuthToken } from '../utils/auth';

import type { Lesson } from "../../types/lesson.types";

const API_URL = "http://localhost:5001/api";

export const fetchLesson = async (lessonId: string): Promise<Lesson> => {
  const response = await fetch(`${API_URL}/lessons/${lessonId}`);
  

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("lesson_not_found");
    }
    throw new Error("Failed to fetch lesson");
  }

  return response.json();
};

export const completeLesson = async ({
  userId,
  lessonId,
  pathId
}: {
  userId: string;
  lessonId: string;
  pathId?: string;
}) => {
  const response = await fetch(`${API_URL}/lessons/${lessonId}/complete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, pathId }),
  });

  if (!response.ok) {
    throw new Error("Failed to complete lesson");
  }

  return response.json();
};

export const fetchLessons = async () => {   
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_URL}/lessons`, {
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