import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "../../api/posts.api";
import { Post } from "../../types/post.types";
import toast from "react-hot-toast";
import { useAuth } from "../../../../../hooks/useAuth";
import { useState, useEffect } from "react";

export const useLikePost = (post: Post) => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  
  const [localIsLiked, setLocalIsLiked] = useState(post.isLiked);
  
  useEffect(() => {
    setLocalIsLiked(post.isLiked);
  }, [post.isLiked]);


  const likeMutation = useMutation({
    mutationFn: () => {
      return toggleLike(post._id, localIsLiked, token || '');
    },
    
    onMutate: async () => {
      const newIsLiked = !localIsLiked;
      setLocalIsLiked(newIsLiked);
      
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousData = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (old: any) => {
        if (!old?.pages) return old;

        const newPages = old.pages.map((page: any) => ({
          ...page,
          posts: page.posts.map((p: Post) => {
            if (p._id === post._id) {
              const newLikesCount = localIsLiked ? Math.max(0, p.likes.count - 1) : p.likes.count + 1;
              
              return {
                ...p,
                isLiked: newIsLiked,
                likes: {
                  ...p.likes,
                  count: newLikesCount,
                  isLiked: newIsLiked
                }
              };
            }
            return p;
          })
        }));

        return {
          ...old,
          pages: newPages
        };
      });

      return { previousData };
    },

    onError: (error, _, context) => {
      setLocalIsLiked(!localIsLiked);
      if (context?.previousData) {
        queryClient.setQueryData(["posts"], context.previousData);
      }
      toast.error("Nie udało się zaktualizować polubienia");
    },

  });

  const handleLike = () => {
    if (likeMutation.isPending) {
      return;
    }
    likeMutation.mutate();
  };

  return {
    handleLike,
    isLiking: likeMutation.isPending,
    isLiked: localIsLiked
  };
}; 