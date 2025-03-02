import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { memo } from "react";
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";

type PostHeaderProps = {
  author: {
    username: string;
  };
  createdAt: string;
  onEdit: () => void;
  onDelete: () => void;
};

export const PostHeader = memo(({ author, createdAt, onEdit, onDelete }: PostHeaderProps) => (
  <div className="flex justify-between items-center mb-4">
    <div className="flex items-center gap-4">
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
    <div className="flex space-x-5">
      <FaRegEdit className="w-5 h-5 cursor-pointer text-gray-600 hover:text-js" onClick={onEdit} />
      <FaTrashAlt className="w-5 h-5 cursor-pointer text-gray-600 hover:text-red-500" onClick={onDelete} />
    </div>
  </div>
));

PostHeader.displayName = "PostHeader"; 