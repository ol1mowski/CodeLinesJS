import { memo, useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { AsyncChallenge } from '../../../../../types/asyncQuest.types';
import { AsyncQuestProgress } from '../AsyncQuestProgress/AsyncQuestProgress.component';
import { useCodeExecution } from '../hooks/useCodeExecution';
import { validateAsyncCode } from '../utils/codeValidation';
import { AsyncQuestHint } from '../AsyncQuestHint/AsyncQuestHint.component';
import { getErrorHint } from '../utils/errorHints';

type AsyncQuestGameProps = {
  currentChallenge: AsyncChallenge;
  onScoreUpdate: (points: number, category: 'promises' | 'async-await' | 'callbacks') => void;
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
    onGameOver,
  }: AsyncQuestGameProps) => {
    const [code, setCode] = useState(currentChallenge.code);
    const [showExplanation, setShowExplanation] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [errorHint, setErrorHint] = useState<{
      message: string;
      explanation: string;
      example?: string;
    } | null>(null);
    const [isEditorReady, setIsEditorReady] = useState(false);
    const editorRef = useRef<any>(null);
    const editorContainerRef = useRef<HTMLDivElement>(null);
    const feedbackRef = useRef<HTMLDivElement>(null);

    const { executeCode, isRunning, clearOutput } = useCodeExecution();

    useEffect(() => {
      if (editorContainerRef.current) {
        editorContainerRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, []);

    const handleEditorDidMount = (editor: any) => {
      editorRef.current = editor;
      setIsEditorReady(true);
      setTimeout(() => {
        editor.focus();
      }, 100);
    };

    const handleEditorChange = useCallback(
      (value: string | undefined) => {
        if (value !== undefined) {
          setCode(value);
          setIsCorrect(null);
          setErrorHint(null);
          clearOutput();
        }
      },
      [clearOutput]
    );

    const scrollToFeedback = useCallback(() => {
      if (feedbackRef.current) {
        feedbackRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, []);

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
            scrollToFeedback();
          }, 100);

          setTimeout(() => {
            onLevelComplete();
          }, 1500);
        } else {
          setIsCorrect(false);
          setShowExplanation(true);
          const hint = getErrorHint(code, currentChallenge.category);
          setErrorHint(hint);

          setTimeout(() => {
            scrollToFeedback();
          }, 100);

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
          scrollToFeedback();
        }, 100);

        setTimeout(() => {
          onGameOver();
        }, 2000);
      }
    }, [
      code,
      currentChallenge,
      executeCode,
      onScoreUpdate,
      onLevelComplete,
      onGameOver,
      clearOutput,
      scrollToFeedback,
    ]);

    const editorOptions = {
      minimap: { enabled: false },
      fontSize: 14,
      lineHeight: 24,
      fontFamily: 'JetBrains Mono, monospace',
      fontLigatures: true,
      wordWrap: 'on' as const,
      automaticLayout: true,
      padding: { top: 16, bottom: 16 },
      scrollBeyondLastLine: false,
      folding: true,
      lineNumbers: 'on' as const,
      renderLineHighlight: 'all' as const,
      suggestOnTriggerCharacters: true,
      parameterHints: { enabled: true },
      tabSize: 2,
      theme: 'vs-dark',
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto p-4 space-y-6"
      >
        <div className="bg-dark-800/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-js">{currentChallenge.title}</h2>
            <AsyncQuestProgress currentLevel={currentLevel} totalLevels={totalLevels} />
          </div>
          <div className="bg-dark-800/50 border border-js/10 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-js mb-3">Opis zadania</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {currentChallenge.description}
            </p>

            <div className="p-4 bg-dark-700/50 border border-js/20 rounded-lg">
              <h3 className="text-lg font-semibold text-js mb-2">Zadanie</h3>
              <p className="text-gray-300 text-base">{currentChallenge.task}</p>
            </div>
          </div>
        </div>

        <div ref={editorContainerRef} className="bg-dark-800/50 rounded-xl p-6">
          <div className="h-[500px] relative rounded-lg overflow-hidden border border-js/10">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              options={{
                ...editorOptions,
                fontSize: 16,
                lineHeight: 26,
              }}
              className="w-full"
            />
          </div>

          <button
            onClick={handleCodeRun}
            disabled={isRunning || !isEditorReady}
            className={`mt-4 w-full px-6 py-3 rounded-lg font-medium transition-colors ${
              isRunning || !isEditorReady
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-js text-dark hover:bg-js/90'
            }`}
          >
            {isRunning ? 'Wykonywanie...' : 'Uruchom kod'}
          </button>
        </div>

        {showExplanation && (
          <motion.div
            ref={feedbackRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-800/50 rounded-xl p-6"
          >
            <AsyncQuestHint
              type={isCorrect ? 'hint' : 'error'}
              message={isCorrect ? 'Świetnie! Rozwiązanie jest poprawne.' : currentChallenge.error}
              explanation={isCorrect ? undefined : errorHint?.explanation}
              code={isCorrect ? undefined : errorHint?.example}
            />
          </motion.div>
        )}
      </motion.div>
    );
  }
);

AsyncQuestGame.displayName = 'AsyncQuestGame';
