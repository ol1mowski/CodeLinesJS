import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { groupsApi, GroupApiResponse } from '../api/groups/groups.api';

export const useGroups = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<GroupApiResponse>({
    queryKey: ['groups'],
    queryFn: groupsApi.getGroups
  });

  const joinGroupMutation = useMutation({
    mutationFn: groupsApi.joinGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    }
  });

  const leaveGroupMutation = useMutation({
    mutationFn: groupsApi.leaveGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    }
  });

  const groups = data?.data?.groups ? {
    groups: data.data.groups.map((group) => ({
      _id: group._id,
      id: group._id,
      name: group.name,
      description: group.description || '',
      membersCount: group.members?.length || 0,
      isJoined: group.isMember || false,
      tags: group.tags || [],
      postsCount: 0, 
      lastActive: group.updatedAt || new Date()
    })),
    userGroups: data.data.groups.filter((group) => group.isMember).map((group) => ({
      _id: group._id,
      id: group._id,
      name: group.name,
      membersCount: group.members?.length || 0
    }))
  } : { groups: [], userGroups: [] };

  return {
    groups,
    isLoading,
    error,
    joinGroup: joinGroupMutation.mutate,
    leaveGroup: leaveGroupMutation.mutate,
    isJoining: joinGroupMutation.isPending,
    isLeaving: leaveGroupMutation.isPending
  };
}; 