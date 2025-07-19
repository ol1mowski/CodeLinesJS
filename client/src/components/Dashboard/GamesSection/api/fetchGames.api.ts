import { httpClient } from "../../../../api/httpClient.api";

export const fetchGames = async () => {
  
  const response = await httpClient.get(`games`);
  if (response.error) {
    throw new Error(response.error);
  }
  if (!response.data) {
    throw new Error('Brak danych z serwera');
  }
  return response.data;
};
