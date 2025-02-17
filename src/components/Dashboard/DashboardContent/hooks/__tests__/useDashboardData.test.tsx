import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useDashboardData } from '../useDashboardData';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const mockUseAuth = vi.fn();
vi.mock('../../../../../Hooks/useAuth', () => ({
  useAuth: () => mockUseAuth()
}));

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('useDashboardData', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false
        }
      }
    });
    vi.clearAllMocks();
    
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      token: 'test-token',
      user: null,
      loading: false,
      error: null,
      login: vi.fn()
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </BrowserRouter>
  );

  it('fetch dashboard data', async () => {
    const mockData = {
      stats: {
        completedChallenges: 10,
        totalPoints: 500,
        streak: 5,
        lastActive: '2024-01-01T12:00:00Z'
      },
      notifications: [],
      unreadCount: 0
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData)
    });

    const { result } = renderHook(() => useDashboardData(), { wrapper });

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    }, { timeout: 2000 });

    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:5001/api/dashboard',
      expect.objectContaining({
        method: 'GET',
        headers: {
          'Authorization': 'Bearer test-token',
          'Content-Type': 'application/json'
        }
      })
    );
  });

  it('handle authorization error', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401
    });

    const { result } = renderHook(() => useDashboardData(), { wrapper });

    await waitFor(() => {
      expect(result.current.error?.message).toBe('Brak autoryzacji - zaloguj się ponownie');
    });
  });

  it('is disabled when user is not logged in', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      token: null,
      user: null,
      loading: false,
      error: null,
      login: vi.fn()
    });

    const { result } = renderHook(() => useDashboardData(), { wrapper });
    expect(result.current.data).toBeUndefined();
  });
}); 