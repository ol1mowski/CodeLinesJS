import { memo } from 'react';
import { TimelineHeader } from './components/TimelineHeader.component';
import { TimelineStep } from './components/TimelineStep.component';
import { roadmapSteps } from './roadmapSteps.data';

export const RoadmapTimeline = memo(() => (
  <div className="p-6 space-y-6">
    <TimelineHeader />
    <div className="space-y-8 relative">
      <div className="absolute left-[21px] top-3 bottom-3 w-0.5 bg-js/20" />
      {roadmapSteps.map((step, index) => (
        <TimelineStep key={step.title} {...step} index={index} />
      ))}
    </div>
  </div>
));

RoadmapTimeline.displayName = 'RoadmapTimeline';
