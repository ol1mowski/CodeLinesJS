import { API_URL } from '../../../../config/api.config';

export const fetchGames = async () => {
  const response = await fetch(`${API_URL}games`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Nie udało się pobrać gier');
  }
  return response.json();
};
