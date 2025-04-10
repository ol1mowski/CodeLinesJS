import { renderHook, waitFor } from "@testing-library/react";
import { useStats } from "../useStats.hook";
import { useAuth } from "../../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { beforeEach, describe, expect, vi, it } from "vitest";

vi.mock("../../../../../Hooks/useAuth", () => ({
  useAuth: vi.fn()
}));
vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn()
}));

describe("useStats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should fetch data when user is authenticated", async () => {
    vi.mocked(useAuth).mockReturnValue({
      token: "fake-token",
      isAuthenticated: true,
      isAuthChecking: false,
      user: { id: "1", _id: "1", email: "test@example.com", username: "testuser" },
      loading: false,
      error: null,
      logout: vi.fn(),
      login: vi.fn(),
      resetPassword: vi.fn(),
      forgotPassword: vi.fn(),
      register: vi.fn(),
      loginWithGoogle: vi.fn()
    });
    const mockStats = { total: 100, completed: 50 };
    vi.mocked(useQuery).mockReturnValue({
      data: mockStats,
      isLoading: false,
      error: null,
      isError: false,
      isPending: false,
      isSuccess: true,
      status: 'success',
      dataUpdatedAt: Date.now(),
      errorUpdatedAt: 0,
      failureCount: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isFetched: true,
      isFetchedAfterMount: true,
      isFetching: false,
      isRefetching: false,
      isLoadingError: false,
      isRefetchError: false,
      isInitialLoading: false,
      isPaused: false,
      isPlaceholderData: false,
      isStale: false,
      refetch: vi.fn(),
      remove: vi.fn()
    } as any);

    const { result } = renderHook(() => useStats());

    await waitFor(() => {
      expect(result.current.stats).toEqual(mockStats);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it("Should not fetch data when user is not authenticated", () => {
    vi.mocked(useAuth).mockReturnValue({
      token: null,
      isAuthenticated: false,
      isAuthChecking: false,
      user: null,
      loading: false,
      error: null,
      logout: vi.fn(),
      resetPassword: vi.fn(),
      login: vi.fn(),
      forgotPassword: vi.fn(),
      register: vi.fn(),
      loginWithGoogle: vi.fn()
    });

    vi.mocked(useQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: null,
      isError: false,
      isPending: true,
      isSuccess: false,
      status: 'loading',
      dataUpdatedAt: 0,
      errorUpdatedAt: 0,
      failureCount: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isFetched: false,
      isFetchedAfterMount: false,
      isFetching: true,
      isRefetching: false,
      isLoadingError: false,
      isRefetchError: false
    } as any);

    const { result } = renderHook(() => useStats());

    expect(result.current.stats).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("Should handle authorization error", async () => {
    vi.mocked(useAuth).mockReturnValue({
      resetPassword: vi.fn(),
      token: "fake-token",
      isAuthenticated: true,
      isAuthChecking: false,
      user: { id: "1", _id: "1", email: "test@example.com", username: "testuser" },
      loading: false,
      error: null,
      logout: vi.fn(),
      login: vi.fn(),
      forgotPassword: vi.fn(),
      register: vi.fn(),
      loginWithGoogle: vi.fn()
    });

    const mockError = new Error("Brak autoryzacji");
    vi.mocked(useQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: mockError,
      isError: true,
      isPending: false,
      isSuccess: false,
      status: 'error',
      dataUpdatedAt: 0,
      errorUpdatedAt: Date.now(),
      failureCount: 1,
      failureReason: mockError,
      errorUpdateCount: 1,
      isFetched: true,
      isFetchedAfterMount: true,
      isLoadingError: false,
      isRefetchError: false,
      isFetching: false,
      isInitialLoading: false,
      isPaused: false,
      isPlaceholderData: false,
      isStale: false,
      refetch: vi.fn(),
      remove: vi.fn()
    } as any);

    const { result } = renderHook(() => useStats());

    await waitFor(() => {
      expect(result.current.stats).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toEqual(mockError);
    });
  });

  it("Should retry fetching data on other errors", async () => {
    vi.mocked(useAuth).mockReturnValue({
      token: "fake-token",
      resetPassword: vi.fn(),
      isAuthenticated: true,
      isAuthChecking: false,
      user: { id: "1", _id: "1", email: "test@example.com", username: "testuser" },
      loading: false,
      error: null,
      logout: vi.fn(),
      login: vi.fn(),
      forgotPassword: vi.fn(),
      register: vi.fn(),
      loginWithGoogle: vi.fn()
    });

    const mockError = new Error("Błąd sieci");
    vi.mocked(useQuery).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: mockError,
      isError: true,
      isPending: false,
      isSuccess: false,
      status: 'error',
      dataUpdatedAt: 0,
      errorUpdatedAt: Date.now(),
      failureCount: 1,
      failureReason: mockError,
      errorUpdateCount: 1,
      isFetched: true,
      isFetchedAfterMount: true,
      isLoadingError: false,
      isRefetchError: true,
      isFetching: false,
      isInitialLoading: false,
      isPaused: false,
      isPlaceholderData: false,
      isStale: false,
      refetch: vi.fn(),
      remove: vi.fn()
    } as any);

    const { result } = renderHook(() => useStats());

    await waitFor(() => {
      expect(result.current.stats).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toEqual(mockError);
    });

    expect(useQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        retry: expect.any(Function),
      })
    );
  });
});
    