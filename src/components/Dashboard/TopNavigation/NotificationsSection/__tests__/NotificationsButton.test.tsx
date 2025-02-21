import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationsButton } from '../NotificationsButton.component';
import { useDashboardData } from '../../DashboardContent/hooks/useDashboardData';

vi.mock('../../DashboardContent/hooks/useDashboardData', () => ({
  useDashboardData: vi.fn()
}));

vi.mock('../NotificationsDropdown.component', () => ({
  NotificationsDropdown: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="notifications-dropdown" onClick={onClose} />
  )
}));

describe('NotificationsButton', () => {
  it('wyświetla badge z liczbą nieprzeczytanych powiadomień', () => {
    vi.mocked(useDashboardData).mockReturnValue({
      data: { unreadCount: 5 },
      isLoading: false
    });

    render(<NotificationsButton />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('wyświetla "9+" gdy jest więcej niż 9 nieprzeczytanych powiadomień', () => {
    vi.mocked(useDashboardData).mockReturnValue({
      data: { unreadCount: 10 },
      isLoading: false
    });

    render(<NotificationsButton />);
    expect(screen.getByText('9+')).toBeInTheDocument();
  });

  it('nie wyświetla badge gdy brak nieprzeczytanych powiadomień', () => {
    vi.mocked(useDashboardData).mockReturnValue({
      data: { unreadCount: 0 },
      isLoading: false
    });

    render(<NotificationsButton />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('otwiera i zamyka dropdown po kliknięciu', () => {
    vi.mocked(useDashboardData).mockReturnValue({
      data: { unreadCount: 0 },
      isLoading: false
    });

    render(<NotificationsButton />);
    
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(screen.getByTestId('notifications-dropdown')).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(screen.queryByTestId('notifications-dropdown')).not.toBeInTheDocument();
  });
}); 