import { memo } from 'react';
import { TimelineContentProps } from '../../types';

export const TimelineContent = memo(
  ({ title, description, duration, skills }: TimelineContentProps) => (
    <div className="flex-1 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-js">{title}</h3>
        <span className="text-sm text-gray-400 px-2 py-1 rounded-full bg-js/5 border border-js/10">
          {duration}
        </span>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      <div className="flex gap-2 flex-wrap">
        {skills.map(skill => (
          <span key={skill} className="text-xs px-2 py-1 rounded-full bg-js/10 text-js">
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
);

TimelineContent.displayName = 'TimelineContent';
