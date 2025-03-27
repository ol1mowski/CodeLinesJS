import { memo } from "react";
import { motion } from "framer-motion";
import { QuestionHeader } from './components/QuestionHeader.component';
import { CodeBlock } from './components/CodeBlock.component';
import { AnswerOption } from './components/AnswerOption.component';
import { questions } from './constants/questions.data';
import { JSGameProps } from './types/types';
import { useGameLogic } from './hooks/useGameLogic.hook';

export const JSGame = memo(({ onComplete }: JSGameProps) => {
  const {
    currentQuestion,
    score,
    selectedAnswer,
    isCorrect,
    handleAnswer
  } = useGameLogic(onComplete);

  const currentQuestionData = questions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-dark/50 backdrop-blur-lg rounded-xl p-6 border border-js/20"
    >
      <div className="mb-6">
        <QuestionHeader 
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          score={score}
        />
        <h3 className="text-xl text-js mb-4">
          {currentQuestionData.question}
        </h3>
        <CodeBlock code={currentQuestionData.code} />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {currentQuestionData.options.map((option, index) => (
          <AnswerOption
            key={index}
            option={option}
            index={index}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
            correctAnswer={currentQuestionData.correctAnswer}
            onSelect={handleAnswer}
          />
        ))}
      </div>
    </motion.div>
  );
});

JSGame.displayName = "JSGame"; 