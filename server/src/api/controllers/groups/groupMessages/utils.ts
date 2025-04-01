import { FormattedReactions } from './types.js';

export const groupReactions = (reactions: any[] = []): Array<{emoji: string, count: number}> => {
  const summary: Record<string, number> = {};
  
  reactions.forEach(reaction => {
    if (!summary[reaction.emoji]) {
      summary[reaction.emoji] = 0;
    }
    summary[reaction.emoji]++;
  });
  
  return Object.entries(summary).map(([emoji, count]) => ({ emoji, count }));
};

export const formatReactions = (reactions: any[] = [], userId: string): FormattedReactions => {
  return {
    summary: groupReactions(reactions || []),
    userReactions: (reactions || [])
      .filter(r => r.userId && r.userId.toString() === userId)
      .map(r => r.emoji)
  };
};

export const hasUserReported = (reports: any[] = [], userId: string): boolean => {
  return (reports || []).some(report => report.userId && report.userId.toString() === userId);
}; 