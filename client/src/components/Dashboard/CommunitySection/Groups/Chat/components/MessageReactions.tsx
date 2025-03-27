import { memo } from 'react';
import { motion } from 'framer-motion';
import { MessageReaction } from '../../../types/messages.types';

type MessageReactionsProps = {
  reactions: MessageReaction[];
  onReactionClick: (emoji: string) => void;
  isReacting: boolean;
  currentUserId?: string;
};

export const MessageReactions = memo(({ 
  reactions, 
  onReactionClick, 
  isReacting,
  currentUserId 
}: MessageReactionsProps) => {
  const groupedReactions = reactions.reduce((acc, reaction) => {
    acc[reaction.emoji] = acc[reaction.emoji] || [];
    acc[reaction.emoji].push(reaction);
    return acc;
  }, {} as Record<string, MessageReaction[]>);

  return (
    <div className="flex flex-wrap gap-1">
      {Object.entries(groupedReactions).map(([emoji, reactions]) => {
        const hasReacted = currentUserId && reactions.some(r => r.userId === currentUserId);

        return (
          <motion.button
            key={emoji}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onReactionClick(emoji)}
            disabled={isReacting}
            className={`
              flex items-center gap-1.5 px-2 py-1 rounded-full
              transition-colors text-sm
              ${isReacting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-js/10'}
              ${hasReacted ? 'bg-js/20' : 'bg-dark/30'}
            `}
            title={reactions.map(r => r.username).join(', ')}
          >
            <span className="text-base">{emoji}</span>
            <span className="text-gray-400 font-medium">{reactions.length}</span>
          </motion.button>
        );
      })}
    </div>
  );
});

MessageReactions.displayName = 'MessageReactions'; 