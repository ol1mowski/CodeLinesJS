import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchGroupMessages } from "../../../api/groupMessages";

export const useMessages = (groupId: string) => {
  const messagesQuery = useInfiniteQuery({
    queryKey: ['groupMessages', groupId],
    queryFn: ({ pageParam = 1 }) => fetchGroupMessages(groupId, pageParam),
    getNextPageParam: (lastPage) => 
      lastPage.data.pagination.hasNextPage ? lastPage.data.pagination.page + 1 : undefined,
    initialPageParam: 1
  });


  const messages = messagesQuery.data?.pages.flatMap(page => page.data.messages) ?? [];

  return {
    messages,
    hasNextPage: messagesQuery.hasNextPage,
    isFetchingNextPage: messagesQuery.isFetchingNextPage,
    isLoading: messagesQuery.isLoading,
    fetchNextPage: messagesQuery.fetchNextPage
  };
}; 