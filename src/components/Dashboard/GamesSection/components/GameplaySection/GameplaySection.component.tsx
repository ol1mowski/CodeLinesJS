import React from "react";
import { memo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaQuestion, FaRedo } from "react-icons/fa";
import { Game } from "../../../../../types/games.types";
import { GameplayHeader } from "./GameplayHeader/GameplayHeader.component";
import { GameplayArea } from "./GameplayArea/GameplayArea.component";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal.component";
import { useGameplay } from "../../hooks/useGameplay";

type ModalType = "quit" | "restart" | null;

type GameplaySectionProps = {
  game: Game;
};

export const GameplaySection = memo(({ game }: GameplaySectionProps) => {
  const navigate = useNavigate();
  const { stats, controls, actions } = useGameplay();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const handleBackToMenu = () => {
    if (controls.isPaused) {
      navigate("/dashboard/play");
    } else {
      setActiveModal("quit");
    }
  };

  const handleRestart = () => {
    setActiveModal("restart");
  };

  const handleShowHelp = () => {
    actions.toggleHelp();
  };

  const handleConfirmQuit = () => {
    navigate("/dashboard/play");
  };

  const handleConfirmRestart = () => {
    actions.resetGame();
    setActiveModal(null);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-dark-800 flex items-center justify-center"
    >
      <div className="max-w-7xl w-full mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBackToMenu}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-js/10 text-js hover:bg-js/20 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span>Powrót do menu</span>
          </motion.button>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShowHelp}
              className="p-2 rounded-lg bg-js/10 text-js hover:bg-js/20 transition-colors"
              title="Pomoc"
            >
              <FaQuestion className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRestart}
              className="p-2 rounded-lg bg-js/10 text-js hover:bg-js/20 transition-colors"
              title="Restart gry"
            >
              <FaRedo className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <GameplayHeader
          title={game.title}
          isPaused={controls.isPaused}
          onPauseToggle={actions.togglePause}
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12">
            <GameplayArea />
          </div>
        </div>

        {(activeModal === "quit" || activeModal === "restart") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.15,
              ease: "easeInOut",
            }}
            className="fixed inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
                delay: 0.05,
              }}
              className="relative max-w-md w-full"
            >
              {activeModal === "quit" && (
                <ConfirmationModal
                  title="Opuść grę"
                  message="Czy na pewno chcesz opuścić grę? Twój postęp zostanie utracony."
                  confirmText="Opuść grę"
                  cancelText="Kontynuuj grę"
                  onConfirm={handleConfirmQuit}
                  onCancel={handleCloseModal}
                />
              )}

              {activeModal === "restart" && (
                <ConfirmationModal
                  title="Restart gry"
                  message="Czy na pewno chcesz zrestartować grę? Twój postęp zostanie utracony."
                  confirmText="Restart"
                  cancelText="Anuluj"
                  onConfirm={handleConfirmRestart}
                  onCancel={handleCloseModal}
                />
              )}
            </motion.div>
          </motion.div>
        )}

        {controls.isHelpVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.15,
              ease: "easeInOut",
            }}
            className="fixed inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
                delay: 0.05,
              }}
              className="bg-dark-900 border border-js/10 rounded-xl p-6 max-w-2xl w-full shadow-2xl"
            >
              <div className="relative">
                <h2 className="text-2xl font-bold text-js mb-4">Jak grać?</h2>
                <div className="prose prose-invert">
                  <p className="text-gray-300">{game.description}</p>
                  <h3 className="text-lg font-semibold text-js mt-4 mb-2">
                    Sterowanie:
                  </h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>Spacja - Pauza</li>
                    <li>R - Restart gry</li>
                    <li>ESC - Powrót do menu</li>
                    <li>H - Pokaż/ukryj pomoc</li>
                  </ul>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleShowHelp}
                  className="mt-6 w-full px-4 py-2 rounded-lg bg-js text-dark font-medium hover:bg-js/90 transition-colors"
                >
                  Zamknij
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});

GameplaySection.displayName = "GameplaySection";
