import { httpClient } from "../../../../api/httpClient.api";
import { PreferencesData } from '../types/settings';

export class PreferencesError extends Error {
  constructor(
    public code: string,
    message: string
  ) {
    super(message);
    this.name = 'PreferencesError';
  }
}

export const fetchPreferences = async (): Promise<PreferencesData> => {
  try {
    const response = await httpClient.get(`settings/preferences`);

    if (response.error) {
      throw new PreferencesError('UNKNOWN_ERROR', response.error);
    }

    if (!response.data) {
      throw new Error('Brak danych z serwera');
    }

    const responseData = response.data;
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
): Promise<PreferencesData> => {
  try {
    const response = await httpClient.put(`settings/preferences`, preferences);

    if (response.error) {
      throw new PreferencesError('UNKNOWN_ERROR', response.error);
    }

    if (!response.data) {
      throw new Error('Brak danych z serwera');
    }

    const responseData = response.data;
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
