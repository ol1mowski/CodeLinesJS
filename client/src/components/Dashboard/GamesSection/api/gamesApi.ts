import { GamesResponse } from '../types/games.types';

export const fetchGames = async (): Promise<GamesResponse> => {
  try {
    const response = await fetch('/api/games');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Błąd podczas pobierania gier:', error);
    throw error;
  }
}; 