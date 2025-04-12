import { memo } from 'react';

export const Feed = memo(() => {
  return (
    <div className="space-y-6">
      <div className="bg-dark/20 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold text-js mb-4">Aktualności</h2>
        <p className="text-gray-300">
          Witaj w sekcji aktualności społeczności CodeLinesJS. 
          Tutaj znajdziesz najnowsze posty, komentarze i aktywności członków społeczności.
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Przykładowe posty - w rzeczywistej implementacji powinny być pobierane z API */}
        {[1, 2, 3].map((post) => (
          <div key={post} className="bg-dark/30 p-4 rounded-lg border border-js/10">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-js/30 flex items-center justify-center text-dark">
                U{post}
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-white">Użytkownik {post}</h3>
                <p className="text-xs text-gray-400">Opublikowano dziś</p>
              </div>
            </div>
            <p className="text-gray-200 mb-3">
              To jest przykładowy post w sekcji aktualności. W przyszłości będzie tutaj wyświetlana 
              rzeczywista treść postów użytkowników.
            </p>
            <div className="flex space-x-4 text-sm text-gray-400">
              <button className="hover:text-js transition-colors">
                ❤️ Lubię to
              </button>
              <button className="hover:text-js transition-colors">
                💬 Komentarze (0)
              </button>
              <button className="hover:text-js transition-colors">
                🔁 Udostępnij
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

Feed.displayName = 'Feed'; 