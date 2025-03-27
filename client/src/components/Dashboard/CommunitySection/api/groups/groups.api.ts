import { Group } from "../../types/groups.types";
import { API_URL } from "../../../../../config/api.config";

export const groupsApi = {
  fetchGroup: async (groupId: string, token: string): Promise<Group> => {
    const response = await fetch(`${API_URL}groups/${groupId}`, {
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

export const leaveGroup = async (groupId: string, token: string) => {
  const response = await fetch(`${API_URL}groups/${groupId}/leave`, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Nie udało się opuścić grupy');
  }
};

export const updateGroupName = async (groupId: string, title: string, token: string) => {
  const response = await fetch(`${API_URL}groups/${groupId}/name`, {
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


export const updateGroupTags = async (groupId: string, tags: string[], token: string) => {
  const response = await fetch(`${API_URL}groups/${groupId}/tags`, {
    method: "PUT",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ tags })
  });

  if (!response.ok) {
    throw new Error('Nie udało się zaktualizować tagów grupy');
  }
};

export const deleteGroup = async (groupId: string, token: string) => {
  const response = await fetch(`${API_URL}groups/${groupId}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Nie udało się usunąć grupy');
  }
};

  export const deleteMember = async (groupId: string, memberId: string, token: string) => {
  const response = await fetch(`${API_URL}groups/${groupId}/members/${memberId}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Nie udało się usunąć członka');
  }
};

