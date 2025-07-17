import { API_URL } from '../../../../config/api.config';

export const fetchActiveUsers = async () => {
  try {
    const response = await fetch(`${API_URL}users/active`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Błąd podczas pobierania aktywnych użytkowników');
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    throw error;
  }
};
