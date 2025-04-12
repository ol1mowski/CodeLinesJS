import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchGroups, joinGroup, GroupApiResponse } from '../../api/groups';
import { useAuth } from '../../../../../hooks/useAuth';

const GROUPS_QUERY_KEY = 'groups';

export const useGroups = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const { data: groupsResponse, isLoading } = useQuery<GroupApiResponse>({
    queryKey: [GROUPS_QUERY_KEY],
    queryFn: () => fetchGroups(token || ''),
    staleTime: 5 * 60 * 1000,
    enabled: !!token
  });

  const groups = groupsResponse?.data?.groups?.map(group => {
    const { _id, ...restGroup } = group;
    return {
      id: _id,
      _id,
      isJoined: group.isJoined || false,
      lastActive: new Date(group.lastActive || new Date()),
      tags: group.tags || [],
      owner: group.owner || {
        id: "unknown",
        name: "Nieznany"
      },
      ...restGroup
    };
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