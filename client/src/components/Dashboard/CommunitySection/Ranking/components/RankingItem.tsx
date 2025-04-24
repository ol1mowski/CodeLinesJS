import { memo } from 'react';
import { motion } from 'framer-motion';
import { UserAvatar } from './UserAvatar';
import { RankingUser } from '../hooks/useRanking';

interface RankingItemProps {
  user: RankingUser;
  index: number;
  animationDelay?: number;
}

export const RankingItem = memo(({ user, index, animationDelay = 0.1 }: RankingItemProps) => {
  if (!user) {
    return null;
  }

  const position = user.position || index + 1;
  const points = user.stats?.points ?? user.points ?? 0;
  const level = user.stats?.level ?? user.level ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * animationDelay }}
      className="bg-dark/30 backdrop-blur-sm rounded-xl border border-js/10 p-4 hover:border-js/20 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <UserAvatar username={user.username} avatar={user.avatar} size="lg" />

          {index < 3 && (
            <div
              className="absolute -top-2 -right-2 rounded-full p-1 shadow-lg flex items-center justify-center w-8 h-8 text-sm font-bold text-dark"
              style={{
                background:
                  index === 0
                    ? 'linear-gradient(45deg, #FFD700, #FFC107)'
                    : index === 1
                      ? 'linear-gradient(45deg, #C0C0C0, #B0B0B0)'
                      : 'linear-gradient(45deg, #CD7F32, #B87333)',
              }}
            >
              {position}
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="font-bold text-gray-200">{user.username || 'Nieznany użytkownik'}</div>
          <div className="text-sm text-gray-400">
            Poziom {level} • {points} punktów
          </div>
        </div>
      </div>
    </motion.div>
  );
});

RankingItem.displayName = 'RankingItem';
