import { httpClient, ApiResponse } from "../../../../../../../../../api/httpClient.api";

export interface IPracticeTask {
  _id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  estimatedTime: number;
  taskContent: string;
  solution?: string;
  tips: string[];
  tags: string[];
  completions: {
    count: number;
    users: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface PracticeTaskStats {
  totalTasks: number;
  tasksByDifficulty: {
    easy: number;
    medium: number;
    hard: number;
  };
  tasksByCategory: Array<{
    category: string;
    count: number;
  }>;
  popularTags: Array<{
    tag: string;
    count: number;
  }>;
}

export const getPracticeTasks = async (limit: number = 50): Promise<ApiResponse<IPracticeTask[]>> => {
  try {
    const response = await httpClient.get<{
      success: boolean;
      data: IPracticeTask[];
      count: number;
    }>(`practice-tasks?limit=${limit}`);
    
    if (response.error) {
      return {
        data: null,
        error: response.error,
        status: response.status
      };
    }

    if (response.data) {
      if (response.data.success && response.data.data) {
        return {
          data: response.data.data,
          error: null,
          status: response.status
        };
      }

      if (Array.isArray(response.data)) {
        return {
          data: response.data,
          error: null,
          status: response.status
        };
      }
    }

    return {
      data: null,
      error: 'Nieprawidłowa struktura odpowiedzi z serwera',
      status: response.status
    };
  } catch (error) {
    return {
      data: null,
      error: 'Błąd połączenia z serwerem',
      status: 0
    };
  }
};

export const getPracticeTaskById = async (taskId: string): Promise<ApiResponse<IPracticeTask>> => {
  try {
    const response = await httpClient.get<{
      success: boolean;
      data: IPracticeTask;
    }>(`practice-tasks/${taskId}`);
    
    if (response.error) {
      return {
        data: null,
        error: response.error,
        status: response.status
      };
    }

    if (response.data) {
      if (response.data.success && response.data.data) {
        return {
          data: response.data.data,
          error: null,
          status: response.status
        };
      }

      if ('_id' in response.data && 'title' in response.data) {
        return {
          data: response.data as unknown as IPracticeTask,
          error: null,
          status: response.status
        };
      }
    }

    return {
      data: null,
      error: 'Zadanie nie zostało znalezione',
      status: 404
    };
  } catch (error) {
    return {
      data: null,
      error: 'Błąd podczas pobierania zadania',
      status: 0
    };
  }
};

export const getPracticeTaskSolution = async (taskId: string): Promise<ApiResponse<{ solution: string }>> => {
  try {
    const response = await httpClient.get<{
      success: boolean;
      data: { solution: string };
    }>(`practice-tasks/${taskId}/solution`);
    
    if (response.error) {
      return {
        data: null,
        error: response.error,
        status: response.status
      };
    }

    if (response.data) {
      if (response.data.success && response.data.data) {
        return {
          data: response.data.data,
          error: null,
          status: response.status
        };
      }

      if ('solution' in response.data) {
        return {
          data: response.data as { solution: string },
          error: null,
          status: response.status
        };
      }
    }

    return {
      data: null,
      error: 'Rozwiązanie nie zostało znalezione',
      status: 404
    };
  } catch (error) {
    return {
      data: null,
      error: 'Błąd podczas pobierania rozwiązania',
      status: 0
    };
  }
};

export const getPracticeCategories = async (): Promise<ApiResponse<string[]>> => {
  try {
    const response = await httpClient.get<{
      success: boolean;
      data: string[];
      count: number;
    }>('practice-tasks/categories');
    
    if (response.error) {
      return {
        data: null,
        error: response.error,
        status: response.status
      };
    }

    if (response.data) {
      if (response.data.success && response.data.data) {
        return {
          data: ['Wszystkie', ...response.data.data],
          error: null,
          status: response.status
        };
      }

      if (Array.isArray(response.data)) {
        return {
          data: ['Wszystkie', ...response.data],
          error: null,
          status: response.status
        };
      }
    }

    return {
      data: ['Wszystkie'],
      error: null,
      status: response.status
    };
  } catch (error) {
    return {
      data: ['Wszystkie'],
      error: null,
      status: 0
    };
  }
};

export const getPracticeStats = async (): Promise<ApiResponse<PracticeTaskStats>> => {
  try {
    const response = await httpClient.get<{
      success: boolean;
      data: PracticeTaskStats;
    }>('practice-tasks/stats');
    
    if (response.error) {
      return {
        data: null,
        error: response.error,
        status: response.status
      };
    }

    if (response.data) {
      if (response.data.success && response.data.data) {
        return {
          data: response.data.data,
          error: null,
          status: response.status
        };
      }

      if ('totalTasks' in response.data && 'tasksByDifficulty' in response.data) {
        return {
          data: response.data as unknown as PracticeTaskStats,
          error: null,
          status: response.status
        };
      }
    }

    return {
      data: null,
      error: 'Błąd podczas pobierania statystyk',
      status: response.status
    };
  } catch (error) {
    return {
      data: null,
      error: 'Błąd podczas pobierania statystyk',
      status: 0
    };
  }
}; 