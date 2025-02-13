import { Message, MessagesResponse } from "../../../../types/messages.types";

const BASE_URL = 'http://localhost:5001';

const getToken = () => {
  return sessionStorage.getItem('token') || localStorage.getItem('token');
};

export const fetchGroupMessages = async (
  groupId: string, 
  page: number = 1, 
  limit: number = 50
): Promise<MessagesResponse> => {
  const token = getToken();
  const response = await fetch(
    `${BASE_URL}/api/groups/${groupId}/messages?page=${page}&limit=${limit}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error('Nie udało się pobrać wiadomości');
  }

  return response.json();
};

export const sendGroupMessage = async (
  groupId: string, 
  content: string
): Promise<{ status: string; data: { message: Message } }> => {
  const token = getToken();
  const response = await fetch(`${BASE_URL}/api/groups/${groupId}/messages`, {
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

export const editGroupMessage = async (
  groupId: string,
  messageId: string,
  content: string
): Promise<{ status: string; data: { message: Message } }> => {
  const token = getToken();
  const response = await fetch(
    `${BASE_URL}/api/groups/${groupId}/messages/${messageId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    }
  );

  if (!response.ok) {
    throw new Error('Nie udało się edytować wiadomości');
  }

  return response.json();
};

export const deleteGroupMessage = async (
  groupId: string,
  messageId: string
): Promise<{ status: string; message: string }> => {
  const token = getToken();
  const response = await fetch(
    `${BASE_URL}/api/groups/${groupId}/messages/${messageId}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error('Nie udało się usunąć wiadomości');
  }

  return response.json();
}; 