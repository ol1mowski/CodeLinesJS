import { Group } from "../../types/groups.types";

const API_URL = 'http://localhost:5001/api';

export const groupsApi = {
  fetchGroup: async (groupId: string): Promise<Group> => {
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");
    const response = await fetch(`${API_URL}/groups/${groupId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Nie udało się pobrać grupy');
    }
    
    const data = await response.json();
    return data;
  }
}; 