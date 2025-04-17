import { memo } from 'react';
import { FaClock } from 'react-icons/fa';
import { DifficultyBadge } from './DifficultyBadge.component';
import { XpBadge } from './XpBadge.component';

type LessonHeaderProps = {
  title: string;
  duration: string;
  difficulty: string;
  xp: number;
};

export const LessonHeader = memo(({ title, duration, difficulty, xp }: LessonHeaderProps) => (
  <div>
    <div className="flex items-center justify-between mb-4">
      <DifficultyBadge difficulty={difficulty} />
      <XpBadge xp={xp} />
    </div>

    <h1 className="text-3xl font-bold text-js mb-4">{title}</h1>

    <div className="flex items-center gap-4 text-sm text-gray-400">
      <span className="flex items-center gap-1">
        <FaClock className="w-4 h-4" />
        {duration} min
      </span>
    </div>
  </div>
));
