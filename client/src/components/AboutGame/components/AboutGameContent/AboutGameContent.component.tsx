import { FeatureCards } from './FeatureCards/FeatureCards.component';

export const AboutGameContent = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-16">
        <div className="space-y-6 text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-[#f7df1e] font-space text-left mb-4">
            O Grze
          </h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed text-left mb-8">
            Zanurz się w fascynującym świecie programowania z naszą interaktywną grą JavaScript! Ucz się, koduj i rozwiązuj wyzwania w dynamicznym środowisku, które łączy zabawę z nauką.
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-white font-space text-left">
            Dlaczego nasza gra?
          </h3>
          <p className="text-lg text-gray-400 leading-relaxed text-left mb-8">
            Stworzona przez programistów dla programistów, nasza gra oferuje unikalne 
            doświadczenie nauki JavaScript poprzez praktyczne wyzwania i interaktywne 
            scenariusze. Każdy poziom to nowa wyzwanie, które rozwija Twoje umiejętności.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/20 border border-[#f7df1e]/10 rounded-xl p-4 hover:border-[#f7df1e]/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#f7df1e]/10 rounded-lg flex items-center justify-center text-[#f7df1e] text-sm">
                  ⚡
                </div>
                <h4 className="text-lg font-bold text-[#f7df1e] font-space">Szybka Nauka</h4>
              </div>
              <p className="text-sm text-gray-400">Efektywne metody uczenia się przez praktykę</p>
            </div>
            
            <div className="bg-black/20 border border-[#f7df1e]/10 rounded-xl p-4 hover:border-[#f7df1e]/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-[#f7df1e]/10 rounded-lg flex items-center justify-center text-[#f7df1e] text-sm">
                  🏆
                </div>
                <h4 className="text-lg font-bold text-[#f7df1e] font-space">Wyzwania</h4>
              </div>
              <p className="text-sm text-gray-400">Progresywne poziomy trudności</p>
            </div>
          </div>
        </div>

        <div className="lg:pl-8">
          <FeatureCards />
        </div>
      </div>

    </div>
  );
}; 