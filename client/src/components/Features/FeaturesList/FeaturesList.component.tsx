import { FeatureCard } from '../components/FeatureCard.component';
import { features } from '../constants/features.data';

export const FeaturesList = () => (
  <div className="w-full xl:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 px-4 xl:px-0">
    {features.map((feature, index) => (
      <FeatureCard key={feature.title} {...feature} index={index} />
    ))}
  </div>
);
