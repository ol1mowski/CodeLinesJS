import { memo } from 'react';
import { IconType } from 'react-icons';

type Props = {
  title: string;
  difficulty: string;
  Icon: IconType;
  difficultyColor: string;
};

export const ChallengeCardHeader = memo(({ title, difficulty, Icon, difficultyColor }: Props) => (
  <div className="flex items-center gap-4">
    <div className="p-3 rounded-lg bg-js/10">
      <Icon className="w-6 h-6 text-js" />
    </div>
    <div>
      <h3 className="text-lg font-bold text-js">{title}</h3>
      <span className={`text-sm ${difficultyColor}`}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </span>
    </div>
  </div>
));

ChallengeCardHeader.displayName = 'ChallengeCardHeader';
