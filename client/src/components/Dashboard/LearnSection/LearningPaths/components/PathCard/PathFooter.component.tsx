import { memo } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaChevronRight } from 'react-icons/fa';
import { ProgressBar } from './ProgressBar.component';

type PathFooterProps = {
  id: string;
  isLocked: boolean;

  estimatedTime: number;
  progress: {
    completed: number;
    total: number;
    percentage: number;
  };
};

export const PathFooter = memo(({ id, isLocked, estimatedTime, progress }: PathFooterProps) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-1 text-gray-400">
        <FaClock className="w-4 h-4" />
        {estimatedTime} min
      </span>

      {!isLocked && (
        <Link
          to={`/dashboard/learn?tab=lessons&pathId=${id}`}
          className="text-js hover:text-js/80 transition-colors"
        >
          <FaChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>

    <ProgressBar progress={progress} />
  </div>
));

PathFooter.displayName = 'PathFooter';
