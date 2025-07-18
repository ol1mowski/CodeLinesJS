import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../api/fetchUser.api';
import { useAuth } from '../../../Auth/hooks/useAuth.hook';
const USER_PROFILE_QUERY_KEY = ['userProfile'];

export const useUserProfile = () => {
  const { isAuthenticated, isAuthChecking } = useAuth();

  const query = useQuery({
    queryKey: USER_PROFILE_QUERY_KEY,
    queryFn: () => fetchUser(),
    enabled: isAuthenticated && !isAuthChecking,
  });

  const isLoading = query.isLoading || isAuthChecking;

  return {
    ...query,
    isLoading,
  };
};
