import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUserProfile, updateUserProfile } from '../api/profile';
import { useAuth } from '../../../../hooks/useAuth';
import type { UserProfile } from '../types/settings';

export const PROFILE_QUERY_KEY = ['profile'] as const;

export const useProfile = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: () => fetchUserProfile('authenticated'),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
  });

  const updateProfile = useMutation({
    mutationFn: (data: UserProfile) => updateUserProfile(data, 'authenticated'),
    onSuccess: newProfile => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, newProfile);
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });

  return { 
    profile,
    username: profile?.username || '',
    email: profile?.email || '', 
    bio: profile?.profile?.bio || '', 
    isLoading, 
    error, 
    updateProfile 
  };
};
