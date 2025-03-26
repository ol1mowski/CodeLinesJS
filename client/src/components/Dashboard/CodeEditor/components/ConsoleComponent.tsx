import { ConsoleOutput } from "./ConsoleOutput.component";

const ConsoleComponent = ({ output, isExecuting, onClear, onRun }: { output: string[]; isExecuting: boolean; onClear: () => void; onRun: () => void }) => (
  <div className="bg-dark/50 rounded-lg p-4 border border-js/10">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-js">Konsola</h2>
      <button 
        data-testid="run-code-btn"
        onClick={onRun}
        disabled={isExecuting}
        className="px-4 py-2 bg-js text-dark font-medium rounded hover:bg-js/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isExecuting ? 'Wykonywanie...' : 'Uruchom'}
      </button>
    </div>
    <ConsoleOutput output={output} onClear={onClear} isExecuting={isExecuting} />
  </div>
);

export default ConsoleComponent; 