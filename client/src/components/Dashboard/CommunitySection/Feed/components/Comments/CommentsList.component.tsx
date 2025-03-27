import { memo } from 'react';
import { motion } from 'framer-motion';
import { Comment } from '../../../types/comments.types';
import { formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';

type CommentsListProps = {
  comments?: Comment[];
};

export const CommentsList = memo(({ comments = [] }: CommentsListProps) => {
  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto">
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
      {comments.length === 0 && (
        <p className="text-center text-gray-400 py-4">
          Brak komentarzy. Bądź pierwszy!
        </p>
      )}
    </div>
  );
});

const CommentItem = memo(({ comment }: { comment: Comment }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex gap-3"
  >
    <div className="w-10 h-10 rounded-full bg-js flex items-center justify-center">
      <span className='text-dark font-bold text-xl'>{comment.author.name[0]}</span>
    </div>
    <div className="flex-1">
      <div className="bg-dark/20 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-gray-200">
            {comment.author.name}
          </span>
          <span className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
              locale: pl
            })}
          </span>
        </div>
        <p className="text-gray-300 break-words">{comment.content}</p>
      </div>
    </div>
  </motion.div>
));

CommentsList.displayName = 'CommentsList';
CommentItem.displayName = 'CommentItem'; 