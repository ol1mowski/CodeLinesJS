import { Group } from '../../types/groups.types';

const BASE_URL = 'http://localhost:5001';

const getToken = () => {
  return sessionStorage.getItem('token') || localStorage.getItem('token');
};

const token = getToken();


export const groupsApi = {
  getGroups: async (): Promise<Group[]> => {
    const response = await fetch(`${BASE_URL}/api/groups`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Błąd podczas pobierania grup');
    }
    return response.json();
  },

  
  joinGroup: async (groupId: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/api/groups/${groupId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Błąd podczas dołączania do grupy');
    }
  }
}; 