import { API_URL } from "../../../../config/api.config";

export const fetchActiveUsers = async (token: string) => {
  const response = await fetch(`${API_URL}users/active`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch active users');
  }

  return response.json();
};