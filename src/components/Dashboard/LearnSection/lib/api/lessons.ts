import { getAuthToken } from '../utils/auth';

const API_URL = 'http://localhost:5001/api';

export const fetchLesson = async (lessonId: string) => {
  if (!lessonId) throw new Error('No lesson ID provided');

  console.log('Fetching lesson:', lessonId); // Debugging

  try {
    const response = await fetch(`${API_URL}/lessons/${lessonId}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('lesson_not_found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching lesson:', error);
    throw error;
  }
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