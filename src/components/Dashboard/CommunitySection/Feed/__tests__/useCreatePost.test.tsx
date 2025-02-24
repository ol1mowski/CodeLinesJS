import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCreatePost } from '../hooks/useCreatePost.hook';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn().mockReturnValue({
    mutate: vi.fn(),
    isPending: false
  }),
  useQueryClient: vi.fn().mockReturnValue({
    invalidateQueries: vi.fn()
  })
}));

describe('useCreatePost Hook', () => {
  it('handles content change within limits', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter>{children}</MemoryRouter>
    );
    const { result } = renderHook(() => useCreatePost(), { wrapper });

    act(() => {
      result.current.handleContentChange('test content');
    });

    expect(result.current.content).toBe('test content');
    expect(result.current.charCount).toBe(12);
    expect(result.current.isTooShort).toBe(false);
  });

  it('prevents content exceeding max chars', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter>{children}</MemoryRouter>
    );
    const { result } = renderHook(() => useCreatePost(), { wrapper });
    const longContent = 'a'.repeat(501);

    act(() => {
      result.current.handleContentChange(longContent);
    });

    expect(result.current.content.length).toBeLessThanOrEqual(500);
    expect(result.current.isCharLimitExceeded).toBe(false);
  });
}); 