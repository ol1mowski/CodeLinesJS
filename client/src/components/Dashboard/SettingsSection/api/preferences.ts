import { PreferencesData } from '../types/settings';
import { API_URL } from '../../../../config/api.config';

export class PreferencesError extends Error {
  constructor(
    public code: 'VALIDATION_ERROR' | 'SAVE_ERROR' | 'UNKNOWN_ERROR' | 'AUTH_ERROR',
    message: string
  ) {
    super(message);
    this.name = 'PreferencesError';
  }
}

export const fetchPreferences = async (token: string): Promise<PreferencesData> => {
  try {
    const response = await fetch(`${API_URL}settings/preferences`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new PreferencesError('AUTH_ERROR', 'Sesja wygasła. Zaloguj się ponownie.');
      }
      
      const errorData = await response.json().catch(() => null);
      throw new PreferencesError(
        'UNKNOWN_ERROR', 
        errorData?.message || 'Błąd podczas pobierania preferencji'
      );
    }

    const responseData = await response.json();
    const preferencesData = responseData.data || responseData;
    
    return {
      emailNotifications: preferencesData.emailNotifications ?? false,
      pushNotifications: preferencesData.pushNotifications ?? false,
      language: preferencesData.language || 'pl',
    };
  } catch (error) {
    if (error instanceof PreferencesError) {
      throw error;
    }
    
    console.error('Błąd w fetchPreferences:', error);
    throw new PreferencesError('UNKNOWN_ERROR', 'Wystąpił nieznany błąd podczas pobierania preferencji');
  }
};

export const updatePreferences = async (
  preferences: PreferencesData,
  token: string
): Promise<PreferencesData> => {
  try {
    const response = await fetch(`${API_URL}settings/preferences`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preferences),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new PreferencesError('AUTH_ERROR', 'Sesja wygasła. Zaloguj się ponownie.');
      }
      
      const errorData = await response.json().catch(() => ({ code: 'UNKNOWN_ERROR' }));
      
      if (errorData.code === 'VALIDATION_ERROR') {
        throw new PreferencesError('VALIDATION_ERROR', 'Nieprawidłowe dane preferencji');
      }
      if (errorData.code === 'SAVE_ERROR') {
        throw new PreferencesError('SAVE_ERROR', 'Nie udało się zapisać preferencji');
      }
      
      throw new PreferencesError(
        'UNKNOWN_ERROR', 
        errorData?.message || 'Wystąpił błąd podczas aktualizacji preferencji'
      );
    }

    const responseData = await response.json();
    const preferencesData = responseData.data || responseData;
    
    return {
      emailNotifications: preferencesData.emailNotifications ?? false,
      pushNotifications: preferencesData.pushNotifications ?? false,
      language: preferencesData.language || 'pl',
    };
  } catch (error) {
    if (error instanceof PreferencesError) {
      throw error;
    }
    
    console.error('Błąd w updatePreferences:', error);
    throw new PreferencesError('UNKNOWN_ERROR', 'Wystąpił nieznany błąd podczas aktualizacji preferencji');
  }
};
