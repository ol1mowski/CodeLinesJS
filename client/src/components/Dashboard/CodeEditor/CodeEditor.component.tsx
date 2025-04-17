import { memo, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHistory, FaDownload } from 'react-icons/fa';
import EditorComponent from './components/EditorComponent';
import ConsoleComponent from './components/ConsoleComponent';
import { useCodeExecution } from './hooks/useCodeExecution.hook';
import { useCodeHistory } from './hooks/useCodeHistory.hook';
import { useEditor } from './hooks/useEditor.hook';
import { defaultCode } from './constants';
import { useFileOperations } from './hooks/useFileOperations.hook';
import { CodeHistory } from './components/CodeHistory.component';
import { Helmet } from 'react-helmet';

export const CodeEditor = memo(() => {
  const { output, isExecuting, executeCode, clearConsole } = useCodeExecution();
  const { history, addToHistory, clearHistory } = useCodeHistory();
  const { code, isEditorReady, handleEditorDidMount, handleEditorChange } = useEditor(defaultCode);
  const { saveToFile } = useFileOperations();
  const [showHistory, setShowHistory] = useState(false);

  const handleHistorySelect = () => {
    setShowHistory(false);
  };

  const handleRunCode = useCallback(async () => {
    await executeCode(code);
    addToHistory(code);
  }, [code, executeCode, addToHistory]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full p-6">
      <Helmet>
        <title>Edytor Kodu | CodeLinesJS</title>
        <meta
          name="description"
          content="Edytor kodu JavaScript - dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku."
        />
      </Helmet>
      <div className="relative flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-space text-js">Edytor Kodu JavaScript</h1>
        <div className="flex items-center gap-4">
          <button
            data-testid="save-code-btn"
            onClick={() => saveToFile(code)}
            disabled={!isEditorReady}
            className="px-4 py-2 text-sm text-js border border-js/20 rounded hover:bg-js/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaDownload className="w-4 h-4 mr-2 inline-block" />
            Zapisz do Pliku
          </button>
          <button
            data-testid="history-btn"
            onClick={() => setShowHistory(prev => !prev)}
            className="p-2 text-gray-400 hover:text-js transition-colors"
            title="Historia kodu"
          >
            <FaHistory className="w-5 h-5" />
          </button>
          {showHistory && (
            <CodeHistory history={history} onSelect={handleHistorySelect} onClear={clearHistory} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
        <EditorComponent
          code={code}
          onChange={handleEditorChange}
          onMount={() => handleEditorDidMount(null)}
          isEditorReady={isEditorReady}
        />
        <ConsoleComponent
          output={output}
          isExecuting={isExecuting}
          onClear={clearConsole}
          onRun={handleRunCode}
        />
      </div>
    </motion.div>
  );
});

CodeEditor.displayName = 'CodeEditor';
