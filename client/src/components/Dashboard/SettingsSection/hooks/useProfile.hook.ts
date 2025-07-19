import { httpClient } from "../../../../api/httpClient.api";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../Auth/hooks/useAuth.hook';

import type { UserProfile } from '../types/settings';

export const PROFILE_QUERY_KEY = ['userProfile'];

export const useProfile = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated, isAuthChecking } = useAuth();

  const query = useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: async () => {
      const response = await httpClient.get('settings/profile');
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
      const response = await httpClient.put('settings/profile', data);
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
    username: query.data?.user?.username || '',
    bio: query.data?.user?.bio || '', 
    isLoading, 
    error: query.error, 
    updateProfile 
  };
};
