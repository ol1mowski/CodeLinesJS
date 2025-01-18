import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUserProfile, updateUserProfile, updateUserAvatar } from '../utils/api/profile';
import type { UserProfile } from '../types/settings';

export const PROFILE_QUERY_KEY = ['profile'];
export const AVATAR_QUERY_KEY = ['avatar'];

export const useProfile = () => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: fetchUserProfile,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const avatarUrl = profile?.avatar;

  const updateProfile = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (newProfile) => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, newProfile);
    },
  });

  const updateAvatar = useMutation({
    mutationFn: updateUserAvatar,
    onMutate: async (file) => {
      const tempUrl = URL.createObjectURL(file);
      const previousProfile = queryClient.getQueryData(PROFILE_QUERY_KEY);
      
      queryClient.setQueryData(PROFILE_QUERY_KEY, (old: UserProfile | undefined) => 
        old ? { ...old, avatarUrl: tempUrl } : old
      );
      
      return { previousProfile, tempUrl };
    },
    onSuccess: (data, _, context) => {
      if (context?.tempUrl) {
        URL.revokeObjectURL(context.tempUrl);
      }
      queryClient.setQueryData(PROFILE_QUERY_KEY, (old: UserProfile | undefined) => 
        old ? { ...old, avatarUrl: data.avatarUrl } : old
      );
    },
    onError: (_, __, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(PROFILE_QUERY_KEY, context.previousProfile);
      }
      if (context?.tempUrl) {
        URL.revokeObjectURL(context.tempUrl);
      }
    }
  });

  return {
    profile,
    avatarUrl,
    isLoading,
    error,
    updateProfile,
    updateAvatar,
  };
}; 