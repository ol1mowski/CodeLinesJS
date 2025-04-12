import { Message } from "react-hook-form";
import { API_URL } from "../../../../config/api.config";

const isValidMongoId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export interface GroupApiResponse {
  status: string;
  data: {
    groups: Array<{
      _id: string;
      name: string;
      description: string;
      membersCount: number;
      postsCount: number;
      isJoined?: boolean;
      lastActive?: string;
      tags?: string[];
      [key: string]: any;
    }>;
    hasNextPage: boolean;
    limit: number;
    page: number;
    total: number;
  };
}

export const checkGroupNameAvailability = async (name: string, token: string): Promise<boolean> => {
  try {

    const response = await fetch(`${API_URL}groups/check-name`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    });

    if (!response.ok) {
      if (response.status === 409) {
        return false;
      }
      throw new Error("Nie udało się sprawdzić dostępności nazwy");
    }

    return true;
  } catch (error) {
    console.error("Błąd podczas sprawdzania nazwy:", error);
    throw new Error("Nie udało się sprawdzić dostępności nazwy");
  }
};

export const createGroup = async (groupData: {
  name: string;
  description: string;
  tags: string[];
}, token: string) => {
  try {
    const response = await fetch(`${API_URL}groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(groupData)
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Sesja wygasła. Zaloguj się ponownie.");
      }
      throw new Error("Nie udało się utworzyć grupy");
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Wystąpił nieoczekiwany błąd");
  }
};

export const fetchGroups = async (token: string): Promise<GroupApiResponse> => {
  const response = await fetch(`${API_URL}groups`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Błąd podczas pobierania grup');
  }
  const data = await response.json();
  return data;
};

export const joinGroup = async (groupId: string, token: string): Promise<void> => {
  
  console.log('Próba dołączenia do grupy o ID:', groupId);
  
  // Sprawdź, czy ID jest poprawnym MongoDB ObjectId
  if (!isValidMongoId(groupId)) {
    console.error('Nieprawidłowy format ID MongoDB:', groupId);
    throw new Error('Nieprawidłowy format ID grupy');
  }
  
  const response = await fetch(`${API_URL}groups/${groupId}/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Sesja wygasła. Zaloguj się ponownie.');
    }
    const errorData = await response.json();
    console.error('Błąd dołączania do grupy:', errorData);
    throw new Error(`Nie udało się dołączyć do grupy: ${errorData.message || 'Nieznany błąd'}`);
  }
};

export const fetchGroupMessages = async (groupId: string, token: string): Promise<Message[]> => {
  const response = await fetch(`${API_URL}groups/${groupId}/messages`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Nie udało się pobrać wiadomości');
  }
  
  return response.json();
};

export const sendGroupMessage = async (groupId: string, content: string, token: string): Promise<Message> => {
  const response = await fetch(`${API_URL}groups/${groupId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ content })
  });
  
  if (!response.ok) {
    throw new Error('Nie udało się wysłać wiadomości');
  }
  
  return response.json();
};