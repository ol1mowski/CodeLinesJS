import { Message } from "react-hook-form";
import { Group } from "../../../../types/groups.types";

const getToken = () => {
  return sessionStorage.getItem('token') || localStorage.getItem('token');
};


export const checkGroupNameAvailability = async (name: string): Promise<boolean> => {
  try {

    const token = getToken();

    const response = await fetch(`http://localhost:5001/api/groups/check-name`, {
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
}) => {
  try {
    const token = getToken();
    const response = await fetch(`http://localhost:5001/api/groups`, {
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

export const fetchGroups = async (): Promise<Group[]> => {
  const response = await fetch('http://localhost:5001/api/groups');
  if (!response.ok) {
    throw new Error('Failed to fetch groups');
  }
  return response.json();
};

export const joinGroup = async (groupId: string): Promise<void> => {
  const token = getToken();
  
  const response = await fetch(`http://localhost:5001/api/groups/${groupId}/join`, {
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
    throw new Error('Nie udało się dołączyć do grupy');
  }
};

export const fetchGroupMessages = async (groupId: string): Promise<Message[]> => {
  const token = getToken();
  const response = await fetch(`http://localhost:5001/api/groups/${groupId}/messages`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Nie udało się pobrać wiadomości');
  }
  
  return response.json();
};

export const sendGroupMessage = async (groupId: string, content: string): Promise<Message> => {
  const token = getToken();
  const response = await fetch(`http://localhost:5001/api/groups/${groupId}/messages`, {
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