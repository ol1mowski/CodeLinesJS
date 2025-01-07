import { motion } from "framer-motion";
import { memo, useState, useCallback } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

type JSQuestion = {
  id: number;
  question: string;
  code: string;
  options: string[];
  correctAnswer: number;
};

const questions: JSQuestion[] = [
  {
    id: 1,
    question: "Co zwróci poniższy kod?",
    code: "typeof typeof 42",
    options: ["'number'", "'string'", "'undefined'", "'object'"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Jaki będzie wynik?",
    code: "[1, 2, 3].map(num => num * 2)",
    options: ["[2, 4, 6]", "[1, 2, 3]", "undefined", "Error"],
    correctAnswer: 0
  },
];

type JSGameProps = {
  onComplete: (score: number) => void;
};

export const JSGame = memo(({ onComplete }: JSGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = useCallback((answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 100);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        onComplete(score + (correct ? 100 : 0));
      }
    }, 1500);
  }, [currentQuestion, onComplete, score]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-400">
            Pytanie {currentQuestion + 1}/{questions.length}
          </span>
          <span className="text-indigo-400 font-bold">
            Wynik: {score}
          </span>
        </div>
        <h3 className="text-xl text-white mb-4">
          {questions[currentQuestion].question}
        </h3>
        <pre className="bg-gray-900/50 p-4 rounded-lg mb-6 overflow-x-auto">
          <code className="text-indigo-300 font-mono">
            {questions[currentQuestion].code}
          </code>
        </pre>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {questions[currentQuestion].options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={selectedAnswer !== null}
            onClick={() => handleAnswer(index)}
            className={`
              p-4 rounded-lg text-left transition-all
              ${selectedAnswer === null 
                ? 'bg-gray-700/30 hover:bg-gray-700/50 text-white' 
                : selectedAnswer === index
                  ? isCorrect 
                    ? 'bg-green-500/20 border-2 border-green-500'
                    : 'bg-red-500/20 border-2 border-red-500'
                  : index === questions[currentQuestion].correctAnswer && !isCorrect
                    ? 'bg-green-500/20 border-2 border-green-500'
                    : 'bg-gray-700/30 opacity-50'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {selectedAnswer === index && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {isCorrect ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                </motion.span>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
});

JSGame.displayName = "JSGame"; 