const API_URL = 'http://localhost:5001/api';

const token = localStorage.getItem('token') || sessionStorage.getItem('token');

export const fetchLearningPaths = async () => {
  const response = await fetch(`${API_URL}/learning-paths`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch learning paths');
  }
  const data = await response.json();
  console.log(data);
  return data;
};

export const fetchLearningPathProgress = async (userId: string, pathId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}/paths/${pathId}/progress`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch path progress');
  }
  return response.json();
}; 