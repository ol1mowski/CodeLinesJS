import { API_URL } from '../../../../config/api.config';

export class SecurityError extends Error {
  constructor(
    public code: string,
    message: string
  ) {
    super(message);
    this.name = 'SecurityError';
  }
}

export const updatePassword = async (
  data: {
    currentPassword: string;
    newPassword: string;
  },
): Promise<void> => {
  const response = await fetch(`${API_URL}settings/security/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
      
    const errorMessage = errorData.message || 'Wystąpił błąd podczas zmiany hasła';
    const errorCode = errorData.code || 'UNKNOWN_ERROR';
    
    throw new SecurityError(errorCode, errorMessage);
  }
};
