import { httpClient } from "../../../../api/httpClient.api";

export const updateUserPoints = async (points: number) => {
  
  const response = await httpClient.put(`progress/points`, { points });
  if (response.error) {
    throw new Error(response.error);
  }
  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }
  return response.data;
};
