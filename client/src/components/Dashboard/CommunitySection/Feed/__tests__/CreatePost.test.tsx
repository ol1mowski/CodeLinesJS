import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePost } from '../CreatePost.component';
import { useCreatePost } from '../hooks/useCreatePost.hook';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../hooks/useCreatePost.hook', () => ({
  useCreatePost: vi.fn()
}));

describe('CreatePost Component', () => {
  const mockUseCreatePost = {
    content: '',
    charCount: 0,
    isCharLimitExceeded: false,
    isTooShort: true,
    isSubmitting: false,
    handleContentChange: vi.fn(),
    handleSubmit: vi.fn(),
    maxChars: 500
  };

  beforeEach(() => {
    (useCreatePost as any).mockReturnValue(mockUseCreatePost);
  });

  it('renders textarea and character count', () => {
    render(
      <MemoryRouter>
        <CreatePost />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/Co słychać/i)).toBeInTheDocument();
    expect(screen.getByText('0/500 znaków')).toBeInTheDocument();
  });

  it('handles content change', () => {
    render(
      <MemoryRouter>
        <CreatePost />
      </MemoryRouter>
    );
    const textarea = screen.getByPlaceholderText(/Co słychać/i);
    fireEvent.change(textarea, { target: { value: 'test' } });
    expect(mockUseCreatePost.handleContentChange).toHaveBeenCalledWith('test');
  });

  it('disables submit button when content is too short', () => {
    render(
      <MemoryRouter>
        <CreatePost />
      </MemoryRouter>
    );
    const submitButton = screen.getByRole('button', { name: /opublikuj/i });
    expect(submitButton).toHaveClass('disabled:opacity-50');
  });
}); 