import { API_URL } from "../../../../../config/api.config";

export const fetchLearningPaths = async (token: string) => {
  
  if (!token) {
    throw new Error('Brak tokenu autoryzacji');
  }

  const response = await fetch(`${API_URL}Learning-paths`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Nieautoryzowany - proszę się zalogować ponownie');
    }
    throw new Error('Błąd podczas pobierania ścieżek nauki');
  }
  
  const data = await response.json();
  return data;
};

export const fetchLearningPathProgress = async (userId: string, pathId: string, token: string) => {

  if (!token) {
    throw new Error('Brak tokenu autoryzacji');
  }

  const response = await fetch(`${API_URL}users/${userId}/paths/${pathId}/progress`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Błąd podczas pobierania postępu ścieżki');
  }
  return response.json();
}; 