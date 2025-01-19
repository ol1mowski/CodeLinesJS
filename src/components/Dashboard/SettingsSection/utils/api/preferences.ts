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

export class PreferencesError extends Error {
  constructor(public code: 'VALIDATION_ERROR' | 'SAVE_ERROR' | 'UNKNOWN_ERROR', message: string) {
    super(message);
    this.name = 'PreferencesError';
  }
}

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
    const error = await response.json();
    if (error.code === 'VALIDATION_ERROR') {
      throw new PreferencesError('VALIDATION_ERROR', 'Nieprawidłowe dane preferencji');
    }
    if (error.code === 'SAVE_ERROR') {
      throw new PreferencesError('SAVE_ERROR', 'Nie udało się zapisać preferencji');
    }
    throw new PreferencesError('UNKNOWN_ERROR', 'Wystąpił błąd podczas aktualizacji preferencji');
  }

  return response.json();
}; 