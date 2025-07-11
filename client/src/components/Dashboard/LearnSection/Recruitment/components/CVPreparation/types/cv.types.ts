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
  category: 'content' | 'skills' | 'design' | 'projects';
  importance: 'low' | 'medium' | 'high' | 'critical';
  icon: string;
  examples: {
    good: string[];
    bad: string[];
  };
  tags: string[];
  viewCount: number;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CVExample {
  id: string;
  title: string;
  description: string;
  type: 'full-cv' | 'section' | 'skill-description' | 'project-description';
  level: 'junior' | 'mid' | 'senior';
  field: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'devops';
  content: string;
  highlightPoints: string[];
  tags: string[];
  viewCount: number;
  copyCount: number;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CVStats {
  totalTips: number;
  totalExamples: number;
  userProgress?: {
    tipsViewed: number;
    examplesViewed: number;
    completedSections: number;
    totalSections: number;
    completionPercentage: number;
    lastActivityAt: string;
  };
}

export interface CVTipQuery {
  category?: string;
  importance?: 'low' | 'medium' | 'high' | 'critical';
  search?: string;
  tags?: string[];
  limit?: number;
  page?: number;
  sortBy?: 'createdAt' | 'importance' | 'viewCount' | 'helpfulCount' | 'order';
  sortOrder?: 'asc' | 'desc';
}

export interface CVExampleQuery {
  type?: 'full-cv' | 'section' | 'skill-description' | 'project-description';
  level?: 'junior' | 'mid' | 'senior';
  field?: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'devops';
  search?: string;
  tags?: string[];
  limit?: number;
  page?: number;
  sortBy?: 'createdAt' | 'viewCount' | 'copyCount' | 'helpfulCount' | 'order';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface CVUserProgressUpdate {
  type: 'tip_viewed' | 'example_viewed' | 'example_copied' | 'section_completed';
  itemId: string;
  sectionId?: string;
  timeSpent?: number;
  isHelpful?: boolean;
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

export interface CVPreparationState {
  activeSection: CVSection | null;
  activeView: CVView;
  tips: CVTip[];
  examples: CVExample[];
  stats: CVStats | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedFilters: {
    category?: string;
    importance?: string;
    level?: string;
    field?: string;
    type?: string;
  };
}

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