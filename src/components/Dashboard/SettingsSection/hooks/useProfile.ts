import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUserProfile, updateUserProfile, updateUserAvatar } from '../utils/api/profile';
import type { UserProfile } from '../types/settings';
import { useState, useEffect } from 'react';

export const PROFILE_QUERY_KEY = ['profile'];

type Profile = {
  username: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
}

export const useProfile = () => {
  const queryClient = useQueryClient();
  const [profile, setProfile] = useState<Profile | null>(null);

  const { data: profileData, isLoading, error } = useQuery<Profile>({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: fetchUserProfile,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
    initialData: queryClient.getQueryData(PROFILE_QUERY_KEY),
  });

  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
    }
  }, [profileData]);

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