import type { UserProfile } from '../types/settings';
import { API_URL } from '../../../../config/api.config';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
});

export const fetchUserProfile = async (): Promise<UserProfile> => {
  const response = await fetch(`${API_URL}settings/profile`, {
    headers: getAuthHeaders(),
    credentials: 'include', 
  });

  if (!response.ok) {
    throw new Error('Błąd podczas pobierania profilu');
  }

  const responseData = await response.json();
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

export const updateUserProfile = async (data: UserProfile) => {
  const apiData = {
    username: data.username,
    email: data.email,
    bio: data.profile?.bio || ''
  };

  const response = await fetch(`${API_URL}settings/profile`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    credentials: 'include',
    body: JSON.stringify(apiData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Błąd podczas aktualizacji profilu');
  }

  return response.json();
};
