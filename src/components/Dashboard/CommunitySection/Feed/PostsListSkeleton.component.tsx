import { memo } from "react";

type PostsListSkeletonProps = {
  count?: number;
};

export const PostsListSkeleton = memo(({ count = 3 }: PostsListSkeletonProps) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50 animate-pulse">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-700/50" />
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-4 w-24 bg-gray-700/50 rounded" />
                <div className="h-4 w-16 bg-gray-700/50 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-gray-700/50 rounded" />
                <div className="h-4 w-1/2 bg-gray-700/50 rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

PostsListSkeleton.displayName = "PostsListSkeleton"; 