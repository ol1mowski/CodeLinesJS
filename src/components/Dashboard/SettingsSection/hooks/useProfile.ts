import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUserProfile, updateUserProfile, updateUserAvatar } from '../utils/api/profile';
import type { UserProfile } from '../types/settings';

export const PROFILE_QUERY_KEY = ['profile'];

export const useProfile = () => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: fetchUserProfile,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const updateProfile = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (newProfile) => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, newProfile);
    },
  });

  const updateAvatar = useMutation({
    mutationFn: updateUserAvatar,
    onSuccess: (data) => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, (old: UserProfile | undefined) => 
        old ? { ...old, avatarUrl: data.avatarUrl } : old
      );
    },
  });

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    updateAvatar,
  };
}; 