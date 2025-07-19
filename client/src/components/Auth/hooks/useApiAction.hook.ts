import { useCallback } from 'react';
import { httpClient } from '../../../api/httpClient.api';
import { useErrorHandler } from './useErrorHandler.hook';
import { AUTH_ERROR_MESSAGES } from '../constants/messages';

type AuthState = {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setIsAuthenticated?: (isAuthenticated: boolean) => void;
  setUser?: (user: any | null) => void;
};

type ApiActionOptions<TData, TParams> = {
  endpoint: string;
  onSuccess?: (data: TData) => void;
  defaultErrorMessage?: string;
  transformParams?: (params: TParams) => any;
  transformResponse?: (response: any) => TData;
  onError?: (error: string) => void;
};

export const useApiAction = <TData = any, TParams = any>(
  state: AuthState,
  options: ApiActionOptions<TData, TParams>
) => {
  const { setLoading, setError } = state;
  const { handleError } = useErrorHandler({ onError: options.onError });

  const executeAction = useCallback(
    async (params: TParams): Promise<TData> => {
      try {
        setLoading(true);
        setError(null);

        const requestData = options.transformParams?.(params) || params;
        const response = await httpClient.post<TData>(options.endpoint, requestData);

        if (response.error) {
          throw new Error(response.error);
        }

        if (!response.data) {
          throw new Error(options.defaultErrorMessage || AUTH_ERROR_MESSAGES.UNKNOWN_ERROR);
        }

        const transformedData = options.transformResponse?.(response.data) || response.data;
        
        if (options.onSuccess) {
          options.onSuccess(transformedData);
        }

        return transformedData;
      } catch (err) {
        const errorMessage = handleError(err);
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [state, options, setLoading, setError, handleError]
  );

  return executeAction;
}; 