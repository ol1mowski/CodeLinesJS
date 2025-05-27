import { FeatureItem } from '../FeatureItem/FeatureItem.component';

export const FeaturesList = () => (
  <div className="space-y-4 sm:space-y-6">
    <FeatureItem 
      text="Szybki rozwój" 
      description="Naucz się nowoczesnych technologii JS"
      icon="⚡" 
    />
    <FeatureItem 
      text="Społeczność" 
      description="Połącz się z innymi developerami"
      icon="☕" 
    />
    <FeatureItem 
      text="Praktyka" 
      description="Rozwiązuj prawdziwe problemy"
      icon=">" 
    />
  </div>
);
