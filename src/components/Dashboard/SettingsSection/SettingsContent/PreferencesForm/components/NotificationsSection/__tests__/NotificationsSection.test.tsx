import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NotificationsSection } from '../NotificationsSection.component';
import { UseFormRegister } from 'react-hook-form';
import { PreferencesData } from '../../../../../types/settings';

describe('NotificationsSection', () => {
  const mockRegister = vi.fn() as unknown as UseFormRegister<PreferencesData>;
  const mockOnChange = vi.fn();

  const defaultProps = {
    register: mockRegister,
    values: {
      emailNotifications: true,
      pushNotifications: false
    },
    onChange: mockOnChange
  };

  it('powinien wyrenderować wszystkie opcje powiadomień', () => {
    render(<NotificationsSection {...defaultProps} />);

    expect(screen.getByText('Powiadomienia email')).toBeDefined();
    expect(screen.getByText('Powiadomienia push')).toBeDefined();
  });

  it('powinien obsłużyć zmianę powiadomień email', () => {
    render(<NotificationsSection {...defaultProps} />);

    const emailCheckbox = screen.getByRole('checkbox', { name: /email/i });
    fireEvent.click(emailCheckbox);

    expect(mockOnChange).toHaveBeenCalledWith('emailNotifications', false);
  });

  it('powinien obsłużyć zmianę powiadomień push', () => {
    render(<NotificationsSection {...defaultProps} />);

    const pushCheckbox = screen.getByRole('checkbox', { name: /push/i });
    fireEvent.click(pushCheckbox);

    expect(mockOnChange).toHaveBeenCalledWith('pushNotifications', true);
  });
}); 