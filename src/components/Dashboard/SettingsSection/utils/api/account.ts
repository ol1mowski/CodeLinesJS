const API_URL = 'http://localhost:5001';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
});

export const deleteAccount = async (data: {
  password: string;
  confirmation: string;
}): Promise<void> => {
  const response = await fetch(`${API_URL}/api/account`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to delete account');
  }
}; 