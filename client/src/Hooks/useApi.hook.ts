import { useState, useCallback } from 'react';
import { httpClient, ApiResponse, HttpRequestOptions } from '../api/httpClient.api';

export type ApiState<T> = {
  data: T | null;
  error: string | null;
  loading: boolean;
  status: number;
};

export type UseApiOptions = {
  onSuccess?: (data: any) => void;
  onError?: (error: string, status: number) => void;
  initialLoading?: boolean;
};

export const useApi = <T = any>(options: UseApiOptions = {}) => {
  const { onSuccess, onError, initialLoading = false } = options;

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    loading: initialLoading,
    status: 0,
  });

  const handleResponse = useCallback(
    <R>(response: ApiResponse<R>) => {
      setState(prev => ({
        ...prev,
        data: response.data as unknown as T | null,
        error: response.error,
        loading: false,
        status: response.status,
      }));

      if (response.data && onSuccess) {
        onSuccess(response.data);
      }

      if (response.error && onError) {
        onError(response.error, response.status);
      }

      return response;
    },
    [onSuccess, onError]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      loading: false,
      status: 0,
    });
  }, []);

  const request = useCallback(
    async <R = T>(endpoint: string, options?: HttpRequestOptions): Promise<ApiResponse<R>> => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response = await httpClient.request<R>(endpoint, options);
        return handleResponse(response);
      } catch (e) {
        const errorResponse: ApiResponse<R> = {
          data: null,
          error: e instanceof Error ? e.message : 'Nieznany błąd zapytania',
          status: 0,
        };

        return handleResponse(errorResponse);
      }
    },
    [handleResponse]
  );

  const get = useCallback(
    <R = T>(
      endpoint: string,
      options?: Omit<HttpRequestOptions, 'method' | 'body'>
    ): Promise<ApiResponse<R>> => {
      return request<R>(endpoint, { ...options, method: 'GET' });
    },
    [request]
  );

  const post = useCallback(
    <R = T>(
      endpoint: string,
      body: any,
      options?: Omit<HttpRequestOptions, 'method' | 'body'>
    ): Promise<ApiResponse<R>> => {
      return request<R>(endpoint, { ...options, method: 'POST', body });
    },
    [request]
  );

  const put = useCallback(
    <R = T>(
      endpoint: string,
      body: any,
      options?: Omit<HttpRequestOptions, 'method' | 'body'>
    ): Promise<ApiResponse<R>> => {
      return request<R>(endpoint, { ...options, method: 'PUT', body });
    },
    [request]
  );

  const del = useCallback(
    <R = T>(
      endpoint: string,
      options?: Omit<HttpRequestOptions, 'method'>
    ): Promise<ApiResponse<R>> => {
      return request<R>(endpoint, { ...options, method: 'DELETE' });
    },
    [request]
  );

  const patch = useCallback(
    <R = T>(
      endpoint: string,
      body: any,
      options?: Omit<HttpRequestOptions, 'method' | 'body'>
    ): Promise<ApiResponse<R>> => {
      return request<R>(endpoint, { ...options, method: 'PATCH', body });
    },
    [request]
  );

  return {
    ...state,
    request,
    get,
    post,
    put,
    delete: del,
    patch,
    reset,
  };
};
