import { GamesResponse } from '../types/games.types';
import { API_URL } from '../../../../config/api.config';
export const fetchGames = async (): Promise<GamesResponse> => {
  try {
    const response = await fetch(`${API_URL}games`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Błąd podczas pobierania gier:', error);
    throw error;
  }
};
