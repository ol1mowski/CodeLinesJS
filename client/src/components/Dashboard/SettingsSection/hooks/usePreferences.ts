import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../Auth/hooks/useAuth.hook';
import { useApi } from '../../../../api/hooks/useApi.hook';
import type { PreferencesData } from '../types/settings';
import { toast } from 'react-hot-toast';

export class PreferencesError extends Error {
  constructor(
    public code: string,
    message: string
  ) {
    super(message);
    this.name = 'PreferencesError';
  }
}

export const usePreferences = () => {
  const { isAuthenticated, isAuthChecking } = useAuth();
  const api = useApi<PreferencesData>();
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery<PreferencesData, Error>({
    queryKey: ['preferences'],
    queryFn: async () => {
      const response = await api.get('settings/preferences');
      if (response.error) {
        throw new PreferencesError('API_ERROR', response.error);
      }
      if (!response.data) {
        throw new PreferencesError('NO_DATA', 'Brak danych z serwera');
      }
      return response.data;
    },
    enabled: isAuthenticated && !isAuthChecking,
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, error) => {
      if (error instanceof PreferencesError && error.code === 'AUTH_ERROR') {
        return false;
      }
      return failureCount < 2;
    },
  });

  const updatePreferences = useMutation({
    mutationFn: async (preferences: PreferencesData) => {
      const response = await api.put('settings/preferences', preferences);
      if (response.error) {
        throw new PreferencesError('UPDATE_ERROR', response.error);
      }
      if (!response.data) {
        throw new PreferencesError('NO_DATA', 'Brak danych z serwera');
      }
      return response.data;
    },
    onSuccess: (newPreferences) => {
      queryClient.setQueryData(['preferences'], newPreferences);
      toast.success('Preferencje zostały zaktualizowane');
    },
    onError: (error) => {
      if (error instanceof PreferencesError) {
        toast.error(error.message);
      } else {
        toast.error('Wystąpił błąd podczas aktualizacji preferencji');
      }
    },
  });

  return {
    preferences: data,
    isLoading: isLoading || isAuthChecking,
    error,
    refetch,
    updatePreferences,
  };
}; 