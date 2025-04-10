import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchGroups, joinGroup } from '../../api/groups';
import { useAuth } from '../../../../../hooks/useAuth';
import { Group } from '../../../../../types/groups.types';

const GROUPS_QUERY_KEY = 'groups';

export const useGroups = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const { data: groups, isLoading } = useQuery<Group[]>({
    queryKey: [GROUPS_QUERY_KEY],
    queryFn: () => fetchGroups(token || ''),
    staleTime: 5 * 60 * 1000,
    enabled: !!token
  });

  const joinGroupMutation = useMutation({
    mutationFn: (groupId: string) => joinGroup(groupId, token || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GROUPS_QUERY_KEY] });
    }
  });

  return {
    groups,
    isLoading,
    joinGroup: joinGroupMutation.mutate,
    isJoining: joinGroupMutation.isPending
  };
}; 