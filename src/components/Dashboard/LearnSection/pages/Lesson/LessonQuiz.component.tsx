import { memo, useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaTimes } from "react-icons/fa";
import type { QuizQuestion } from "../../types/lesson.types";

type LessonQuizProps = {
  questions: QuizQuestion[];
  onComplete: () => void;
}

export const LessonQuiz = memo(({ questions, onComplete }: LessonQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    
    if (index === questions[currentQuestion].correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      onComplete();
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-sm text-gray-400">
        <span>Pytanie {currentQuestion + 1} z {questions.length}</span>
        <span>Poprawne odpowiedzi: {correctAnswers}</span>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-200">
          {question.question}
        </h3>

        <div className="space-y-2">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={showExplanation}
              onClick={() => handleAnswer(index)}
              className={`w-full p-4 rounded-lg text-left transition-colors
                ${showExplanation
                  ? index === question.correctAnswer
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : index === selectedAnswer
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : 'bg-dark-800/50 text-gray-400'
                  : selectedAnswer === index
                    ? 'bg-js/10 text-js border border-js/20'
                    : 'bg-dark-800/50 text-gray-400 hover:bg-js/5 hover:text-js/80'
                }`}
            >
              {option}
              {showExplanation && index === question.correctAnswer && (
                <FaCheck className="inline ml-2 w-4 h-4" />
              )}
              {showExplanation && index === selectedAnswer && index !== question.correctAnswer && (
                <FaTimes className="inline ml-2 w-4 h-4" />
              )}
            </motion.button>
          ))}
        </div>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-dark-800/50 rounded-lg border border-js/10"
          >
            <p className="text-gray-400 text-sm">
              {question.explanation}
            </p>
          </motion.div>
        )}

        {showExplanation && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="w-full py-3 bg-js/10 text-js rounded-lg hover:bg-js/20 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Następne pytanie' : 'Zakończ quiz'}
          </motion.button>
        )}
      </div>
    </div>
  );
});

LessonQuiz.displayName = "LessonQuiz"; 