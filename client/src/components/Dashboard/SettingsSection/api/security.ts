import { httpClient } from "../../../../api/httpClient.api";

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
  
  const response = await httpClient.put(`settings/security/password`, data);

  if (response.error) {
    throw new Error(response.error);
  }

  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }

  return response.data;
};
