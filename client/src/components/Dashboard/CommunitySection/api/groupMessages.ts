import { Message, MessagesResponse } from "../../../../types/messages.types";
import toast from "react-hot-toast";
import { useAuth } from "../../../../Hooks/useAuth";
import { API_URL } from "../../../../config/api.config";
const handleNetworkError = (error: any) => {
  if (!navigator.onLine) {
    toast.error('Brak połączenia z internetem');
  } else if (error.message) {
    toast.error(error.message);
  } else {
    toast.error('Wystąpił nieoczekiwany błąd');
  }
  throw error;
};

export const fetchGroupMessages = async (
  groupId: string, 
  page: number = 1, 
  limit: number = 50
): Promise<MessagesResponse> => {
  const { token } = useAuth();
  const response = await fetch(
    `${API_URL}groups/${groupId}/messages?page=${page}&limit=${limit}`,
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
): Promise<{ status: string; data: { message: Message } } | undefined> => {
  try {
    const { token } = useAuth();
    const response = await fetch(`${API_URL}groups/${groupId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Nie udało się wysłać wiadomości');
    }

    return response.json();
  } catch (error) {
    handleNetworkError(error);
  }
};

export const editGroupMessage = async (
  groupId: string,
  messageId: string,
  content: string
): Promise<{ status: string; data: { message: Message } } | undefined> => {
  const { token } = useAuth();
  const response = await fetch(
    `${API_URL}groups/${groupId}/messages/${messageId}`,
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
): Promise<{ status: string; message: string } | undefined> => {
  const { token } = useAuth();
  const response = await fetch(
    `${API_URL}groups/${groupId}/messages/${messageId}`,
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

export const reportGroupMessage = async (
  groupId: string,
  messageId: string,
  reportData: {
    reason: string;
    description: string;
  }
): Promise<{ status: string; message: string } | undefined> => {
  try {
    const { token } = useAuth();
    const response = await fetch(
      `${API_URL}groups/${groupId}/messages/${messageId}/report`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reportData)
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Nie udało się zgłosić wiadomości');
    }

    return response.json();
  } catch (error) {
    handleNetworkError(error);
  }
};

export const addMessageReaction = async (
  groupId: string,
  messageId: string,
  reaction: string,
  action: 'add' | 'remove' = 'add'
): Promise<{ status: string; message: string } | undefined> => {
  try {
    const { token } = useAuth();
    const response = await fetch(
      `${API_URL}groups/${groupId}/messages/${messageId}/reactions`,
      {
        method: action === 'add' ? 'POST' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ reaction })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Nie udało się ${action === 'add' ? 'dodać' : 'usunąć'} reakcji`);
    }

    return response.json();
  } catch (error) {
    handleNetworkError(error);
  }
}; 