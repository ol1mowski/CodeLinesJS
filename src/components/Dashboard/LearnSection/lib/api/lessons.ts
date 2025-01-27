const API_URL = 'http://localhost:5001/api';

const token = localStorage.getItem('token') || sessionStorage.getItem('token');

export const fetchLessons = async () => {   
  const response = await fetch(`${API_URL}/lessons`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch lessons');
  }
  return response.json();
}; 