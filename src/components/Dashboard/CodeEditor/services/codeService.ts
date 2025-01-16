import { SavedCode, SaveCodeDto } from '../types/api.types';

const API_URL = 'http://localhost:5001/api';

export const codeService = {
  async saveCode(data: SaveCodeDto): Promise<SavedCode> {
    const response = await fetch(`${API_URL}/code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Nie udało się zapisać kodu');
    }

    return response.json();
  },

  async getUserCodes(): Promise<SavedCode[]> {
    const response = await fetch(`${API_URL}/code`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Nie udało się pobrać kodów');
    }

    return response.json();
  }
}; 