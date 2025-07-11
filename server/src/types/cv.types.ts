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

export interface CVStatsResponse {
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

export interface CVTipResponse {
  id: string;
  title: string;
  description: string;
  category: string;
  importance: string;
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

export interface CVExampleResponse {
  id: string;
  title: string;
  description: string;
  type: string;
  level: string;
  field: string;
  content: string;
  highlightPoints: string[];
  tags: string[];
  viewCount: number;
  copyCount: number;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CVUserProgressUpdate {
  type: 'tip_viewed' | 'example_viewed' | 'example_copied' | 'section_completed';
  itemId: string;
  sectionId?: string;
  timeSpent?: number;
  isHelpful?: boolean;
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
