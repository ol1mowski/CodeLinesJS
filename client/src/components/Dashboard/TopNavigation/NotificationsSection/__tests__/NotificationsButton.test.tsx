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
    expect(screen.getByText('5')).not.toBeNull();
  });

  it('displays "9+" when there are more than 9 unread notifications', () => {
    (useDashboardData as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { unreadCount: 10 },
      isLoading: false
    });

    render(<NotificationsButton />);
    expect(screen.getByText('9+')).not.toBeNull();
  });

  it('does not display the badge when there are no unread notifications', () => {
    (useDashboardData as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { unreadCount: 0 },
      isLoading: false
    });

    render(<NotificationsButton />);
    expect(screen.queryByText('0')).toBeNull();
  });

  it('opens and closes the dropdown on click', async () => {
    (useDashboardData as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { unreadCount: 0 },
      isLoading: false
    });

    const { container } = render(<NotificationsButton />);
    
    const button = container.querySelector('button');
    expect(button).not.toBeNull();
    
    if (button) {
      fireEvent.click(button);
      const dropdown = await screen.findByTestId('notifications-dropdown');
      expect(dropdown).toBeTruthy();
      
      fireEvent.click(button);
      expect(screen.queryByTestId('notifications-dropdown')).toBeNull();
    }
  });
});
