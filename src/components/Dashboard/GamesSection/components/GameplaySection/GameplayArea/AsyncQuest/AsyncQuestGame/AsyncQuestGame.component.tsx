import React, { memo, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import { AsyncChallenge } from "../../../../../types/asyncQuest.types";
import { AsyncQuestProgress } from "../AsyncQuestProgress/AsyncQuestProgress.component";
import { useCodeExecution } from "../hooks/useCodeExecution";
import { validateAsyncCode } from "../utils/codeValidation";
import { AsyncQuestHint } from "../AsyncQuestHint/AsyncQuestHint.component";
import { getErrorHint } from "../utils/errorHints";

type AsyncQuestGameProps = {
  currentChallenge: AsyncChallenge;
  onScoreUpdate: (
    points: number,
    category: "promises" | "async-await" | "callbacks"
  ) => void;
  onLevelComplete: () => void;
  currentLevel: number;
  totalLevels: number;
  onGameOver: () => void;
};

export const AsyncQuestGame = memo(
  ({
    currentChallenge,
    onScoreUpdate,
    onLevelComplete,
    currentLevel,
    totalLevels,
    onGameOver
  }: AsyncQuestGameProps) => {
    const [code, setCode] = useState(currentChallenge.code);
    const [showExplanation, setShowExplanation] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showHint, setShowHint] = useState(false);
    const [errorHint, setErrorHint] = useState<{
      message: string;
      explanation: string;
      example?: string;
    } | null>(null);
    const [isEditorReady, setIsEditorReady] = useState(false);
    const editorRef = useRef<any>(null);

    const { executeCode, isRunning, output, clearOutput } = useCodeExecution();

    const handleEditorDidMount = (editor: any) => {
      editorRef.current = editor;
      setIsEditorReady(true);
    };

    const handleEditorChange = useCallback((value: string | undefined) => {
      if (value !== undefined) {
        setCode(value);
        setIsCorrect(null);
        setErrorHint(null);
        clearOutput();
      }
    }, [clearOutput]);

    const handleCodeRun = useCallback(async () => {
      if (!code) return;

      setShowExplanation(false);
      clearOutput();
      setErrorHint(null);

      try {
        const validationResult = await validateAsyncCode(code, currentChallenge.correct);
        const executionResult = await executeCode(code);

        if (validationResult && executionResult.success) {
          setIsCorrect(true);
          setShowExplanation(true);
          onScoreUpdate(currentChallenge.points, currentChallenge.category);
          
          setTimeout(() => {
            onLevelComplete();
          }, 1500);
        } else {
          setIsCorrect(false);
          setShowExplanation(true);
          const hint = getErrorHint(code, currentChallenge.category);
          setErrorHint(hint);
          
          setTimeout(() => {
            onGameOver();
          }, 2000);
        }
      } catch (error) {
        setIsCorrect(false);
        setShowExplanation(true);
        const hint = getErrorHint(code, currentChallenge.category);
        setErrorHint(hint);
        
        setTimeout(() => {
          onGameOver();
        }, 2000);
      }
    }, [code, currentChallenge, executeCode, onScoreUpdate, onLevelComplete, onGameOver, clearOutput]);

    const editorOptions = {
      minimap: { enabled: false },
      fontSize: 14,
      lineHeight: 24,
      fontFamily: "JetBrains Mono, monospace",
      fontLigatures: true,
      wordWrap: "on" as const,
      automaticLayout: true,
      padding: { top: 16, bottom: 16 },
      scrollBeyondLastLine: false,
      folding: true,
      lineNumbers: "on" as const,
      renderLineHighlight: "all" as const,
      suggestOnTriggerCharacters: true,
      parameterHints: { enabled: true },
      tabSize: 2,
      theme: "vs-dark",
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 p-4"
      >
        <AsyncQuestProgress
          currentLevel={currentLevel}
          totalLevels={totalLevels}
          difficulty={currentChallenge.difficulty}
          points={currentChallenge.points}
        />

        <div className="bg-dark-800/50 rounded-xl p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-js">
                {currentChallenge.title}
              </h2>
              <span className={`px-3 py-1 rounded-lg text-sm ${
                currentChallenge.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                currentChallenge.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {currentChallenge.difficulty === 'easy' ? 'Łatwy' :
                 currentChallenge.difficulty === 'medium' ? 'Średni' : 
                 'Trudny'}
              </span>
            </div>
            
            <div className="bg-dark-900/50 rounded-lg p-4 space-y-3">
              <p className="text-gray-300">{currentChallenge.description}</p>
              <div className="text-sm text-gray-400">
                <strong className="text-js">Zadanie:</strong> {currentChallenge.task}
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden border border-js/10">
              <Editor
                height="300px"
                defaultLanguage="javascript"
                value={code}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                options={editorOptions}
                className="w-full"
              />
            </div>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <AsyncQuestHint
                  type={isCorrect ? "hint" : "error"}
                  message={
                    isCorrect
                      ? "Świetnie! Rozwiązanie jest poprawne."
                      : currentChallenge.error
                  }
                  explanation={isCorrect ? undefined : errorHint?.explanation}
                  code={isCorrect ? undefined : errorHint?.example}
                />
              </motion.div>
            )}
          </div>
        </div>

        <button
          onClick={handleCodeRun}
          disabled={isRunning || !isEditorReady}
          className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${
            isRunning || !isEditorReady
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-js text-dark hover:bg-js/90"
          }`}
        >
          {isRunning ? "Wykonywanie..." : "Uruchom kod"}
        </button>

        {showHint && !isCorrect && errorHint && (
          <AsyncQuestHint
            type="hint"
            message={errorHint.message}
            code={errorHint.example}
            explanation={errorHint.explanation}
          />
        )}

        {output.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-900/50 rounded-lg p-4 font-mono text-sm"
          >
            <div className="text-gray-400 mb-2">Konsola:</div>
            {output.map((line, index) => (
              <div key={index} className="text-gray-300">
                {line}
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>
    );
  }
);

AsyncQuestGame.displayName = "AsyncQuestGame";
