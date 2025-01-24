const API_URL = 'http://localhost:5001/api';

export const fetchResources = async () => {
  const response = await fetch(`${API_URL}/resources`);
  if (!response.ok) {
    throw new Error('Failed to fetch resources');
  }
  return response.json();
}; 