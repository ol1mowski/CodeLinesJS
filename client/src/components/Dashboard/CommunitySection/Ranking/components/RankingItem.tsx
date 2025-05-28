import { memo } from 'react';
import { HiStar } from 'react-icons/hi';
import { UserAvatar } from './UserAvatar';
import { RankingUser } from '../types/ranking.types';

interface RankingItemProps {
  user: RankingUser;
  index: number;
  animationDelay?: number;
}

export const RankingItem = memo(({ user, index, animationDelay = 0.1 }: RankingItemProps) => {
  const position = user.position ?? index + 1;
  const rankClass = position <= 3 ? 'text-yellow-500' : 'text-gray-400';
  
  // Podświetlenie dla aktualnego użytkownika
  const isCurrentUser = user.isCurrentUser;
  const backgroundClass = isCurrentUser 
    ? 'bg-js/10 border-js/30' 
    : 'bg-dark-card/50 border-js/5 hover:border-js/10';

  return (
    <div 
      className={`backdrop-blur-sm rounded-lg border p-4 transition-all flex items-center justify-between ${backgroundClass}`}
      style={{ 
        animation: `fadeIn 0.5s ease-out ${animationDelay * (index + 1)}s both`,
      }}
    >
      <div className="flex items-center space-x-4">
        <div className={`font-bold text-xl min-w-8 ${rankClass}`}>
          {position <= 3 && <HiStar className="inline mr-1" />}
          {position}
        </div>
        
        <div className="flex items-center space-x-3">
          <UserAvatar 
            username={user.username} 
            avatar={user.avatar} 
            size="md"
            className={position <= 3 ? 'ring-2 ring-yellow-500/30' : ''}
          />
          
          <div>
            <div className="font-medium text-lg text-white">
              {user.username}
              {user.isCurrentUser && (
                <span className="ml-2 text-xs font-medium bg-js text-black px-2 py-0.5 rounded font-bold">
                  Ty
                </span>
              )}
            </div>
            <div className="text-gray-400 text-sm">
              Poziom: <span className="text-js">{user.stats?.level || user.level || 1}</span> • 
              Punkty: <span className="text-js">{user.stats?.points || user.points || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

RankingItem.displayName = 'RankingItem';
