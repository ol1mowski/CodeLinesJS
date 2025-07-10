import { useMemo } from 'react';
import { interviewBlocks, interviewTips } from '../data/technicalInterview.data';
import type { AnimationVariants } from '../../../types/recruitment.types';

export const useTechnicalInterview = () => {
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

  const itemVariants: AnimationVariants = useMemo(
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

  return {
    interviewBlocks,
    interviewTips,
    containerVariants,
    itemVariants,
  };
}; 