const API_URL = 'http://localhost:5001';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
});

export const fetchPreferences = async () => {
  const response = await fetch(`${API_URL}/api/settings/preferences`, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch preferences');
  }
  
  return response.json();
};

export const updatePreferences = async (preferences: {
  emailNotifications: boolean;
  pushNotifications: boolean;
  language: "pl";
}) => {
  const response = await fetch(`${API_URL}/api/settings/preferences`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(preferences),
  });

  if (!response.ok) {
    throw new Error('Failed to update preferences');
  }

  return response.json();
}; 