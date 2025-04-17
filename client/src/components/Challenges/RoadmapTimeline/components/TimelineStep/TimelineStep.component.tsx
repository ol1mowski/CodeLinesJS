import { memo } from 'react';
import { TimelineIcon } from './TimelineIcon.component';
import { TimelineContent } from './TimelineContent.component';
import { TimelineStepProps } from '../../types';

export const TimelineStep = memo(
  ({ title, description, duration, icon, skills }: TimelineStepProps) => (
    <div className="flex gap-6">
      <TimelineIcon Icon={icon} />
      <TimelineContent
        title={title}
        description={description}
        duration={duration}
        skills={skills}
      />
    </div>
  )
);

TimelineStep.displayName = 'TimelineStep';
