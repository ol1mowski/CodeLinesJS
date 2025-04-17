import { CodeQuiz } from '../CodeQuiz/CodeQuiz.component';
import { FeaturesList } from '../FeaturesList/FeaturesList.component';

export const FeaturesContent = () => (
  <div className="flex flex-col xl:flex-row items-center justify-between gap-12 md:gap-16 w-full">
    <FeaturesList />
    <div className="w-full xl:w-1/2">
      <div className="rounded-xl border border-[#f7df1e]/20 bg-[#1a1a1a]/50 backdrop-blur-sm overflow-hidden shadow-xl">
        <CodeQuiz />
      </div>
    </div>
  </div>
);
