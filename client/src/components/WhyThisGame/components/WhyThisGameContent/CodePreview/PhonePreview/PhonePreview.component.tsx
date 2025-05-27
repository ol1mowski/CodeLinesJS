export const PhonePreview = () => {
  return (
    <div className="relative">
      <div className="w-64 h-[500px] bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl border-4 border-gray-800">
        <div className="w-full h-full bg-[#1a1a1a] rounded-[2rem] overflow-hidden relative">
          <div className="bg-[#2d2d2d] px-4 py-2 flex justify-between items-center text-white text-xs">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-white rounded-sm">
                <div className="w-3 h-1 bg-green-400 rounded-sm" />
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <div className="text-center">
              <h3 className="text-[#f7df1e] font-bold text-lg font-space">
                JavaScript Game
              </h3>
              <p className="text-gray-400 text-sm">Poziom 15</p>
            </div>

            <div className="bg-[#2d2d2d] rounded-lg p-3 border border-[#f7df1e]/20">
              <h4 className="text-white font-semibold text-sm mb-2">
                Wyzwanie: Sortowanie
              </h4>
              <p className="text-gray-300 text-xs leading-relaxed">
                Rozwiązuj rzeczywiste problemy programistyczne w formie gry. Każdy 
                poziom to nowe wyzwanie, które rozwija Twoje umiejętności.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Postęp</span>
                <span className="text-[#f7df1e]">75%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-[#f7df1e] h-2 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>

            <div className="space-y-2">
              <button className="w-full bg-[#f7df1e] text-[#1a1a1a] py-2 rounded-lg font-semibold text-sm">
                Uruchom Kod
              </button>
              <button className="w-full border border-[#f7df1e] text-[#f7df1e] py-2 rounded-lg font-semibold text-sm">
                Sprawdź Rozwiązanie
              </button>
            </div>

            <div className="bg-[#f7df1e]/10 border border-[#f7df1e]/20 rounded-lg p-3">
              <p className="text-[#f7df1e] text-xs">
                💡 Wskazówka: Użyj rekurencji do podziału tablicy
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-[#f7df1e] rounded-[2.5rem] blur-xl opacity-20 -z-10" />
    </div>
  );
}; 