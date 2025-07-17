import { API_URL } from '../config/api.config';

export type ApiResponse<T = any> = {
  data: T | null;
  error: string | null;
  status: number;
};

export type HttpRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  requiresAuth?: boolean;
};

const getPolishNetworkErrorMessage = (error: Error): string => {
  const errorMessage = error.message.toLowerCase();

  if (errorMessage.includes('failed to fetch')) {
    return 'Nie można połączyć się z serwerem. Sprawdź swoje połączenie internetowe.';
  }

  if (errorMessage.includes('network request failed')) {
    return 'Błąd połączenia sieciowego. Sprawdź swoje połączenie internetowe.';
  }

  if (errorMessage.includes('timeout')) {
    return 'Przekroczono czas oczekiwania na odpowiedź serwera.';
  }

  if (errorMessage.includes('abort')) {
    return 'Żądanie zostało przerwane.';
  }

  if (errorMessage.includes('cors')) {
    return 'Błąd polityki CORS. Brak dostępu do zasobu z tej domeny.';
  }

  return error.message;
};

export const httpClient = {
  async request<T = any>(
    endpoint: string,
    options: HttpRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    try {
      const { method = 'GET', headers = {}, body } = options;

      const apiUrl = API_URL.replace('www.', '');
      const url = `${apiUrl}${endpoint}`;

      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
      };


      const requestOptions: RequestInit = {
        method,
        headers: requestHeaders,
        mode: 'cors',
        credentials: 'include',
      };

      if (body) {
        requestOptions.body = JSON.stringify(body);
      }

      const response = await fetch(url, requestOptions);

      let responseData = null;
      let error = null;

      try {
        const text = await response.text();
        if (text) {
          responseData = JSON.parse(text);
        }
      } catch (e) {
        error = 'Nieprawidłowa odpowiedź serwera';
      }

      if (responseData) {
        if (responseData.status === 'success') {
          return {
            data: responseData.data,
            error: null,
            status: responseData.code || response.status
          };
        } else if (responseData.status === 'fail' || responseData.status === 'error') {
          error = 
            responseData.message || 
            responseData.errors?.[0]?.message || 
            `Błąd: ${responseData.status}`;
          
          return {
            data: null,
            error,
            status: responseData.code || response.status
          };
        }
        else if (responseData.error) {
          return {
            data: null, 
            error: responseData.error,
            status: response.status
          };
        } else if (responseData.token) {
          return {
            data: responseData,
            error: null,
            status: response.status
          };
        }
      }

      if (!response.ok && !error) {
        error = `Błąd ${response.status}: ${response.statusText}`;
        return {
          data: null,
          error,
          status: response.status
        };
      }

      return {
        data: responseData?.data || responseData,
        error,
        status: response.status,
      };
    } catch (e) {
      const errorMessage =
        e instanceof Error ? getPolishNetworkErrorMessage(e) : 'Nieznany błąd zapytania';

      return {
        data: null,
        error: errorMessage,
        status: 0,
      };
    }
  },

  async get<T = any>(
    endpoint: string,
    options: Omit<HttpRequestOptions, 'method' | 'body'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  },

  async post<T = any>(
    endpoint: string,
    body: any,
    options: Omit<HttpRequestOptions, 'method' | 'body'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  },

  async put<T = any>(
    endpoint: string,
    body: any,
    options: Omit<HttpRequestOptions, 'method' | 'body'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  },

  async delete<T = any>(
    endpoint: string,
    options: Omit<HttpRequestOptions, 'method'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  },

  async patch<T = any>(
    endpoint: string,
    body: any,
    options: Omit<HttpRequestOptions, 'method' | 'body'> = {}
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  },
};
