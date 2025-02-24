import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "../../api/posts.api";
import { Post } from "../../types/post.types";
import toast from "react-hot-toast";
import { useAuth } from "../../../../../hooks/useAuth";

export const useLikePost = (post: Post) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();

  const likeMutation = useMutation({
    mutationFn: () => toggleLike(post._id, post.isLiked, token || ''),
    
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousData = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (old: any) => {
        if (!old?.pages) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            posts: page.posts.map((p: Post) => 
              p._id === post._id 
                ? {
                    ...p,
                    isLiked: !p.isLiked,
                    likes: {
                      count: p.isLiked ? p.likes.count - 1 : p.likes.count + 1
                    }
                  }
                : p
            )
          }))
        };
      });

      return { previousData };
    },

    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["posts"], context.previousData);
      }
      toast.error("Nie udało się zaktualizować polubienia");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });

  const handleLike = () => {
    if (likeMutation.isPending) return;
    likeMutation.mutate();
  };

  return {
    handleLike,
    isLiking: likeMutation.isPending
  };
}; 