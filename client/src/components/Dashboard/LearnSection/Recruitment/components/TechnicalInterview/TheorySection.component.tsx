import { memo } from 'react';
import { motion } from 'framer-motion';
import { useTheorySection } from './hooks/useTheorySection.hook';
import { useTest } from './hooks/useTest.hook';
import { BackButton } from './components/BackButton.component';
import { TheoryHeader } from './components/TheoryHeader.component';
import { QuestionSelector } from './components/QuestionSelector.component';
import { TestInfoSection } from './components/TestInfoSection.component';
import { StartButton } from './components/StartButton.component';
import { TestScreen } from './components/TestScreen.component';
import { ResultsScreen } from './components/ResultsScreen.component';

type TheorySectionProps = {
  onBack: () => void;
};

export const TheorySection = memo(({ onBack }: TheorySectionProps) => {
  const {
    selectedCount,
    questionOptions,
    testInfo,
    cardVariants,
    handleQuestionCountChange,
  } = useTheorySection();

  const {
    testState,
    questions,
    currentQuestionIndex,
    selectedAnswer,
    answers,
    loading,
    error,
    startTest,
    selectAnswer,
    nextQuestion,
    resetTest,
    restartTest,
    goBackToSetup,
    setSelectedQuestionCount,
    getTotalTime
  } = useTest();

  const handleStart = async () => {
    await startTest(selectedCount);
  };

  const handleBackFromTest = () => {
    goBackToSetup();
  };

  const handleBackToMain = () => {
    resetTest();
    onBack();
  };

  if (testState === 'inProgress') {
    return (
      <TestScreen
        questions={questions}
        currentQuestionIndex={currentQuestionIndex}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={selectAnswer}
        onNext={nextQuestion}
        onBack={handleBackFromTest}
        totalQuestions={questions.length}
      />
    );
  }

  if (testState === 'completed') {
    return (
      <ResultsScreen
        questions={questions}
        answers={answers}
        onRestart={restartTest}
        onBack={handleBackFromTest}
        totalTime={getTotalTime()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-dark/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-2xl w-full space-y-8"
      >
        <div className="flex items-center justify-between">
          <BackButton onBack={handleBackToMain} />
        </div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-dark-700/50 border border-js/10 rounded-2xl p-8 text-center space-y-8"
        >
          <TheoryHeader />

          <QuestionSelector
            options={questionOptions}
            selectedCount={selectedCount}
            onSelectionChange={(count) => {
              setSelectedQuestionCount(count);
              handleQuestionCountChange(count);
            }}
          />

          <TestInfoSection details={testInfo.details} />

          <StartButton questionCount={selectedCount} onStart={handleStart} loading={loading} />
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-center"
            >
              {error}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center text-gray-400 text-sm"
        >
          Tematy: {testInfo.topics}
        </motion.div>
      </motion.div>
    </div>
  );
});

TheorySection.displayName = 'TheorySection'; 