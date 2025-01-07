import { motion } from "framer-motion";
import { memo, useState, useCallback } from "react";
import { FaHome, FaGamepad } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { JSGame } from "./JSGame/JSGame.component";


export const ErrorPage = memo(() => {
  const navigate = useNavigate();
  const [showGame, setShowGame] = useState(false);
  const [score, setScore] = useState(0);

  const handleGameComplete = useCallback((finalScore: number) => {
    setScore(finalScore);
    setShowGame(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-block"
          >
            <GiTakeMyMoney className="text-[150px] text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600" />
          </motion.div>
          
          <motion.h1 
            className="text-7xl font-bold font-space bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 mb-4"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            404
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-400 mb-8"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Ups! Wygląda na to, że zabłądziłeś w kodzie...
          </motion.p>
        </div>

        {!showGame ? (
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50"
            >
              <h2 className="text-xl font-space text-white mb-4 flex items-center gap-2">
                <FaGamepad className="text-indigo-400" />
                Zagraj w mini-grę JavaScript!
              </h2>
              <p className="text-gray-400 mb-4">
                Rozwiąż zadania JavaScript i zdobądź punkty. Może nawet pobijesz swój rekord?
              </p>
              {score > 0 && (
                <p className="text-lg text-indigo-400 font-bold mb-4">
                  Twój ostatni wynik: {score} pkt
                </p>
              )}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowGame(true)}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold flex items-center gap-2 hover:from-indigo-500 hover:to-blue-500 transition-all"
                >
                  <FaGamepad />
                  {score > 0 ? 'Zagraj ponownie' : 'Rozpocznij grę'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  className="px-6 py-3 rounded-lg border-2 border-gray-700 text-gray-400 font-bold flex items-center gap-2 hover:bg-gray-800/30 transition-all"
                >
                  <FaHome />
                  Wróć do strony głównej
                </motion.button>
              </div>
            </motion.div>
          </div>
        ) : (
          <JSGame onComplete={handleGameComplete} />
        )}
      </motion.div>
    </div>
  );
});

ErrorPage.displayName = "ErrorPage"; 