import { httpClient } from "../../../../api/httpClient.api";
import { GamesResponse } from '../types/games.types';



export const fetchGames = async (): Promise<GamesResponse> => {
  try {
    
    const response = await httpClient.get(`games`);
    if (response.error) {
      throw new Error(response.error);
    }
    if (!response.data) {
      throw new Error('Brak danych z serwera');
    }
    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania gier:', error);
    throw error;
  }
};
