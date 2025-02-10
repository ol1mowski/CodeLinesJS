import { memo, useCallback, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Editor, { loader } from "@monaco-editor/react";
import { FaHistory, FaSpinner, FaDownload } from "react-icons/fa";
import { ConsoleOutput } from "./components/ConsoleOutput.component";
import { CodeHistory } from "./components/CodeHistory.component";
import { useCodeExecution } from "./hooks/useCodeExecution";
import { useCodeHistory } from "./hooks/useCodeHistory";
import { useEditorConfig } from "./hooks/useEditorConfig";
import { defaultCode } from "./constants";
import { useFileOperations } from "./hooks/useFileOperations";


loader.init().then(monaco => {
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });
});

export const CodeEditor = memo(() => {
  const editorRef = useRef<any>(null);
  const { output, isExecuting, executeCode, clearConsole } = useCodeExecution();
  const { history, addToHistory, clearHistory } = useCodeHistory();
  const { editorOptions, setupEditor } = useEditorConfig();
  const [code, setCode] = useState(defaultCode);
  const [showHistory, setShowHistory] = useState(false);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const { saveToFile } = useFileOperations();

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    setIsEditorReady(true);
  };

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (value) setCode(value);
  }, []);

  const handleRunCode = useCallback(async () => {
    await executeCode(code);
    addToHistory(code);
  }, [code, executeCode, addToHistory]);


  const handleHistorySelect = useCallback((selectedCode: string) => {
    setCode(selectedCode);
    setShowHistory(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        handleRunCode();
      } else if (e.altKey && e.shiftKey && e.key === 'F') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRunCode]);

  useEffect(() => {
    loader.init().then(monaco => {
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });
      setupEditor(monaco);
    });
  }, [setupEditor]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold font-space text-js">
          Edytor Kodu JavaScript
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => saveToFile(code)}
            disabled={!isEditorReady}
            className="px-4 py-2 text-sm text-js border border-js/20 rounded hover:bg-js/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaDownload className="w-4 h-4 mr-2 inline-block" />
            Zapisz do Pliku
          </button>
          <div className="relative">
            <button
              onClick={() => setShowHistory(prev => !prev)}
              className="p-2 text-gray-400 hover:text-js transition-colors"
              title="Historia kodu"
            >
              <FaHistory className="w-5 h-5" />
            </button>
            {showHistory && (
              <CodeHistory
                history={history}
                onSelect={handleHistorySelect}
                onClear={clearHistory}
              />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
        <div className="bg-dark/50 rounded-lg p-4 border border-js/10">
          <h2 className="text-xl font-bold text-js mb-4">Edytor</h2>
          <div className="h-[calc(100%-4rem)] rounded overflow-hidden relative">
            {!isEditorReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-dark/50">
                <FaSpinner className="w-8 h-8 text-js animate-spin" />
              </div>
            )}
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              options={editorOptions}
            />
          </div>
        </div>

        <div className="bg-dark/50 rounded-lg p-4 border border-js/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-js">Konsola</h2>
            <button 
              onClick={handleRunCode}
              disabled={isExecuting}
              className="px-4 py-2 bg-js text-dark font-medium rounded hover:bg-js/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isExecuting ? 'Wykonywanie...' : 'Uruchom (Ctrl + Enter)'}
            </button>
          </div>
          <ConsoleOutput 
            output={output}
            onClear={clearConsole}
            isExecuting={isExecuting}
          />
        </div>
      </div>
    </motion.div>
  );
});

CodeEditor.displayName = "CodeEditor"; 