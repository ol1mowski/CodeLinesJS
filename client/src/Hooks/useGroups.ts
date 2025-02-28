import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { groupsApi } from '../api/groups/groups.api';

export const useGroups = () => {
  const queryClient = useQueryClient();

  const { data: groups, isLoading, error } = useQuery({
    queryKey: ['groups'],
    queryFn: groupsApi.getGroups
  });

  const joinGroupMutation = useMutation({
    mutationFn: groupsApi.joinGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    }
  });

  return {
    groups,
    isLoading,
    error,
    joinGroup: joinGroupMutation.mutate
  };
}; 