import { FeaturesList } from '../FeaturesList/FeaturesList.component';

export const AuthWelcomeContent = () => (
  <div className="text-center md:text-left max-w-xl">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
      Odkryj <span className="text-[#f7df1e]">JavaScript</span> w nowy sposób
    </h1>
    <p className="text-lg md:text-xl text-gray-300 mb-8">
      Ucz się, programuj i baw się jednocześnie. Nasza platforma łączy teorię z praktyką, 
      oferując interaktywne lekcje, wyzwania i gry.
    </p>
    <FeaturesList />
  </div>
); 