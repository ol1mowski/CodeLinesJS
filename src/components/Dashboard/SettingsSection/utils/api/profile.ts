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
    const error = await response.json().catch(() => ({ message: 'Failed to fetch profile' }));
    throw new Error(error.message);
  }
  
  const data = await response.json();
  
  return {
    username: data.username,
    email: data.email,
    profile: {
      bio: data.profile?.bio || '',
      avatar: data.profile?.avatar || ''
    }
  };
};

export const updateUserProfile = async (data: UserProfile) => {
  console.log(data);
  
  const response = await fetch(`${API_URL}/api/settings/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }

  return response.json();
};

export const updateUserAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await fetch(`${API_URL}/api/settings/avatar`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to update avatar');
  }

  return response.json();
};
