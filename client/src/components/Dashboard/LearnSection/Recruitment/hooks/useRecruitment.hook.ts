import { useMemo } from 'react';
import { FaLaptopCode, FaFileAlt } from 'react-icons/fa';

export type RecruitmentSection = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
};

export type RecruitmentStats = {
  technicalQuestions: number;
  practicalTasks: number;
  cvTips: number;
};

export const useRecruitment = () => {
  const recruitmentSections: RecruitmentSection[] = useMemo(
    () => [
      {
        id: 'technical-interview',
        title: 'Przygotowanie do rozmowy technicznej',
        description: 'Naucz się odpowiadać na pytania techniczne i rozwiązywać zadania programistyczne na żywo',
        icon: FaLaptopCode,
        features: [
          'Typowe pytania JavaScript',
          'Zadania algorytmiczne',
          'Code review na żywo',
          'Whiteboarding',
        ],
      },
      {
        id: 'cv-preparation',
        title: 'Przygotowanie CV',
        description: 'Stwórz profesjonalne CV, które przyciągnie uwagę rekruterów i wyróżni Cię na rynku',
        icon: FaFileAlt,
        features: [
          'Szablony CV dla programistów',
          'Opis projektów i umiejętności',
          'Portfolio prezentacja',
          'LinkedIn optimization',
        ],
      },
    ],
    []
  );

  const stats: RecruitmentStats = useMemo(
    () => ({
      technicalQuestions: 100,
      practicalTasks: 10,
      cvTips: 10,
    }),
    []
  );

  const containerVariants = useMemo(
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

  const itemVariants = useMemo(
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
    recruitmentSections,
    stats,
    containerVariants,
    itemVariants,
  };
}; 