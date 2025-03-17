import { API_URL } from "../../../../config/api.config";
import { FormData } from "../hooks/useReportForm.hook";

export const reportBug = async (token: string, data: FormData) => {
  const response = await fetch(`${API_URL}report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    throw new Error('Nie udało się wysłać zgłoszenia');
  }
  
  return response.json();
}; 