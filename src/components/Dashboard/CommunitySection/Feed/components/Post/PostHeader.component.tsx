import { memo } from "react";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";

type PostHeaderProps = {
  author: {
    username: string;
  };
  createdAt: string;
};

export const PostHeader = memo(({ author, createdAt }: PostHeaderProps) => (
  <div className="flex items-center gap-4 mb-4">
    <div className="w-10 h-10 rounded-full bg-js flex items-center justify-center">
      <span className='text-dark font-bold text-xl'>{author.username[0]}</span>
    </div>
    <div>
      <h3 className="font-medium text-js">{author.username}</h3>
      <span className="text-sm text-gray-400">
        {formatDistanceToNow(new Date(createdAt), {
          addSuffix: true,
          locale: pl
        })}
      </span>
    </div>
  </div>
));

PostHeader.displayName = "PostHeader"; 