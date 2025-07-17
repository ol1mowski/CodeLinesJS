import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { ITheoryQuestion } from '../../../api/theoryQuestions.api';
import { Answer } from '../../../hooks/useResultsScreen.hook';

interface DetailedAnswersProps {
  questions: ITheoryQuestion[];
  answers: Answer[];
}

export const DetailedAnswers: React.FC<DetailedAnswersProps> = memo(({
  questions,
  answers
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-dark-800/50 backdrop-blur-sm border border-js/10 rounded-2xl p-6 mb-8"
    >
      <h3 className="text-white text-lg font-bold mb-6">Szczegółowe odpowiedzi</h3>
      <div className="space-y-4">
        {questions.map((question, index) => {
          const answer = answers[index];
          const isCorrect = answer?.isCorrect;
          
          return (
            <div key={question._id} className="border border-js/10 rounded-xl p-4"> 
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isCorrect ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {isCorrect ? (
                    <FaCheck className="text-white text-xs" />
                  ) : (
                    <FaTimes className="text-white text-xs" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-gray-400 text-sm mb-1">{question.category}</div>
                  <div className="text-white font-medium mb-2">{question.question}</div>
                  
                  <div className="space-y-2">
                    <div className={`text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      Twoja odpowiedź: {question.options[answer?.selectedAnswer || 0]}
                    </div>
                    
                    <div className="text-green-400 text-sm">
                      Poprawna odpowiedź: {question.options[answer?.correctAnswer ?? question.correctAnswer]}
                    </div>
                    
                    <div className="text-gray-300 text-sm bg-dark-700/50 p-3 rounded-lg">
                      <strong>Wyjaśnienie:</strong> {answer?.explanation || question.explanation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
});

DetailedAnswers.displayName = 'DetailedAnswers'; 