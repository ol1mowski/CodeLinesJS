import { useState, useMemo } from 'react';
import { questionOptions, testInfo } from '../data/theorySection.data';
import type { AnimationVariants } from '../../../types/recruitment.types';

export const useTheorySection = () => {
  const [selectedCount, setSelectedCount] = useState<number>(10);

  const containerVariants: AnimationVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    }),
    []
  );

  const cardVariants: AnimationVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: 'easeOut',
        },
      },
    }),
    []
  );

  const handleQuestionCountChange = (count: number) => {
    setSelectedCount(count);
  };

  return {
    selectedCount,
    questionOptions,
    testInfo,
    containerVariants,
    cardVariants,
    handleQuestionCountChange,
  };
}; 