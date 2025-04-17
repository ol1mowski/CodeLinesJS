import { ProgressStats } from '../ProgressStats/ProgressStats.component';
import { LearningChart } from '../LearningChart/LearningChart.component';

export const Content = () => (
  <div className="flex flex-col xl:flex-row items-center justify-between gap-12 md:gap-16 w-full">
    <ProgressStats />
    <div className="w-full xl:w-1/2">
      <div className="rounded-xl border border-js/20 bg-dark/50 backdrop-blur-sm overflow-hidden shadow-xl">
        <LearningChart />
      </div>
    </div>
  </div>
);
