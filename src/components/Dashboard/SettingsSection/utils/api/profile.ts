import type { UserProfile } from '../../types/settings';

const API_URL = 'http://localhost:5001';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`,
  'Content-Type': 'application/json',
});

export const fetchUserProfile = async (): Promise<UserProfile> => {
  const response = await fetch(`${API_URL}/api/settings/profile`, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }
  
  return response.json();
};

export const updateUserProfile = async (profile: UserProfile): Promise<UserProfile> => {
  const response = await fetch(`${API_URL}/api/settings/profile`, {
    method: 'PUT',
    headers: getAuthHeaders(),
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
  
  const response = await fetch(`${API_URL}/api/settings/profile/avatar`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to update avatar');
  }

  return response.json();
}; 