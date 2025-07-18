import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUserProfile, updateUserProfile } from '../api/profile';
import { useAuth } from '../../../Auth/hooks/useAuth.hook';
import type { UserProfile } from '../types/settings';

export const PROFILE_QUERY_KEY = ['profile'] as const;

export const useProfile = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated, isAuthChecking } = useAuth();

  const query = useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: () => fetchUserProfile(),
    enabled: isAuthenticated && !isAuthChecking,
    staleTime: 1000 * 60 * 5,
  });

  const isLoading = query.isLoading || isAuthChecking;

  const updateProfile = useMutation({
    mutationFn: (data: UserProfile) => updateUserProfile(data),
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
