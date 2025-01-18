import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPreferences, updatePreferences } from '../utils/api/preferences';

export const PREFERENCES_QUERY_KEY = ['preferences'];

export const usePreferences = () => {
  const queryClient = useQueryClient();

  const { data: preferences, isLoading } = useQuery({
    queryKey: PREFERENCES_QUERY_KEY,
    queryFn: fetchPreferences,
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: updatePreferences,
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