import { API_URL } from '../../../../config/api.config';
import { FormData } from '../hooks/useReportForm.hook';

export const reportBug = async (data: FormData) => {
  const response = await fetch(`${API_URL}reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Nie udało się wysłać zgłoszenia');
  }

  return response.json();
};
