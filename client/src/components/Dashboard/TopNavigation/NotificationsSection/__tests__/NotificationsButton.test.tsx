import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationsButton } from '../NotificationsButton.component';
import { useDashboardData } from '../../../DashboardContent/hooks/useDashboardData';

vi.mock('../../../DashboardContent/hooks/useDashboardData', () => ({
  useDashboardData: vi.fn()
}));

vi.mock('../NotificationsDropdown.component', () => ({
  NotificationsDropdown: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="notifications-dropdown" onClick={onClose}>Dropdown</div>
  )
}));

describe('NotificationsButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays the badge with the number of unread notifications', () => {
    (useDashboardData as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { unreadCount: 5 },
      isLoading: false
    });

    render(<NotificationsButton />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('displays "9+" when there are more than 9 unread notifications', () => {
    (useDashboardData as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { unreadCount: 10 },
      isLoading: false
    });

    render(<NotificationsButton />);
    expect(screen.getByText('9+')).toBeInTheDocument();
  });

  it('does not display the badge when there are no unread notifications', () => {
    (useDashboardData as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { unreadCount: 0 },
      isLoading: false
    });

    render(<NotificationsButton />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('opens and closes the dropdown on click', async () => {
    (useDashboardData as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { unreadCount: 0 },
      isLoading: false
    });

    render(<NotificationsButton />);
    
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(await screen.findByTestId('notifications-dropdown')).toBeInTheDocument();
    
    fireEvent.click(button);
    expect(screen.queryByTestId('notifications-dropdown')).not.toBeInTheDocument();
  });
});
