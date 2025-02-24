import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Post } from '../Post.component';
import { useLikePost } from '../hooks/useLikePost.hook';

vi.mock('../hooks/useLikePost.hook', () => ({
  useLikePost: vi.fn()
}));

vi.mock('../hooks/useComments.hook', () => ({
  useComments: () => ({
    comments: [],
    isLoading: false,
    register: () => ({}),
    handleAddComment: vi.fn(),
    isSubmitting: false,
    errors: {}
  })
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

const mockPost = {
  _id: '1',
  content: 'Test post content',
  author: {
    _id: '1',
    username: 'testuser'
  },
  createdAt: new Date().toISOString(),
  isLiked: false,
  likes: { count: 0 },
  comments: [],
  commentsCount: 0,
  likesCount: 0
};

describe('Post Component', () => {
  beforeEach(() => {
    (useLikePost as any).mockReturnValue({
      handleLike: vi.fn(),
      isLiking: false
    });
  });

  it('renders post content correctly', () => {
    renderWithProviders(<Post post={mockPost} />);
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
    expect(screen.getByText(mockPost.author.username)).toBeInTheDocument();
  });

  it('handles like interaction', () => {
    const mockHandleLike = vi.fn();
    (useLikePost as any).mockReturnValue({
      handleLike: mockHandleLike,
      isLiking: false
    });

    renderWithProviders(<Post post={mockPost} />);
    const likeButton = screen.getByTestId('like-button');
    fireEvent.click(likeButton);
    expect(mockHandleLike).toHaveBeenCalled();
  });

  it('toggles comments visibility', () => {
    renderWithProviders(<Post post={mockPost} />);
    const commentsButton = screen.getByTestId('comments-button');
    fireEvent.click(commentsButton);
    expect(screen.getByPlaceholderText(/Napisz komentarz/i)).toBeInTheDocument();
  });
}); 