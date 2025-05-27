import { FeaturesList } from '../FeaturesList/FeaturesList.component';

export const AuthWelcomeContent = () => (
  <div className="w-full max-w-xl">
    <div className="flex items-center justify-center lg:justify-start gap-3 mb-6 sm:mb-8">
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#f7df1e] rounded-xl flex items-center justify-center">
        <span className="text-black font-bold text-xl sm:text-2xl">JS</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-white">CodeLines</h2>
    </div>

    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
      Witaj w świecie <span className="text-[#f7df1e]">JavaScript</span>
    </h1>
    
    <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed">
      Dołącz do społeczności programistów i rozwijaj swoje umiejętności w 
      najpopularniejszym języku programowania na świecie.
    </p>
    <FeaturesList />
    
    <div className="mt-8 sm:mt-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 sm:p-6 border border-gray-700">
      <pre className="text-[#f7df1e] text-xs sm:text-sm font-mono leading-relaxed">
        <code>{`const developer = {
  name: "Twoje imię",
  skills: ["JavaScript", "React", "Node.js"],
  passion: "coding"
};`}</code>
      </pre>
    </div>
  </div>
);
