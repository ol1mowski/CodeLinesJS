import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "../../api/posts.api";
import { Post } from "../../types/post.types";
import toast from "react-hot-toast";
import { useAuth } from "../../../../../hooks/useAuth";

export const useLikePost = (post: Post) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const likeMutation = useMutation({
    mutationFn: () => toggleLike(post._id, post.likes.isLiked, token || ''),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (old: any) => ({
        ...old,
        pages: old.pages.map((page: any) => ({
          ...page,
          posts: page.posts.map((p: Post) => 
            p._id === post._id 
              ? {
                  ...p,
                  likes: {
                    isLiked: !p.likes.isLiked,
                    count: p.likes.isLiked ? p.likes.count - 1 : p.likes.count + 1
                  }
                }
              : p
          )
        }))
      }));

      return { previousPosts };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["posts"], context?.previousPosts);
      toast.error("Nie udało się zaktualizować polubienia");
    }
  });

  return {
    handleLike: () => {
      if (likeMutation.isPending) return;
      likeMutation.mutate();
    },
    isLiking: likeMutation.isPending
  };
}; 