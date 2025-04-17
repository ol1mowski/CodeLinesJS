import { FeatureItem } from '../FeatureItem/FeatureItem.component';

export const FeaturesList = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <FeatureItem text="Interaktywne lekcje" />
    <FeatureItem text="Wyzwania i gry" />
    <FeatureItem text="Śledzenie postępów" />
    <FeatureItem text="Społeczność" />
  </div>
);
