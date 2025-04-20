import type { UserProfile } from '../types/settings';
import { API_URL } from '../../../../config/api.config';

const getAuthHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

export const fetchUserProfile = async (token: string): Promise<UserProfile> => {
  const response = await fetch(`${API_URL}settings/profile`, {
    headers: getAuthHeaders(token),
  });

  if (!response.ok) {
    throw new Error('Błąd podczas pobierania profilu');
  }

  const responseData = await response.json();
  // Użyj struktura danych z odpowiedzi serwera (data.user)
  const data = responseData.data || responseData;
  const user = data.user || data;
  
  return {
    username: user.username || '',
    email: user.email || '',
    profile: {
      bio: user.bio || data.profile?.bio || '',
    },
  };
};

export const updateUserProfile = async (data: UserProfile, token: string) => {
  // Dostosowujemy format danych, aby pasował do wymagań API
  const apiData = {
    username: data.username,
    email: data.email,
    bio: data.profile?.bio || ''
  };

  const response = await fetch(`${API_URL}settings/profile`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: JSON.stringify(apiData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Błąd podczas aktualizacji profilu');
  }

  return response.json();
};
