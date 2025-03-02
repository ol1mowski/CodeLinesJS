import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TopNavigation } from '../TopNavigation.component';
import { useUserProfile } from '../hooks/useUserProfile';

vi.mock('../hooks/useUserProfile', () => ({
  useUserProfile: vi.fn()
}));

vi.mock('../WelcomeSection/WelcomeSection.component', () => ({
  WelcomeSection: ({ username }: { username: string }) => <div data-testid="welcome">{username}</div>
}));

vi.mock('../NotificationsSection/NotificationsButton.component', () => ({
  NotificationsButton: () => <div data-testid="notifications-button" />
}));

describe('TopNavigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays the loading state', () => {
    (useUserProfile as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false
    });

    render(<TopNavigation />);
    expect(screen.getByText('Ładowanie...')).toBeInTheDocument();
  });

  it('displays the default username when there is no data', () => {
    (useUserProfile as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      isError: false
    });

    render(<TopNavigation />);
    expect(screen.getByText('Użytkowniku')).toBeInTheDocument();
  });

  it('displays the username when the data is available', () => {
    (useUserProfile as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { username: 'TestUser' },
      isLoading: false,
      error: null,
      isError: false
    });

    render(<TopNavigation />);
    expect(screen.getByText('TestUser')).toBeInTheDocument();
  });
});
