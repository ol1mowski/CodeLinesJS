import { httpClient } from "../../../../api/httpClient.api";


import { User } from '../../../Auth/types/auth.types';

export const updateUserPoints = async (points: number): Promise<User> => {
  try {
    
    const response = await httpClient.put(`progress/points`, { points });

    if (response.error) {
      throw new Error(response.error);
    }

    if (!response.data) {
      throw new Error('Brak danych z serwera');
    }

    return response.data;
  } catch (error) {
    console.error('Błąd podczas aktualizacji punktów:', error);
    throw error;
  }
};
