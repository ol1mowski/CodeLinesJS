import { API_URL } from "../../../../config/api.config";

export class SecurityError extends Error {
  constructor(public code: 'INVALID_CURRENT_PASSWORD' | 'UNKNOWN_ERROR', message: string) {
    super(message);
    this.name = 'SecurityError';
  }
}

export const updatePassword = async (
  data: {
    currentPassword: string;
    newPassword: string;
  },
  token: string
): Promise<void> => {
  const response = await fetch(`${API_URL}settings/security/password`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
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