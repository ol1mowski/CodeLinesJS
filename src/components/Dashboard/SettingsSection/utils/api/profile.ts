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
  
  if (data.avatarUrl && !data.avatarUrl.startsWith('http')) {
    data.avatarUrl = `${API_URL}${data.avatarUrl.startsWith('/') ? '' : '/'}${data.avatarUrl}`;
  }
  
  return data;
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
  try {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await fetch(`${API_URL}/api/settings/profile/avatar`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`,
      },
      body: formData,
    });

    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      throw new Error('Invalid response format from server');
    }

    if (!response.ok) {
      throw new Error(data.message || `Server error: ${response.status}`);
    }

    const avatarUrl = data.avatarUrl || data.url || data.avatar || data.path;
    
    if (!avatarUrl) {
      console.error('Server response:', data);
      throw new Error('No avatar URL in response');
    }

    const fullAvatarUrl = avatarUrl.startsWith('http') 
      ? avatarUrl 
      : `${API_URL}${avatarUrl.startsWith('/') ? '' : '/'}${avatarUrl}`;

    return { avatarUrl: fullAvatarUrl };
  } catch (error) {
    console.error('Avatar update error:', error);
    throw error;
  }
};
