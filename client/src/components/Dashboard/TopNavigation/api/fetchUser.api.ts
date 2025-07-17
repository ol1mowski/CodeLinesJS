import { API_URL } from '../../../../config/api.config';

export const fetchUser = async () => {
  const response = await fetch(`${API_URL}users/profile`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Nie udało się pobrać danych użytkownika');
  }
  return response.json();
};
