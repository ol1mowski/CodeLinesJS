import { API_URL } from '../../../../../config/api.config';

export const fetchResources = async (token: string) => {
  if (!token) {
    throw new Error('Brak tokenu autoryzacji');
  }

  const response = await fetch(`${API_URL}resources`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Nieautoryzowany - proszę się zalogować ponownie');
    }
    throw new Error('Błąd podczas pobierania zasobów');
  }

  const data = await response.json();
  return data;
};
