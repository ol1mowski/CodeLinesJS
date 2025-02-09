import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchGroups, joinGroup } from '../../api/groups';
import { GroupsResponse } from '../../types/groups.types';

const GROUPS_QUERY_KEY = 'groups';

export const useGroups = () => {
  const queryClient = useQueryClient();

  const { data: groups, isLoading } = useQuery<GroupsResponse>({
    queryKey: [GROUPS_QUERY_KEY],
    queryFn: fetchGroups,
    staleTime: 5 * 60 * 1000
  });

  const joinGroupMutation = useMutation({
    mutationFn: (groupId: string) => joinGroup(groupId),
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