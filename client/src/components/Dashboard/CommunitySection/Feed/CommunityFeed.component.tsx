import { memo } from "react";
import { CreatePost } from "./CreatePost.component";
import { PostsList } from "./PostsList.component";
import { ActiveUsers } from "./ActiveUsers.component";
import { usePosts } from "./hooks/usePosts.hook";
import { Post as PostType } from "../../../../types/post.types";
import { LoadingSpinner } from "../../../../components/UI/LoadingSpinner/LoadingSpinner.component";

const CommunityFeed = memo(() => {
  const { 
    posts, 
    isLoading, 
    isFetchingNextPage, 
    hasNextPage, 
    fetchNextPage,
    error
  } = usePosts();

  if (isLoading) {
    return <LoadingSpinner text="Ładowanie postów..." />;
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-dark/30 rounded-lg">
        <div className="text-red-500 text-2xl mb-2">Błąd ładowania</div>
        <p className="text-gray-400">
          {error instanceof Error ? error.message : 'Nie udało się załadować postów. Spróbuj ponownie później.'}
        </p>
      </div>
    );
  }

  const mappedPosts: PostType[] = posts.map(post => ({
    id: post._id,
    _id: post._id,
    isLiked: post.isLiked,
    author: {
      id: post.author._id,
      username: post.author.username,
      name: post.author.username,
      avatar: post.author.avatar
    },
    content: post.content,
    comments: [],
    createdAt: new Date(post.createdAt),
    likes: {
      count: post.likes.count,
      isLiked: post.isLiked
    },
    commentsCount: post.commentsCount
  }));

  return (
    <div className="space-y-6">
      <ActiveUsers />
      <CreatePost />
      {mappedPosts.length === 0 ? (
        <div className="text-center py-8 bg-dark/30 rounded-lg">
          <p className="text-gray-400 text-lg mb-2">Brak postów do wyświetlenia</p>
          <p className="text-gray-500">Bądź pierwszy i dodaj nowy post do społeczności</p>
        </div>
      ) : (
        <PostsList 
          posts={mappedPosts}
          isLoading={isLoading}
          isFetchingMore={isFetchingNextPage}
          hasMore={hasNextPage}
          onLoadMore={fetchNextPage}
        />
      )}
    </div>
  );
});

CommunityFeed.displayName = "CommunityFeed";
export default CommunityFeed; 