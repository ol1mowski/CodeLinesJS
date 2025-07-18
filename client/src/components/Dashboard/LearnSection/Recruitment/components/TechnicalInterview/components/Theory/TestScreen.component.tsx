import React, { memo } from 'react';
import { ITheoryQuestion } from '../../api/theoryQuestions.api';
import { useTestScreen } from '../../hooks/useTestScreen.hook';
import { TestHeader } from './test/TestHeader.component';
import { QuestionCard } from './test/QuestionCard.component';
import { TestActions } from './test/TestActions.component';


interface TestScreenProps {
  questions: ITheoryQuestion[];
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  onAnswerSelect: (answerIndex: number) => void;
  onNext: () => void | Promise<void>;
  onBack: () => void;
  totalQuestions: number;
}

export const TestScreen: React.FC<TestScreenProps> = memo(({
  questions,
  currentQuestionIndex,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onBack,
  totalQuestions
}) => {
  const { currentQuestion, progress, isLastQuestion, getOptionLetter } = useTestScreen(
    questions,
    currentQuestionIndex,
    totalQuestions
  );

  return (
    <div className="min-h-screen bg-dark/50 backdrop-blur-sm p-4 md:flex md:items-center md:justify-center">
      <div className="w-full md:max-w-4xl">
        <TestHeader
          onBack={onBack}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          progress={progress}
        />

        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={onAnswerSelect}
          currentQuestionIndex={currentQuestionIndex}
          getOptionLetter={getOptionLetter}
        />

        <TestActions
          onNext={onNext}
          selectedAnswer={selectedAnswer}
          isLastQuestion={isLastQuestion}
        />
      </div>
    </div>
  );
});

TestScreen.displayName = 'TestScreen'; 