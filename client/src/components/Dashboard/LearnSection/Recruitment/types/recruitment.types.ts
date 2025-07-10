import { IconType } from 'react-icons';

export type RecruitmentSection = {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  features: string[];
  isAvailable: boolean;
};

export type RecruitmentStats = {
  technicalQuestions: number;
  practicalTasks: number;
  cvTips: number;
};

export type ViewMode = 'main' | 'technical-interview' | 'cv-preparation';

export type TechnicalInterviewView = 'main' | 'theory' | 'practice';

export type InterviewBlock = {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  topics: string[];
};

export type InterviewTip = {
  category: string;
  tips: string[];
};

export type AnimationVariants = {
  hidden: {
    opacity: number;
    y?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    transition?: {
      duration?: number;
      ease?: string;
      staggerChildren?: number;
    };
  };
}; 