import { GameDescription } from './GameDescription/GameDescription.component';
import { CodePreview } from './CodePreview/CodePreview.component';
import { FeatureTiles } from './FeatureTiles/FeatureTiles.component';

export const WhyThisGameContent = () => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="order-2 lg:order-1">
          <GameDescription />
        </div>

        <div className="order-1 lg:order-2">
          <CodePreview />
        </div>
      </div>

      <FeatureTiles />
    </div>
  );
}; 