import { API_URL } from '../../../../config/api.config';
import { useApi } from '../../../../api/hooks/useApi.hook';

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
  const api = useApi<any>();
  const response = await api.put(`${API_URL}settings/security/password`, data);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};
