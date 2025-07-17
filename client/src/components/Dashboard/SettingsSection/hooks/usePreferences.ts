import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPreferences, updatePreferences, PreferencesError } from '../api/preferences';
import type { PreferencesData } from '../types/settings';
import { useAuth } from '../../../../hooks/useAuth';
import { toast } from 'react-hot-toast';

export const PREFERENCES_QUERY_KEY = ['preferences'];

export const usePreferences = () => {
  const { isAuthenticated, isAuthChecking } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: PREFERENCES_QUERY_KEY,
    queryFn: () => fetchPreferences(),
    enabled: isAuthenticated && !isAuthChecking,
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, error) => {
      if (error instanceof PreferencesError && error.code === 'AUTH_ERROR') {
        toast.error('Sesja wygasła. Zaloguj się ponownie.');
        return false;
      }
      return failureCount < 3; 
    },
  });

  const isLoading = query.isLoading || isAuthChecking;
  
  if (query.error && !(query.error instanceof PreferencesError && query.error.code === 'AUTH_ERROR')) {
    toast.error(query.error instanceof Error ? query.error.message : 'Wystąpił błąd podczas ładowania preferencji');
  }

  const updatePreferencesMutation = useMutation({
    mutationFn: (data: PreferencesData) => updatePreferences(data),
    onSuccess: (newPreferences) => {
      queryClient.setQueryData(PREFERENCES_QUERY_KEY, newPreferences);
      queryClient.invalidateQueries({ queryKey: PREFERENCES_QUERY_KEY });
      toast.success('Preferencje zostały zaktualizowane');
    },
    onError: (error) => {

      if (error instanceof PreferencesError && error.code === 'AUTH_ERROR') {
        toast.error('Sesja wygasła. Zaloguj się ponownie.');
        return;
      }
      
      toast.error(
        error instanceof Error ? error.message : 'Wystąpił błąd podczas aktualizacji preferencji'
      );
    },
  });

  return {
    preferences: query.data,
    isLoading,
    error: query.error,
    updatePreferences: updatePreferencesMutation,
    refetch: query.refetch
  };
};
