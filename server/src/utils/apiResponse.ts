import { Response } from 'express';

export interface ApiError {
  code?: string;
  field?: string;
  message: string;
  details?: any;
}

export interface ApiResponseMeta {
  timestamp: string;
  requestId?: string;
  page?: number;
  limit?: number;
  totalPages?: number;
  totalItems?: number;
  [key: string]: any;
}

export interface ApiResponse<T> {
  status: 'success' | 'error' | 'fail';
  code: number;
  message: string;
  data?: T;
  errors?: ApiError[];
  meta: ApiResponseMeta;
}

export class ApiResponseBuilder<T = any> {
  private response: Partial<ApiResponse<T>> = {
    meta: { timestamp: new Date().toISOString() },
  };

  private userData: any = null;
  private progressData: any = null;
  private achievementsData: any = null;
  private statsData: any = null;
  private learningData: any = null;

  public status(status: 'success' | 'error' | 'fail'): ApiResponseBuilder<T> {
    this.response.status = status;
    return this;
  }

  public code(code: number): ApiResponseBuilder<T> {
    this.response.code = code;
    return this;
  }

  public message(message: string): ApiResponseBuilder<T> {
    this.response.message = message;
    return this;
  }

  public data(data: T): ApiResponseBuilder<T> {
    if (data && typeof data === 'object') {
      if ('username' in data || 'lastActive' in data) {
        this.userData = {
          ...this.userData,
          ...this.extractUserData(data),
        };
      }

      if (
        'level' in data ||
        'points' in data ||
        'xp' in data ||
        'experiencePoints' in data ||
        'pointsToNextLevel' in data ||
        'levelProgress' in data ||
        'nextLevelThreshold' in data
      ) {
        this.progressData = {
          ...this.progressData,
          ...this.extractProgressData(data),
        };
      }

      if (
        'streak' in data ||
        'bestStreak' in data ||
        'currentStreak' in data ||
        'completedChallenges' in data ||
        'averageScore' in data ||
        'totalTimeSpent' in data ||
        'badges' in data ||
        'unlockedFeatures' in data
      ) {
        this.achievementsData = {
          ...this.achievementsData,
          ...this.extractAchievementsData(data),
        };
      }

      if ('chartData' in data || 'daily' in data) {
        this.statsData = {
          ...this.statsData,
          ...this.extractStatsData(data),
        };
      }

      if ('learningPaths' in data || ('summary' in data && 'totalPaths' in (data as any).summary)) {
        this.learningData = {
          ...this.learningData,
          ...this.extractLearningData(data),
        };
      }

      if (
        !this.userData &&
        !this.progressData &&
        !this.achievementsData &&
        !this.statsData &&
        !this.learningData
      ) {
        this.response.data = data;
      }
    } else {
      this.response.data = data;
    }

    return this;
  }

  private extractUserData(data: any): any {
    const userData: any = {};

    if ('username' in data) userData.username = data.username;
    if ('lastActive' in data) userData.lastActive = data.lastActive;

    return userData;
  }

  private extractProgressData(data: any): any {
    const progressData: any = {};

    if ('level' in data) progressData.level = data.level;
    if ('points' in data) progressData.points = data.points;
    if ('xp' in data || 'experiencePoints' in data)
      progressData.experience = data.xp || data.experiencePoints;
    if ('pointsToNextLevel' in data) progressData.pointsToNextLevel = data.pointsToNextLevel;
    if ('levelProgress' in data) progressData.levelProgress = data.levelProgress;
    if ('nextLevelThreshold' in data) progressData.nextLevelThreshold = data.nextLevelThreshold;

    return progressData;
  }

  private extractAchievementsData(data: any): any {
    const achievementsData: any = {};

    if ('streak' in data || 'currentStreak' in data) {
      achievementsData.streak = {
        current: data.currentStreak || data.streak,
        best: data.bestStreak || data.streak,
      };
    } else if ('bestStreak' in data) {
      achievementsData.streak = {
        best: data.bestStreak,
      };
    }

    if ('completedChallenges' in data)
      achievementsData.completedChallenges = data.completedChallenges;
    if ('averageScore' in data) achievementsData.averageScore = data.averageScore;
    if ('totalTimeSpent' in data) achievementsData.totalTimeSpent = data.totalTimeSpent;

    if ('badges' in data && Array.isArray(data.badges)) {
      achievementsData.badges = data.badges.map((badge: any) => ({
        id: badge._id || badge.id,
        name: badge.name,
        icon: badge.icon,
        description: badge.description,
        earnedAt: badge.earnedAt,
      }));
    }

    if ('unlockedFeatures' in data) achievementsData.unlockedFeatures = data.unlockedFeatures;

    return achievementsData;
  }

  private extractStatsData(data: any): any {
    const statsData: any = {};

    if ('chartData' in data) {
      if ('daily' in data.chartData) statsData.daily = data.chartData.daily;
      if ('progress' in data.chartData) statsData.progress = data.chartData.progress;
    } else {
      if ('daily' in data) statsData.daily = data.daily;
      if ('progress' in data && !('completed' in data.progress)) statsData.progress = data.progress;
    }

    return statsData;
  }

  private extractLearningData(data: any): any {
    const learningData: any = {};

    if ('learningPaths' in data) {
      learningData.paths = data.learningPaths.map((path: any) => ({
        id: path.pathId || path.id,
        title: path.title,
        progress: path.progress,
      }));
    }

    if ('summary' in data && 'totalPaths' in data.summary) {
      learningData.summary = data.summary;
    }

    return learningData;
  }

  public errors(errors: ApiError[]): ApiResponseBuilder<T> {
    this.response.errors = errors;
    return this;
  }

  public meta(meta: Partial<ApiResponseMeta>): ApiResponseBuilder<T> {
    this.response.meta = { ...this.response.meta, ...meta };
    return this;
  }

  public build(): ApiResponse<T> {
    const combinedData: any = {};

    if (this.userData) {
      combinedData.user = this.userData;
    }

    if (this.progressData) {
      combinedData.progress = this.progressData;
    }

    if (this.achievementsData) {
      combinedData.achievements = this.achievementsData;
    }

    if (this.statsData) {
      combinedData.stats = this.statsData;
    }

    if (this.learningData) {
      combinedData.learning = this.learningData;
    }

    let responseData = this.response.data;
    if (
      this.userData ||
      this.progressData ||
      this.achievementsData ||
      this.statsData ||
      this.learningData
    ) {
      responseData = combinedData;
    }

    const fullResponse = {
      status: this.response.status || 'success',
      code: this.response.code || 200,
      message: this.response.message || '',
      ...(responseData !== undefined && { data: responseData }),
      ...(this.response.errors && { errors: this.response.errors }),
      meta: this.response.meta || { timestamp: new Date().toISOString() },
    } as ApiResponse<T>;

    return fullResponse;
  }
}

export const sendSuccess = <T>(
  res: Response,
  data?: T,
  message = 'Success',
  statusCode = 200,
): Response => {
  const response = new ApiResponseBuilder<T>()
    .status('success')
    .code(statusCode)
    .message(message)
    .meta({ timestamp: new Date().toISOString() });

  if (data !== undefined) {
    response.data(data);
  }

  return res.status(statusCode).json(response.build());
};

export const sendError = (
  res: Response,
  message = 'Internal Server Error',
  statusCode = 500,
  errors?: ApiError[],
): Response => {
  const response = new ApiResponseBuilder<null>()
    .status('error')
    .code(statusCode)
    .message(message)
    .meta({ timestamp: new Date().toISOString() });

  if (errors && errors.length > 0) {
    response.errors(errors);
  }

  return res.status(statusCode).json(response.build());
};

export const sendFail = (
  res: Response,
  message = 'Bad Request',
  errors?: ApiError[],
  statusCode = 400,
): Response => {
  const response = new ApiResponseBuilder<null>()
    .status('fail')
    .code(statusCode)
    .message(message)
    .meta({ timestamp: new Date().toISOString() });

  if (errors && errors.length > 0) {
    response.errors(errors);
  }

  return res.status(statusCode).json(response.build());
};

export const sendPaginated = <T>(
  res: Response,
  data: T,
  page = 1,
  limit = 10,
  total: number,
  message = 'Data retrieved successfully',
): Response => {
  const totalPages = Math.ceil(total / limit);

  const response = new ApiResponseBuilder<T>()
    .status('success')
    .code(200)
    .message(message)
    .data(data)
    .meta({
      timestamp: new Date().toISOString(),
      page,
      limit,
      totalPages,
      totalItems: total,
    });

  return res.status(200).json(response.build());
};

export const requestIdMiddleware = (req: any, res: any, next: any) => {
  req.requestId =
    req.headers['x-request-id'] || `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  res.setHeader('X-Request-ID', req.requestId);

  next();
};
