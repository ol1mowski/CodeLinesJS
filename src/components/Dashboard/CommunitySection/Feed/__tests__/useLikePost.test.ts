import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLikePost } from '../hooks/useLikePost.hook';
import { useQueryClient } from '@tanstack/react-query';

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: vi.fn(),
  useMutation: vi.fn().mockReturnValue({
    mutate: vi.fn(),
    isPending: false
  })
}));

describe('useLikePost Hook', () => {
  const mockPost = {
    _id: '1',
    isLiked: false,
    likes: { count: 0 }
  };

  const mockQueryClient = {
    cancelQueries: vi.fn(),
    getQueryData: vi.fn(),
    setQueryData: vi.fn(),
    invalidateQueries: vi.fn()
  };

  beforeEach(() => {
    (useQueryClient as any).mockReturnValue(mockQueryClient);
  });

  it('handles like toggle correctly', async () => {
    const { result } = renderHook(() => useLikePost(mockPost as any));
    
    await act(async () => {
      result.current.handleLike();
    });

    expect(mockQueryClient.setQueryData).toHaveBeenCalled();
  });

  it('prevents multiple clicks while pending', async () => {
    const mockMutate = vi.fn();
    (useQueryClient as any).mockReturnValue({
      ...mockQueryClient,
      mutate: mockMutate,
      isPending: true
    });

    const { result } = renderHook(() => useLikePost(mockPost as any));
    
    await act(async () => {
      result.current.handleLike();
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });
}); 