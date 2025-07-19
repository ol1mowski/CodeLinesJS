import { httpClient } from "../../../../api/httpClient.api";

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
  
  const response = await httpClient.request(`settings/account`, { method: 'DELETE', body: data });

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};
