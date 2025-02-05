import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPreferences, updatePreferences } from '../utils/api/preferences';
import type { PreferencesData } from '../types/settings';

export const PREFERENCES_QUERY_KEY = ['preferences'];

export const usePreferences = () => {
  const queryClient = useQueryClient();

  const { data: preferences, isLoading } = useQuery<PreferencesData>({
    queryKey: PREFERENCES_QUERY_KEY,
    queryFn: fetchPreferences,
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: (data: PreferencesData) => updatePreferences(data),
    onSuccess: (newPreferences) => {
      queryClient.setQueryData(PREFERENCES_QUERY_KEY, newPreferences);
    },
  });

  return {
    preferences,
    isLoading,
    updatePreferences: updatePreferencesMutation,
  };
}; 