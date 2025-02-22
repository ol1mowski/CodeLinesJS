import { memo, useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaTimes, FaTrophy, FaStar, FaMedal } from "react-icons/fa";
import type { QuizQuestion } from "../../types/lesson.types";

type QuizBadge = {
  icon: typeof FaMedal;
  label: string;
  color: string;
};

const quizBadges: Record<string, QuizBadge> = {
  perfect: {
    icon: FaTrophy,
    label: "Perfekcyjnie!",
    color: "text-yellow-500"
  },
  excellent: {
    icon: FaMedal,
    label: "Świetnie!",
    color: "text-js"
  },
  good: {
    icon: FaStar,
    label: "Mogło być lepiej!",
    color: "text-blue-500"
  }
};

const getQuizBadge = (percentage: number): QuizBadge => {
  if (percentage === 100) return quizBadges.perfect;
  if (percentage >= 80) return quizBadges.excellent;
  return quizBadges.good;
};

type LessonQuizProps = {
  questions: QuizQuestion[];
  onComplete: (correct: number, total: number) => void;
}

type QuizSummaryProps = {
  correctAnswers: number;
  totalQuestions: number;
  earnedXP: number;
}

const QuizSummary = memo(({ correctAnswers, totalQuestions }: QuizSummaryProps) => {
  const percentage = (correctAnswers / totalQuestions) * 100;
  const badge = getQuizBadge(percentage);
  const BadgeIcon = badge.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-800/50 border border-js/10 rounded-lg p-6 text-center"
    >
      <div className="flex justify-center mb-4">
        <div className="relative">
          <BadgeIcon className={`w-12 h-12 ${badge.color}`} />
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -right-2 -bottom-2"
          >
            <FaStar className="w-6 h-6 text-yellow-500 animate-pulse" />
          </motion.div>
        </div>
      </div>
      
      <h3 className={`text-xl font-bold ${badge.color} mb-2`}>
        {badge.label}
      </h3>
      
      <p className="text-gray-400 mb-4">
        Poprawne odpowiedzi: {correctAnswers} z {totalQuestions}
      </p>
      
      <div className="space-y-4">

        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          className="h-2 bg-dark rounded-full overflow-hidden mx-auto"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            className={`h-full ${percentage === 100 ? 'bg-yellow-500' : 'bg-js'}`}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>
        
        <p className="text-sm text-gray-400">
          {Math.round(percentage)}% poprawnych odpowiedzi
        </p>
      </div>
    </motion.div>
  );
});

export const LessonQuiz = memo(({ questions, onComplete }: LessonQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const totalXP = 100; 
  const progressPercent = ((currentQuestion) / questions.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      onComplete(correctAnswers, questions.length);
      setIsCompleted(true);
    }
  };

  if (isCompleted) {
    return (
      <QuizSummary 
        correctAnswers={correctAnswers}
        totalQuestions={questions.length}
        earnedXP={Math.round((correctAnswers / questions.length) * totalXP)}
      />
    );
  }

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            Pytanie {currentQuestion + 1} z {questions.length}
          </span>
          <span className="text-js">•</span>
        </div>
        <div className="text-sm text-gray-400">
          {Math.round(progressPercent)}% ukończone
        </div>
      </div>

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-dark-800/50 border border-js/10 rounded-lg text-gray-400 text-sm"
        >
          {questions[currentQuestion].explanation}
        </motion.div>
      )}

      {selectedAnswer !== null && (
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


      <div className="text-lg font-medium text-gray-200">
        {questions[currentQuestion].question}
      </div>

      <div className="space-y-3">
        {questions[currentQuestion].options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={selectedAnswer !== null}
            onClick={() => handleAnswer(index)}
            className={`w-full p-4 rounded-lg border text-left transition-colors
              ${selectedAnswer === null 
                ? 'border-js/10 hover:border-js/20' 
                : index === questions[currentQuestion].correctAnswer
                  ? 'border-green-500 bg-green-500/10 text-green-400'
                  : selectedAnswer === index
                    ? 'border-red-500 bg-red-500/10 text-red-400'
                    : 'border-js/10 opacity-50'
              }`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {selectedAnswer !== null && (
                index === questions[currentQuestion].correctAnswer 
                  ? <FaCheck className="w-4 h-4 text-green-400" />
                  : selectedAnswer === index 
                    ? <FaTimes className="w-4 h-4 text-red-400" />
                    : null
              )}
            </div>
          </motion.button>
        ))}
      </div>

      
    </div>
  );
});

LessonQuiz.displayName = "LessonQuiz";
QuizSummary.displayName = "QuizSummary"; 