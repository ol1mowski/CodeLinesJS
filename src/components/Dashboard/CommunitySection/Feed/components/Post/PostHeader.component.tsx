import { memo } from "react";
import { FaUserCircle } from "react-icons/fa";
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
    <div className="w-10 h-10 rounded-full bg-js/20 flex items-center justify-center">
      <FaUserCircle className="w-6 h-6 text-js" />
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