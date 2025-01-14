import { RankingUser } from '../types/ranking.types';

const ctx: Worker = self as any;

const calculateUserStats = (user: RankingUser) => {
  const efficiency = (user.stats.completedChallenges * user.stats.accuracy) / 100;
  const streakBonus = user.stats.winStreak * 10;
  return efficiency + streakBonus;
};

const sortUsers = (users: RankingUser[]) => {
  return users.sort((a, b) => {
    const statsA = calculateUserStats(a);
    const statsB = calculateUserStats(b);
    return statsB - statsA;
  });
};

ctx.addEventListener('message', (event) => {
  const { users, type } = event.data;

  switch (type) {
    case 'SORT_USERS':
      const sortedUsers = sortUsers(users);
      ctx.postMessage({ type: 'SORTED_USERS', users: sortedUsers });
      break;

    case 'CALCULATE_STATS':
      const stats = users.map((user: RankingUser) => ({
        id: user.id,
        stats: calculateUserStats(user)
      }));
      ctx.postMessage({ type: 'CALCULATED_STATS', stats });
      break;

    default:
      break;
  }
});

export {}; 