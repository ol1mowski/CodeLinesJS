import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardNavigation } from '../DashboardNavigation.component';
import { useNavigation } from '../../../../Hooks/useNavigation';
import { useAuth } from '../../../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../../../../Hooks/useNavigation', () => ({
  useNavigation: vi.fn(),
}));

vi.mock('../../../../Hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

describe('DashboardNavigation', () => {
  const mockNavigate = vi.fn();
  const mockSetIsExpanded = vi.fn();
  const mockSetActiveItem = vi.fn();
  const mockLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useNavigate as any).mockReturnValue(mockNavigate);
    (useNavigation as any).mockReturnValue({
      isExpanded: false,
      setIsExpanded: mockSetIsExpanded,
      activeItem: '',
      setActiveItem: mockSetActiveItem,
    });
    (useAuth as any).mockReturnValue({
      logout: mockLogout,
    });
  });

  it('renderuje się poprawnie', () => {
    render(<DashboardNavigation />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('przełącza stan rozwinięcia', () => {
    render(<DashboardNavigation />);
    const toggleButton = screen.getByRole('button', { name: '→' });
    
    fireEvent.click(toggleButton);
    expect(mockSetIsExpanded).toHaveBeenCalledWith(!false);
  });

  it('obsługuje wylogowanie', () => {
    render(<DashboardNavigation />);
    const logoutButton = screen.getByTestId('nav-button-wyloguj-się');
    
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });

  it('obsługuje wylogowanie w stanie zwiniętym', () => {
    (useNavigation as any).mockReturnValue({
      isExpanded: false,
      setIsExpanded: mockSetIsExpanded,
      activeItem: '',
      setActiveItem: mockSetActiveItem,
    });

    render(<DashboardNavigation />);
    const logoutButton = screen.getByTestId('nav-button-wyloguj-się');
    
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });
}); 