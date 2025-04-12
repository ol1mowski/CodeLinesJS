import { API_URL } from "../../config/api.config";

export interface GroupApiResponse {
  status: string;
  data: {
    groups: Array<{
      _id: string;
      name: string;
      description?: string;
      members?: any[];
      isMember?: boolean;
      tags?: string[];
      updatedAt?: Date | string;
      [key: string]: any;
    }>;
    total: number;
    page?: number;
    limit?: number;
    hasNextPage?: boolean;
  };
}

const getToken = () => {
  return sessionStorage.getItem('token') || localStorage.getItem('token');
};

export const groupsApi = {
  getGroups: async (): Promise<GroupApiResponse> => {
    const token = getToken();
    const response = await fetch(`${API_URL}groups`, {
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
    const token = getToken();
    const response = await fetch(`${API_URL}groups/${groupId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Błąd podczas dołączania do grupy');
    }
  },

  leaveGroup: async (groupId: string): Promise<void> => {
    const token = getToken();
    const response = await fetch(`${API_URL}groups/${groupId}/leave`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Błąd podczas opuszczania grupy');
    }
  }
}; 