import { httpClient, ApiResponse } from "../../../../../../../api/httpClient.api";

export interface ITheoryQuestion {
  _id: string;
  question: string;
  category: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  tags: string[];
  points: number;
  estimatedTime: number;
  isActive: boolean;
}

export interface CheckAnswerResult {
  isCorrect: boolean;
  correctAnswer: number;
  explanation: string;
  points: number;
}

  export const getTheoryQuestions = async (limit: number = 10): Promise<{
  data: ITheoryQuestion[] | null;
  error: string | null;
  status: number;
}> => {
  try {
    const response = await httpClient.get<{
      success: boolean;
      data: ITheoryQuestion[];
      count: number;
    }>(`theory-questions?limit=${limit}`);
    
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

export const checkTheoryAnswer = async (
  questionId: string, 
  answer: number
): Promise<ApiResponse<CheckAnswerResult>> => {
  try { 
    const response = await httpClient.post<{
      success: boolean;
      data: CheckAnswerResult;
    }>(
      `theory-questions/${questionId}/check`,
      { answer },
      { requiresAuth: true }
    );

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
      
      if ('isCorrect' in response.data && 'correctAnswer' in response.data && 
          'explanation' in response.data && 'points' in response.data) {
        return {
          data: response.data as unknown as CheckAnswerResult,
          error: null,
          status: response.status
        };
      }
    }

    return {
      data: null,
      error: 'Nieprawidłowa struktura odpowiedzi przy sprawdzaniu',
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