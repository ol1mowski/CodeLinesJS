import { IconType } from 'react-icons';

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'classic' | 'creative' | 'technical';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  preview: string;
  tags: string[];
  rating: number;
  downloadCount: number;
  isPremium: boolean;
  features: string[];
}

export interface CVSection {
  id: string;
  name: string;
  description: string;
  isRequired: boolean;
  examples: string[];
  tips: string[];
}

export interface CVTip {
  id: string;
  title: string;
  description: string;
  category: CVTipCategory;
  importance: 'low' | 'medium' | 'high' | 'critical';
  icon: IconType;
  examples: {
    good: string[];
    bad: string[];
  };
}

export type CVTipCategory = 
  | 'personal-info'
  | 'experience'
  | 'skills'
  | 'education'
  | 'projects'
  | 'achievements'
  | 'design'
  | 'content';

export interface CVExample {
  id: string;
  title: string;
  description: string;
  type: 'full-cv' | 'section' | 'skill-description' | 'project-description';
  level: 'junior' | 'mid' | 'senior';
  field: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'devops';
  content: string;
  highlightPoints: string[];
}

export interface CVStats {
  totalTemplates: number;
  totalTips: number;
  totalExamples: number;
  userProgress: {
    sectionsCompleted: number;
    totalSections: number;
    lastUpdated: string;
  };
}

export interface CVBuilderData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  achievements: string[];
  languages: Language[];
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | 'current';
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  location: string;
  gpa?: string;
  honors?: string[];
  relevantCourses?: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  years?: number;
  projects?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  role: string;
  startDate: string;
  endDate: string | 'current';
  url?: string;
  github?: string;
  highlights: string[];
  challenges: string[];
}

export interface Language {
  id: string;
  name: string;
  level: 'basic' | 'conversational' | 'fluent' | 'native';
  certification?: string;
}

export type CVView = 'main' | 'content-tips' | 'technical-tips' | 'design-tips' | 'examples';

export interface CVPreparationSection {
  id: string;
  title: string;
  description: string;
  icon: IconType;
  stats: {
    items: number;
    completed?: number;
  };
  isAvailable: boolean;
} 