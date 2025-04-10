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
  async request<T = any>(endpoint: string, options: HttpRequestOptions = {}): Promise<ApiResponse<T>> {
    try {
      const {
        method = 'GET',
        headers = {},
        body,
        requiresAuth = false,
      } = options;

      const apiUrl = API_URL.replace('www.', '');
      const url = `${apiUrl}${endpoint}`;

      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...headers,
      };

      if (requiresAuth) {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
          requestHeaders['Authorization'] = `Bearer ${token}`;
        }
      }

      const requestOptions: RequestInit = {
        method,
        headers: requestHeaders,
        mode: 'cors',
      };

      if (body) {
        requestOptions.body = JSON.stringify(body);
      }

      const response = await fetch(url, requestOptions);
      
      let data = null;
      let error = null;
      
      try {
        const text = await response.text();
        if (text) {
          data = JSON.parse(text);
        }
      } catch (e) {
        console.error('Błąd parsowania odpowiedzi:', e);
        error = 'Nieprawidłowa odpowiedź serwera';
      }

      if (!response.ok) {
        error = data?.message || data?.error || `Błąd ${response.status}: ${response.statusText}`;
        data = null;
      }

      return {
        data,
        error,
        status: response.status,
      };
    } catch (e) {
      console.error('Błąd zapytania HTTP:', e);
      
      const errorMessage = e instanceof Error 
        ? getPolishNetworkErrorMessage(e)
        : 'Nieznany błąd zapytania';
      
      return {
        data: null,
        error: errorMessage,
        status: 0,
      };
    }
  },

  async get<T = any>(endpoint: string, options: Omit<HttpRequestOptions, 'method' | 'body'> = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  },

  async post<T = any>(endpoint: string, body: any, options: Omit<HttpRequestOptions, 'method' | 'body'> = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  },

  async put<T = any>(endpoint: string, body: any, options: Omit<HttpRequestOptions, 'method' | 'body'> = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  },

  async delete<T = any>(endpoint: string, options: Omit<HttpRequestOptions, 'method'> = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  },

  async patch<T = any>(endpoint: string, body: any, options: Omit<HttpRequestOptions, 'method' | 'body'> = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'PATCH', body });
  },
}; 