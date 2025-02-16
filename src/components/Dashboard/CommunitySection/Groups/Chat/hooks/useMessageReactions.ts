import { useCallback } from 'react';
import { useReactionMutation } from './useReactionMutation';
import { MessageReaction } from '../../../types/messages.types';

export const useMessageReactions = (
  messageId: string, 
  groupId: string, 
  currentUserId: string,
  reactions: MessageReaction[] = [],
  onReactionAdd?: () => void
) => {
  const reactionMutation = useReactionMutation(groupId);

  const handleReaction = useCallback((emoji: string) => {
    const reactionsList = Array.isArray(reactions) ? reactions : [];
    
    const hasReacted = reactionsList.some(
      r => r.userId === currentUserId && r.emoji === emoji
    );

    reactionMutation.mutate(
      { 
        messageId, 
        reaction: emoji,
        action: hasReacted ? 'remove' : 'add'
      } as const,
      {
        onSuccess: () => {
          onReactionAdd?.();
        }
      }
    );
  }, [messageId, reactions, currentUserId, reactionMutation, onReactionAdd]);

  return {
    handleReaction,
    isReacting: reactionMutation.isPending
  };
}; 