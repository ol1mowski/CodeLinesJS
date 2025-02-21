import { describe, it, expect, vi } from 'vitest';
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
  it('wyświetla loading state', () => {
    vi.mocked(useUserProfile).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false
    });

    render(<TopNavigation />);
    expect(screen.getByText('Ładowanie...')).toBeInTheDocument();
  });

  it('wyświetla domyślną nazwę użytkownika gdy brak danych', () => {
    vi.mocked(useUserProfile).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
      isError: false
    });

    render(<TopNavigation />);
    expect(screen.getByText('Użytkowniku')).toBeInTheDocument();
  });

  it('wyświetla nazwę użytkownika gdy dane są dostępne', () => {
    vi.mocked(useUserProfile).mockReturnValue({
      data: { username: 'TestUser' },
      isLoading: false,
      error: null,
      isError: false
    });

    render(<TopNavigation />);
    expect(screen.getByText('TestUser')).toBeInTheDocument();
  });
}); 