import { API_URL } from '../../../../config/api.config';

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
  const response = await fetch(`${API_URL}settings/account`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    if (error.code === 'INVALID_PASSWORD') {
      throw new AccountError('INVALID_PASSWORD', 'Podane hasło jest nieprawidłowe');
    }
    if (error.code === 'INVALID_CONFIRMATION') {
      throw new AccountError('INVALID_CONFIRMATION', 'Nieprawidłowe potwierdzenie');
    }
    throw new AccountError('UNKNOWN_ERROR', 'Wystąpił błąd podczas usuwania konta');
  }
};
