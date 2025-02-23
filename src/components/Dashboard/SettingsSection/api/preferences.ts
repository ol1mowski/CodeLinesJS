import { PreferencesData } from "../types/settings";
import { API_URL } from "../../../../config/api.config";

export class PreferencesError extends Error {
  constructor(public code: 'VALIDATION_ERROR' | 'SAVE_ERROR' | 'UNKNOWN_ERROR', message: string) {
    super(message);
    this.name = 'PreferencesError';
  }
}

export const fetchPreferences = async (token: string): Promise<PreferencesData> => {
  const response = await fetch(`${API_URL}settings/preferences`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch preferences');
  }
  
  const data = await response.json();
  return {
    emailNotifications: data.emailNotifications ?? false,
    pushNotifications: data.pushNotifications ?? false,
    language: "pl"
  };
};

export const updatePreferences = async (
  preferences: PreferencesData, 
  token: string
): Promise<PreferencesData> => {
  const response = await fetch(`${API_URL}settings/preferences`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
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

  const data = await response.json();
  return {
    emailNotifications: data.emailNotifications,
    pushNotifications: data.pushNotifications,
    language: "pl"
  };
}; 