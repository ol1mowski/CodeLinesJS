const API_URL = 'http://localhost:5001';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
});

export const updatePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> => {
  const response = await fetch(`${API_URL}/api/security/password`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update password');
  }
}; 