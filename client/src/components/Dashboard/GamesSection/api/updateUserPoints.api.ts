import { API_URL } from '../../../../config/api.config';

export const updateUserPoints = async (points: number) => {
  const response = await fetch(`${API_URL}progress/points`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ points }),
  });
  if (!response.ok) {
    throw new Error('Nie udało się zaktualizować punktów');
  }
  return response.json();
};
