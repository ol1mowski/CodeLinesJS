import { memo } from 'react';

interface RankingPositionProps {
  position: number;
  showMedal?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RankingPosition = memo(
  ({ position, showMedal = true, size = 'md', className = '' }: RankingPositionProps) => {
    const isTopThree = position < 4;

    const dimensions = {
      sm: 'w-5 h-5',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    };

    const textSizes = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    if (showMedal && isTopThree) {
      const medalColors = {
        1: 'bg-yellow-500',
        2: 'bg-gray-300',
        3: 'bg-amber-700',
      };

      return (
        <div
          className={`
        flex items-center justify-center rounded-full text-dark font-semibold
        ${dimensions[size]} ${medalColors[position as 1 | 2 | 3]} ${className}
      `}
        >
          {position}
        </div>
      );
    }

    return (
      <div
        className={`
      flex items-center justify-center rounded-full bg-js/10 text-gray-300 font-semibold
      ${dimensions[size]} ${textSizes[size]} ${className}
    `}
      >
        {position}
      </div>
    );
  }
);

RankingPosition.displayName = 'RankingPosition';
