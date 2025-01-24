const API_URL = 'http://localhost:5001/api';

export const fetchLessons = async () => {
  const response = await fetch(`${API_URL}/lessons`);
  if (!response.ok) {
    throw new Error('Failed to fetch lessons');
  }
  return response.json();
}; 