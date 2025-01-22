const API_URL = 'http://localhost:5001';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`,
  'Content-Type': 'application/json',
});

export class SecurityError extends Error {
  constructor(public code: 'INVALID_CURRENT_PASSWORD' | 'UNKNOWN_ERROR', message: string) {
    super(message);
    this.name = 'SecurityError';
  }
}

export const updatePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> => {
  const response = await fetch(`${API_URL}/api/settings/security/password`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    if (error.code === 'INVALID_CURRENT_PASSWORD') {
      throw new SecurityError('INVALID_CURRENT_PASSWORD', 'Aktualne hasło jest nieprawidłowe');
    }
    throw new SecurityError('UNKNOWN_ERROR', 'Wystąpił błąd podczas zmiany hasła');
  }
}; 