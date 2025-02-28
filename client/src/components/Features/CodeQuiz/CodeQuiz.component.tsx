import { useState, useCallback, memo } from 'react';
import { QuizHeader } from './components/QuizHeader.component';
import { QuizCode } from './components/QuizCode.component';
import { QuizAnswer } from './components/QuizAnswer.component';
import { QUIZ_DATA } from '../constants/QuizData.data';

export const CodeQuiz = memo(() => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerClick = useCallback((index: number) => {
    setSelectedAnswer(index);
  }, []);

  const { title, code, options, correctAnswer } = QUIZ_DATA;

  return (
    <div className="flex flex-col">
      <QuizHeader
        title={title}
        subtitle="Wybierz poprawną odpowiedź"
      />
      <QuizCode code={code} />
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {options.map((option) => (
            <QuizAnswer
              key={option.id}
              answer={option.text}
              isSelected={selectedAnswer === option.id}
              isCorrect={selectedAnswer === correctAnswer && option.id === selectedAnswer}
              onClick={() => handleAnswerClick(option.id)}
              disabled={selectedAnswer !== null}
            />

          ))}
        </div>
      </div>
    </div>
  );
});

CodeQuiz.displayName = 'CodeQuiz'; 