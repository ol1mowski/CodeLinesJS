import { API_URL } from '../../../../config/api.config';

export const fetchGames = async (token: string) => {
  const response = await fetch(`${API_URL}games`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Nie udało się pobrać gier');
  }
  return response.json();
};
