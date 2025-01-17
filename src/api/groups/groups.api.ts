import { Group } from '../../types/groups.types';

const BASE_URL = 'http://localhost:3000';

export const groupsApi = {
  getGroups: async (): Promise<Group[]> => {
    const response = await fetch(`${BASE_URL}/groups`);
    if (!response.ok) {
      throw new Error('Failed to fetch groups');
    }
    return response.json();
  },
  
  joinGroup: async (groupId: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/groups/${groupId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Failed to join group');
    }
  }
}; 