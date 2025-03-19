import { memo, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameStats } from '../../../../types/jsTypoHunter.types';
import { JSTypoHunterStats } from './JSTypoHunterStats/JSTypoHunterStats.component';
import { JSTypoHunterGame } from './JSTypoHunterGame/JSTypoHunterGame.component';
import { useGameTimer } from './hooks/useGameTimer';
import { GameIntro } from '../GameIntro/GameIntro.component';
import { JSTypoHunterSummary } from './JSTypoHunterSummary/JSTypoHunterSummary.component';
import { GameContent } from '../../../../types/games.type';
import { Helmet } from 'react-helmet';
import { useAICodeGenerator, AIGeneratedChallenge } from './hooks/useAICodeGenerator';

const getDifficultyPoints = (difficulty: 'easy' | 'medium' | 'hard'): number => {
  switch (difficulty) {
    case 'easy':
      return 10;
    case 'medium':
      return 20;
    case 'hard':
      return 30;
    default:
      return 10;
  }
};

const mapAIChallengeToChallengeFormat = (aiChallenge: AIGeneratedChallenge, index: number) => {
  return {
    id: index + 1,
    code: aiChallenge.code,
    error: aiChallenge.errors[0]?.lineContent || '',
    correct: aiChallenge.errors[0]?.correction || '',
    hint: aiChallenge.errors[0]?.explanation || '',
    explanation: aiChallenge.description,
    category: 'syntax' as const,
    difficulty: aiChallenge.difficulty
  };
};

const JSTypoHunter = memo(({ isPaused = false }: { isPaused?: boolean }) => {
  const { generateChallenge, progress } = useAICodeGenerator();
  const [challenges, setChallenges] = useState<AIGeneratedChallenge[]>([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [gameStats, setGameStats] = useState<GameStats>({
    currentLevel: 1,
    totalLevels: 0,
    score: 0,
    timeElapsed: 0,
    maxTime: 300,
    correctAnswers: 0
  });

  const [isGameOver, setIsGameOver] = useState(false);

  const { timeElapsed, resetTimer, startTimer, stopTimer } = useGameTimer({
    maxTime: gameStats.maxTime,
    onTimeEnd: () => {
      setIsGameOver(true);
      stopTimer();
    },
    isPaused,
  });

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        setIsInitializing(true);
        
        const generatedChallenges = [];
        
        generatedChallenges.push(await generateChallenge('easy'));
        
        generatedChallenges.push(await generateChallenge('medium'));
        generatedChallenges.push(await generateChallenge('medium'));
        
        generatedChallenges.push(await generateChallenge('hard'));
        generatedChallenges.push(await generateChallenge('hard'));
        
        setChallenges(generatedChallenges);
        setGameStats(prev => ({
          ...prev,
          totalLevels: generatedChallenges.length
        }));
      } catch (error) {
        console.error("Nie udało się wygenerować wyzwań:", error);
      } finally {
        setIsInitializing(false);
      }
    };

    loadChallenges();
  }, [generateChallenge]);

  const handleScoreUpdate = useCallback((points: number) => {
    const currentChallenge = challenges[gameStats.currentLevel - 1];
    const difficultyPoints = getDifficultyPoints(currentChallenge?.difficulty || 'easy');
    const totalPoints = points + difficultyPoints;

    setGameStats(prev => ({
      ...prev,
      score: prev.score + totalPoints,
      correctAnswers: prev.correctAnswers + 1
    }));
  }, [gameStats.currentLevel, challenges]);

  const handleIncorrectAnswer = useCallback(() => {
    setIsGameOver(true);
    stopTimer();
  }, [stopTimer]);

  const handleLevelComplete = useCallback(() => {
    setTimeout(() => {
      const nextLevel = gameStats.currentLevel + 1;
      if (nextLevel > challenges.length) {
        setIsGameOver(true);
        stopTimer();
      } else {
        setGameStats(prev => ({
          ...prev,
          currentLevel: nextLevel
        }));
      }
    }, 1000);
  }, [gameStats.currentLevel, challenges.length, stopTimer]);

  const handleRestart = useCallback(async () => {
    try {
      setIsInitializing(true);
      
      const generatedChallenges = [];
      
      generatedChallenges.push(await generateChallenge('easy'));
      
      generatedChallenges.push(await generateChallenge('medium'));
      generatedChallenges.push(await generateChallenge('medium'));
      
      generatedChallenges.push(await generateChallenge('hard'));
      generatedChallenges.push(await generateChallenge('hard'));
      
      setChallenges(generatedChallenges);
      
      setGameStats({
        currentLevel: 1,
        totalLevels: generatedChallenges.length,
        score: 0,
        timeElapsed: 0,
        maxTime: 300,
        correctAnswers: 0
      });
      
      setIsGameOver(false);
      resetTimer();
      startTimer();
    } catch (error) {
      console.error("Nie udało się wygenerować nowych wyzwań:", error);
    } finally {
      setIsInitializing(false);
    }
  }, [resetTimer, startTimer, generateChallenge]);

  const handleStartGame = () => {
    setIsGameStarted(true);
    startTimer();
  };

  useEffect(() => {
    setGameStats(prev => ({
      ...prev,
      timeElapsed
    }));
  }, [timeElapsed]);

  const gameInfo: GameContent = {
    title: "JSTypoHunter",
    description: "Znajdź i popraw błędy w kodzie JavaScript. Wyzwania są generowane losowo!",
    difficulty: 'medium',
    rating: {
      average: 4.5,
      count: 120,
      total: 540
    },
    completions: {
      count: 80,
      users: []
    },
    rewardPoints: 100,
    gameData: challenges,
    estimatedTime: 15,
    isCompleted: false
  };

  if (isInitializing) return <div className="w-full h-64 flex items-center justify-center">
    <div className="text-center">
      <div className="text-xl font-medium text-gray-100 mb-2">Generowanie wyzwań...</div>
      <div className="w-64 h-3 bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-js transition-all duration-300 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-sm text-gray-400 mt-2">Tworzenie unikalnych zadań</div>
    </div>
  </div>;

  if (!isGameStarted) {
    return <GameIntro gameContent={gameInfo} onStart={handleStartGame} />;
  }

  const currentFormattedChallenge = challenges[gameStats.currentLevel - 1] 
    ? mapAIChallengeToChallengeFormat(challenges[gameStats.currentLevel - 1], gameStats.currentLevel - 1)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full space-y-6"
    >
      <Helmet>
        <title>JSTypoHunter | CodeLinesJS</title>
        <meta name="description" content="JSTypoHunter CodeLinesJS - dołącz do nas i rozwijaj swoje umiejętności w przyjaznym środowisku." />
      </Helmet>
      <JSTypoHunterStats stats={gameStats} />
      <AnimatePresence mode="wait">
        {isGameOver ? (
          <JSTypoHunterSummary
            key="game-over"
            score={gameStats.score}
            timeElapsed={timeElapsed}
            correctAnswers={gameStats.correctAnswers}
            totalLevels={challenges.length}
            onRestart={handleRestart}
          />
        ) : (
          <motion.div
            key={`level-${gameStats.currentLevel}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {currentFormattedChallenge && (
              <JSTypoHunterGame 
                currentChallenge={currentFormattedChallenge}
                onScoreUpdate={handleScoreUpdate}
                onLevelComplete={handleLevelComplete}
                onIncorrectAnswer={handleIncorrectAnswer}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

JSTypoHunter.displayName = 'JSTypoHunter';

export default JSTypoHunter;
