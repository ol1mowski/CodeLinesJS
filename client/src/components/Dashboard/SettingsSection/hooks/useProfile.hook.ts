import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../Auth/hooks/useAuth.hook';
import { useApi } from '../../../../api/hooks/useApi.hook';
import type { UserProfile } from '../types/settings';

export const PROFILE_QUERY_KEY = ['userProfile'];

export const useProfile = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated, isAuthChecking } = useAuth();
  const api = useApi<UserProfile>();

  const query = useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: async () => {
      const response = await api.get('settings/profile');
      if (response.error) {
        throw new Error(response.error);
      }
      if (!response.data) {
        throw new Error('Brak danych z serwera');
      }
      return response.data;
    },
    enabled: isAuthenticated && !isAuthChecking,
    staleTime: 1000 * 60 * 5,
  });

  const isLoading = query.isLoading || isAuthChecking;

  const updateProfile = useMutation({
    mutationFn: async (data: UserProfile) => {
      const response = await api.put('settings/profile', data);
      if (response.error) {
        throw new Error(response.error);
      }
      if (!response.data) {
        throw new Error('Brak danych z serwera');
      }
      return response.data;
    },
    onSuccess: newProfile => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, newProfile);
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });

  return { 
    profile: query.data,
    username: query.data?.username || '',
    email: query.data?.email || '', 
    bio: query.data?.profile?.bio || '', 
    isLoading, 
    error: query.error, 
    updateProfile 
  };
};
