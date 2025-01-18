import type { UserProfile } from '../../types/settings';

const API_URL = 'http://localhost:5001';

export const fetchUserProfile = async (): Promise<UserProfile> => {
  const response = await fetch(`${API_URL}/profile`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  
  return response.json();
};

export const updateUserProfile = async (profile: UserProfile): Promise<UserProfile> => {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }

  return response.json();
};

export const updateUserAvatar = async (file: File): Promise<{ avatarUrl: string }> => {
  const formData = new FormData();
  formData.append('avatar', file);
  
  const response = await fetch(`${API_URL}/profile/avatar`, {
    method: 'PUT',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to update avatar');
  }

  return response.json();
}; 