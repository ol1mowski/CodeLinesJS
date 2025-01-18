const API_URL = 'http://localhost:5001';

export const deleteAccount = async (data: {
  password: string;
  confirmation: string;
}): Promise<void> => {
  const response = await fetch(`${API_URL}/account`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to delete account');
  }
}; 