import { httpClient } from "../../../../api/httpClient.api";



export const fetchActiveUsers = async () => {
  try {
    
    const response = await httpClient.get(`users/active`);

    if (response.error) {
      throw new Error(response.error);
    }

    if (!response.data) {
      throw new Error('Brak danych z serwera');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
