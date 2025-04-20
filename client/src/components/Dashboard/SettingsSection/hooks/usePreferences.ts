import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPreferences, updatePreferences, PreferencesError } from '../api/preferences';
import type { PreferencesData } from '../types/settings';
import { useAuth } from '../../../../hooks/useAuth';
import { toast } from 'react-hot-toast';

export const PREFERENCES_QUERY_KEY = ['preferences'];

export const usePreferences = () => {
  const { token, logout } = useAuth();
  const queryClient = useQueryClient();

  const { 
    data: preferences, 
    isLoading,
    error,
    refetch 
  } = useQuery({
    queryKey: PREFERENCES_QUERY_KEY,
    queryFn: () => fetchPreferences(token || ''),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, error) => {
      if (error instanceof PreferencesError && error.code === 'AUTH_ERROR') {
        toast.error('Sesja wygasła. Zaloguj się ponownie.');
        logout?.();
        return false;
      }
      return failureCount < 3; 
    },
  });
  
  if (error && !(error instanceof PreferencesError && error.code === 'AUTH_ERROR')) {
    toast.error(error instanceof Error ? error.message : 'Wystąpił błąd podczas ładowania preferencji');
  }

  const updatePreferencesMutation = useMutation({
    mutationFn: (data: PreferencesData) => updatePreferences(data, token || ''),
    onSuccess: (newPreferences) => {
      queryClient.setQueryData(PREFERENCES_QUERY_KEY, newPreferences);
      queryClient.invalidateQueries({ queryKey: PREFERENCES_QUERY_KEY });
      toast.success('Preferencje zostały zaktualizowane');
    },
    onError: (error) => {
      if (error instanceof PreferencesError && error.code === 'AUTH_ERROR') {
        toast.error('Sesja wygasła. Zaloguj się ponownie.');
        logout?.();
        return;
      }
      
      toast.error(
        error instanceof Error ? error.message : 'Wystąpił błąd podczas aktualizacji preferencji'
      );
    },
  });

  return {
    preferences,
    isLoading,
    error,
    updatePreferences: updatePreferencesMutation,
    refetch
  };
};
