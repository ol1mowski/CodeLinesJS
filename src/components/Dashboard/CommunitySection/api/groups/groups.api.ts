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

export const updateGroupName = async (groupId: string, title: string) => {
  const token = sessionStorage.getItem("token") || localStorage.getItem("token");
  const response = await fetch(`${API_URL}/groups/${groupId}/name`, {
    method: "PUT",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: title })
  });

  if (!response.ok) {
    throw new Error('Nie udało się zaktualizować nazwy grupy');
  }
};
