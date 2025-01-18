const API_URL = 'http://localhost:5001';

export const fetchPreferences = async () => {
  const response = await fetch(`${API_URL}/preferences`);
  
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
  const response = await fetch(`${API_URL}/preferences`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(preferences),
  });

  if (!response.ok) {
    throw new Error('Failed to update preferences');
  }

  return response.json();
}; 