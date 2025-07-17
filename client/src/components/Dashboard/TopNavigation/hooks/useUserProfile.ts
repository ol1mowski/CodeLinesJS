import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../api/fetchUser.api';
import { useAuth } from '../../../../hooks/useAuth';
const USER_PROFILE_QUERY_KEY = ['userProfile'];

export const useUserProfile = () => {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: USER_PROFILE_QUERY_KEY,
    queryFn: () => fetchUser('authenticated'),
    enabled: isAuthenticated,
  });
};
