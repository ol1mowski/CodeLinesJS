import { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { JSGame } from "./JSGame/JSGame.component";
import { Background } from "./components/Background.component";
import { ErrorHeader } from "./components/ErrorHeader.component";
import { GameIntro } from "./components/GameIntro.component";

export const ErrorPage = memo(() => {
  const [showGame, setShowGame] = useState(false);
  const [score, setScore] = useState(0);

  const handleGameComplete = useCallback((finalScore: number) => {
    setScore(finalScore);
    setShowGame(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark via-dark-medium to-dark flex items-center justify-center p-4 relative overflow-hidden">
      <Background />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full relative z-10"
      >
        <ErrorHeader />
        {!showGame ? (
          <GameIntro score={score} onStartGame={() => setShowGame(true)} />
        ) : (
          <JSGame onComplete={handleGameComplete} />
        )}
      </motion.div>
    </div>
  );
});

ErrorPage.displayName = "ErrorPage"; 