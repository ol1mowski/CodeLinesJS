import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUserProfile, updateUserProfile, updateUserAvatar } from '../utils/api/profile';

export const PROFILE_QUERY_KEY = ['profile'];
export const AVATAR_QUERY_KEY = ['avatar'];

export const useProfile = () => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: fetchUserProfile,
    staleTime: 1000 * 60 * 5,
  });

  const updateProfile = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (newProfile) => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, newProfile);
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });

  const updateAvatar = useMutation({
    mutationFn: updateUserAvatar,
    onSuccess: (data) => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, (old: any) => ({
        ...old,
        profile: {
          ...old.profile,
          avatar: data.avatarUrl
        }
      }));
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    }
  });

  return {
    profile,
    avatarUrl: profile?.profile?.avatar || '',
    bio: profile?.profile?.bio || '',
    isLoading,
    error,
    updateProfile,
    updateAvatar,
  };
}; 