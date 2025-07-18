import type { UserProfile } from '../types/settings';
import { API_URL } from '../../../../config/api.config';
import { useApi } from '../../../../api/hooks/useApi.hook';

export const fetchUserProfile = async (): Promise<UserProfile> => {
  const api = useApi<any>();
  const response = await api.get(`${API_URL}settings/profile`);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  const data = response.data;
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

  const api = useApi<any>();
  const response = await api.put(`${API_URL}settings/profile`, apiData);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};
