import { useState } from 'react';
import { QuizHeader } from './components/QuizHeader.component';
import { QuizCode } from './components/QuizCode.component';
import { QuizAnswer } from './components/QuizAnswer.component';

import { QUIZ_DATA } from './QuizData.data';

export const CodeQuiz = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
  };

  const { title, subtitle, code, answers, correctAnswer } = QUIZ_DATA;

  return (
    <div className="flex flex-col">
      <QuizHeader 
        title={title}
        subtitle={subtitle}
      />
      <QuizCode code={code} />
      <div className="p-6 flex flex-col gap-4">
        {answers.map((answer, index) => (
          <QuizAnswer
            key={answer}
            answer={answer}
            isCorrect={selectedAnswer === correctAnswer && index === selectedAnswer}
            onClick={() => handleAnswerClick(index)}
          />
        ))}
      </div>
    </div>
  );
}; 