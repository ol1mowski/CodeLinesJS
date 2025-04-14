import { Group } from "../../types/groups.types";
import { API_URL } from "../../../../../config/api.config";

export const groupsApi = {
  fetchGroup: async (groupId: string, token: string): Promise<Group> => {
    console.log(`[API] Pobieranie grupy o ID: ${groupId}`);
    
    try {
      const response = await fetch(`${API_URL}groups/${groupId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[API] Błąd HTTP ${response.status}: ${errorText}`);
        throw new Error(`Nie udało się pobrać grupy (${response.status})`);
      }

      const responseData = await response.json();

      const groupData = responseData.data?.group || {};
      
      const group: Group = {
        _id: groupData._id || groupId,
        name: groupData.name || 'Nieznana grupa',
        description: groupData.description || '',
        tags: Array.isArray(groupData.tags) ? groupData.tags : [],
        lastActive: groupData.lastActive || new Date().toISOString(),
        members: Array.isArray(groupData.members) ? groupData.members : [],
        membersCount: groupData.membersCount || (Array.isArray(groupData.members) ? groupData.members.length : 0),
        postsCount: groupData.postsCount || 0,
        isJoined: groupData.isMember || false,
        userRole: groupData.role || 'member',
        isAdmin: groupData.role === 'admin' || groupData.isOwner === true,
        createdAt: groupData.createdAt || new Date().toISOString()
      };
      
      return group;
    } catch (error) {
      console.error('[API] Błąd podczas pobierania grupy:', error);
      throw error;
    }
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

