import { FeatureItem } from '../FeatureItem/FeatureItem.component';

export const FeaturesList = () => (
  <div className="space-y-3 sm:space-y-4">
    <FeatureItem text="Szybki rozwój" icon="🚀" />
    <FeatureItem text="Społeczność" icon="👥" />
    <FeatureItem text="Praktyka" icon="💻" />
  </div>
);
