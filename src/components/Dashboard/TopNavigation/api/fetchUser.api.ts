import { API_URL } from "../../../../config/api.config";

export const fetchUser = async (token: string | null) => {
  const response = await fetch(`${API_URL}users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Nie udało się pobrać danych użytkownika');
  }
  return response.json();
};