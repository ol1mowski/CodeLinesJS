export const CodeEditor = () => {
  const codeExample = `function solveProblem(level) {
  // Test kod tutaj
  const result = processData(level.data);
  
  return validateSolution(result);
}

// Przykład wyzwania z poziomu 15
const challenge = {
  title: "Sortowanie Algorytmów",
  description: "Zaimplementuj quicksort",
  difficulty: "intermediate"
};`;

  return (
    <div className="bg-[#1e1e1e] rounded-lg border border-gray-700 overflow-hidden shadow-2xl">
      <div className="bg-[#2d2d2d] px-4 py-3 flex items-center gap-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        
        <div className="text-gray-300 text-sm font-mono">
          game-challenge.js
        </div>
      </div>

      <div className="p-4 font-mono text-sm">
        <div className="flex">
          <div className="text-gray-500 select-none mr-4 text-right" style={{ minWidth: '2rem' }}>
            {codeExample.split('\n').map((_, index) => (
              <div key={index} className="leading-6">
                {index + 1}
              </div>
            ))}
          </div>
          
          <div className="flex-1">
            <pre className="text-gray-300 leading-6">
              <code>
                <span className="text-purple-400">function</span>{' '}
                <span className="text-blue-400">solveProblem</span>
                <span className="text-gray-300">(</span>
                <span className="text-orange-400">level</span>
                <span className="text-gray-300">) {'{'}
                </span>
                {'\n'}
                <span className="text-gray-500">  // Test kod tutaj</span>
                {'\n'}
                <span className="text-purple-400">  const</span>{' '}
                <span className="text-blue-400">result</span>{' '}
                <span className="text-gray-300">= </span>
                <span className="text-yellow-400">processData</span>
                <span className="text-gray-300">(level.data);</span>
                {'\n'}
                {'\n'}
                <span className="text-purple-400">  return</span>{' '}
                <span className="text-yellow-400">validateSolution</span>
                <span className="text-gray-300">(result);</span>
                {'\n'}
                <span className="text-gray-300">{'}'}</span>
                {'\n'}
                {'\n'}
                <span className="text-gray-500">// Przykład wyzwania z poziomu 15</span>
                {'\n'}
                <span className="text-purple-400">const</span>{' '}
                <span className="text-blue-400">challenge</span>{' '}
                <span className="text-gray-300">= {'{'}
                </span>
                {'\n'}
                <span className="text-red-400">  title</span>
                <span className="text-gray-300">: </span>
                <span className="text-green-400">"Sortowanie Algorytmów"</span>
                <span className="text-gray-300">,</span>
                {'\n'}
                <span className="text-red-400">  description</span>
                <span className="text-gray-300">: </span>
                <span className="text-green-400">"Zaimplementuj quicksort"</span>
                <span className="text-gray-300">,</span>
                {'\n'}
                <span className="text-red-400">  difficulty</span>
                <span className="text-gray-300">: </span>
                <span className="text-green-400">"intermediate"</span>
                {'\n'}
                <span className="text-gray-300">{'};'}</span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}; 