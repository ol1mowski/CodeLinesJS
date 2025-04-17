import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPreferences, updatePreferences } from '../api/preferences';
import type { PreferencesData } from '../types/settings';
import { useAuth } from '../../../../hooks/useAuth';

export const PREFERENCES_QUERY_KEY = ['preferences'];

export const usePreferences = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const { data: preferences, isLoading } = useQuery({
    queryKey: ['preferences'],
    queryFn: () => fetchPreferences(token || ''),
    enabled: !!token,
  });

  const updatePreferencesMutation = useMutation({
    mutationFn: (data: PreferencesData) => updatePreferences(data, token || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['preferences'] });
    },
  });

  return {
    preferences,
    isLoading,
    updatePreferences: updatePreferencesMutation,
  };
};
