import { httpClient } from "../../../../api/httpClient.api";
import type { UserProfile } from '../types/settings';

export const fetchUserProfile = async (): Promise<UserProfile> => {
  
  const response = await httpClient.get(`settings/profile`);

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

  
  const response = await httpClient.put(`settings/profile`, apiData);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};
