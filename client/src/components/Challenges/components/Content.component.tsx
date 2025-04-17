import { memo } from 'react';
import { ChallengesList } from '../ChallengesList/ChallengesList.component';
import { RoadmapTimeline } from '../RoadmapTimeline/RoadmapTimeline.component';

export const Content = memo(() => (
  <div className="flex flex-col xl:flex-row items-center justify-between gap-12 md:gap-16 w-full">
    <ChallengesList />
    <div className="w-full xl:w-1/2">
      <div className="rounded-xl border border-[#f7df1e]/20 bg-[#1a1a1a]/50 backdrop-blur-sm overflow-hidden shadow-xl">
        <RoadmapTimeline />
      </div>
    </div>
  </div>
));

Content.displayName = 'Content';
