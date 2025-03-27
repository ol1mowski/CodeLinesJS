import { memo } from 'react';
import { FaLock } from 'react-icons/fa';

type PathHeaderProps = {
  title: string;
  isLocked: boolean;
  requiredLevel: number;
}

export const PathHeader = memo(({ title, isLocked, requiredLevel }: PathHeaderProps) => (
  <div className="flex items-start justify-between gap-4">
    <h3 className={`text-lg font-bold ${isLocked ? 'text-gray-400' : 'text-js'}`}>
      {title}
    </h3>
    {isLocked && (
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <FaLock className="w-4 h-4" />
        <span>Poziom {requiredLevel}</span>
      </div>
    )}
  </div>
));

PathHeader.displayName = "PathHeader"; 