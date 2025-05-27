import { GameDescription } from './GameDescription/GameDescription.component';
import { CodePreview } from './CodePreview/CodePreview.component';

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

      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:row-span-2">
            <div className="bg-[#f7df1e] text-[#1a1a1a] rounded-2xl p-8 h-full min-h-[400px] flex flex-col justify-between hover:scale-105 transition-all duration-300 cursor-pointer group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🎯
              </div>
              <div>
                <h3 className="text-3xl font-bold font-space mb-4 leading-tight">
                  Interaktywne Wyzwania
                </h3>
                <p className="text-lg leading-relaxed opacity-80">
                  Rozwiązuj rzeczywiste problemy programistyczne w dynamicznym środowisku nauki
                </p>
              </div>
            </div>
          </div>


          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#1a1a1a] text-white rounded-2xl p-8 min-h-[200px] flex items-center hover:scale-105 transition-all duration-300 cursor-pointer group border border-gray-700">
              <div className="flex items-center gap-6 w-full">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  📊
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold font-space mb-2">
                    Śledzenie Postępów
                  </h3>
                  <p className="text-base opacity-80">
                    Monitoruj swoje osiągnięcia i zobacz jak rozwijają się Twoje umiejętności
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1a1a1a] text-white rounded-2xl p-6 min-h-[150px] flex flex-col justify-between hover:scale-105 transition-all duration-300 cursor-pointer group border border-gray-700">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  👥
                </div>
                <div>
                  <h3 className="text-lg font-bold font-space mb-2">
                    Społeczność
                  </h3>
                  <p className="text-sm opacity-80">
                    Dołącz do programistów
                  </p>
                </div>
              </div>

              <div className="bg-[#1a1a1a] text-white rounded-2xl p-6 min-h-[150px] flex flex-col justify-between hover:scale-105 transition-all duration-300 cursor-pointer group border border-gray-700">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  🏆
                </div>
                <div>
                  <h3 className="text-lg font-bold font-space mb-2">
                    Certyfikaty
                  </h3>
                  <p className="text-sm opacity-80">
                    Zdobywaj osiągnięcia
                  </p>
                </div>
              </div>

              <div className="bg-[#1a1a1a] text-white rounded-2xl p-6 min-h-[150px] flex flex-col justify-between hover:scale-105 transition-all duration-300 cursor-pointer group border border-gray-700">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  💬
                </div>
                <div>
                  <h3 className="text-lg font-bold font-space mb-2">
                    Wsparcie 24/7
                  </h3>
                  <p className="text-sm opacity-80">
                    Pomoc przez całą dobę
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#1a1a1a] text-white rounded-2xl p-8 min-h-[200px] flex items-center hover:scale-105 transition-all duration-300 cursor-pointer group border border-gray-700">
              <div className="flex items-center gap-6 w-full">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  💻
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold font-space mb-2">
                    Praktyczne Projekty
                  </h3>
                  <p className="text-base opacity-80">
                    Twórz rzeczywiste aplikacje podczas nauki programowania
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1a1a1a] text-white rounded-2xl p-6 min-h-[150px] flex flex-col justify-between hover:scale-105 transition-all duration-300 cursor-pointer group border border-gray-700">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  🎓
                </div>
                <div>
                  <h3 className="text-lg font-bold font-space mb-2">
                    Mentoring
                  </h3>
                  <p className="text-sm opacity-80">
                    Wsparcie ekspertów
                  </p>
                </div>
              </div>

              <div className="bg-[#1a1a1a] text-white rounded-2xl p-6 min-h-[150px] flex flex-col justify-between hover:scale-105 transition-all duration-300 cursor-pointer group border border-gray-700">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  📁
                </div>
                <div>
                  <h3 className="text-lg font-bold font-space mb-2">
                    Portfolio
                  </h3>
                  <p className="text-sm opacity-80">
                    Buduj swoje projekty
                  </p>
                </div>
              </div>

              <div className="bg-[#1a1a1a] text-white rounded-2xl p-6 min-h-[150px] flex flex-col justify-between hover:scale-105 transition-all duration-300 cursor-pointer group border border-gray-700">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  🚀
                </div>
                <div>
                  <h3 className="text-lg font-bold font-space mb-2">
                    Kariera
                  </h3>
                  <p className="text-sm opacity-80">
                    Rozwój zawodowy
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:row-span-2">
            <div className="bg-[#f7df1e] text-[#1a1a1a] rounded-2xl p-8 h-full min-h-[400px] flex flex-col justify-between hover:scale-105 transition-all duration-300 cursor-pointer group">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                🧠
              </div>
              <div>
                <h3 className="text-3xl font-bold font-space mb-4 leading-tight">
                  Zaawansowane Algorytmy
                </h3>
                <p className="text-lg leading-relaxed opacity-80">
                  Poznaj złożone struktury danych i algorytmy w przystępny sposób
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 