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
    <div className="min-h-screen bg-gradient-to-b from-dark via-dark-medium to-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-dark opacity-90" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-js rounded-full blur-[150px] opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-js rounded-full blur-[150px] opacity-20" />
        
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f7df1e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-block"
          >
            <GiTakeMyMoney className="text-[150px] text-js" />
          </motion.div>
          
          <motion.h1 
            className="text-7xl font-bold text-js mb-4"
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
              className="bg-dark/50 backdrop-blur-lg rounded-xl p-6 border border-js/20"
            >
              <h2 className="text-xl text-js mb-4 flex items-center gap-2">
                <FaGamepad className="text-js" />
                Zagraj w mini-grę JavaScript!
              </h2>
              <p className="text-gray-400 mb-4">
                Rozwiąż zadania JavaScript i zdobądź punkty. Może nawet pobijesz swój rekord?
              </p>
              {score > 0 && (
                <p className="text-lg text-js font-bold mb-4">
                  Twój ostatni wynik: {score} pkt
                </p>
              )}
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowGame(true)}
                  className="px-6 py-3 rounded-lg bg-js text-dark font-bold flex items-center gap-2 
                           hover:bg-js/90 transition-all"
                >
                  <FaGamepad />
                  {score > 0 ? 'Zagraj ponownie' : 'Rozpocznij grę'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  className="px-6 py-3 rounded-lg border border-js/20 text-js font-bold flex items-center gap-2 
                           hover:bg-js/10 transition-all"
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