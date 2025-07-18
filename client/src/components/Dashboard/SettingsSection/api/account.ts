import { API_URL } from '../../../../config/api.config';
import { useApi } from '../../../../api/hooks/useApi.hook';

export class AccountError extends Error {
  constructor(
    public code: 'INVALID_PASSWORD' | 'INVALID_CONFIRMATION' | 'UNKNOWN_ERROR',
    message: string
  ) {
    super(message);
    this.name = 'AccountError';
  }
}

export const deleteAccount = async (
  data: {
    password: string;
    confirmation: string;
  },
): Promise<void> => {
  const api = useApi<any>();
  const response = await api.delete(`${API_URL}settings/account`, {
    body: data,
  });

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};
