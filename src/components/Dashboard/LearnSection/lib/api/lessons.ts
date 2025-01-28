import { getAuthToken } from '../utils/auth';

const API_URL = 'http://localhost:5001/api';

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