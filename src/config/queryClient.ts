import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minut
      gcTime: 30 * 60 * 1000, // 30 minut (zamiast cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
}); 