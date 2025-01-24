const API_URL = 'http://localhost:5001/api';

export const fetchLearningPaths = async () => {
  const response = await fetch(`${API_URL}/learning-paths`);
  if (!response.ok) {
    throw new Error('Failed to fetch learning paths');
  }
  return response.json();
};

export const fetchLearningPathProgress = async (userId: string, pathId: string) => {
  const response = await fetch(`${API_URL}/users/${userId}/paths/${pathId}/progress`);
  if (!response.ok) {
    throw new Error('Failed to fetch path progress');
  }
  return response.json();
}; 