import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AuthTabs } from './AuthTabs.component';

describe('AuthTabs', () => {
  it('renders all tabs correctly', () => {
    const mockOnTabChange = vi.fn();
    
    render(
      <AuthTabs 
        activeTab="login" 
        onTabChange={mockOnTabChange} 
      />
    );
    
    expect(screen.getByText('Logowanie')).toBeInTheDocument();
    expect(screen.getByText('Rejestracja')).toBeInTheDocument();
    expect(screen.getByText('Reset hasła')).toBeInTheDocument();
  });

  it('highlights the active tab correctly', () => {
    const mockOnTabChange = vi.fn();
    
    render(
      <AuthTabs 
        activeTab="register" 
        onTabChange={mockOnTabChange} 
      />
    );
    
    const loginTab = screen.getByText('Logowanie').closest('button');
    const registerTab = screen.getByText('Rejestracja').closest('button');
    const forgotTab = screen.getByText('Reset hasła').closest('button');
    
    expect(loginTab).not.toHaveClass('bg-js/20');
    expect(registerTab).toHaveClass('bg-js/20');
    expect(forgotTab).not.toHaveClass('bg-js/20');
  });

  it('calls onTabChange with correct value when tab is clicked', () => {
    const mockOnTabChange = vi.fn();
    
    render(
      <AuthTabs 
        activeTab="login" 
        onTabChange={mockOnTabChange} 
      />
    );
    
    fireEvent.click(screen.getByText('Rejestracja'));
    expect(mockOnTabChange).toHaveBeenCalledWith('register');
    
    fireEvent.click(screen.getByText('Reset hasła'));
    expect(mockOnTabChange).toHaveBeenCalledWith('forgot');
    
    fireEvent.click(screen.getByText('Logowanie'));
    expect(mockOnTabChange).toHaveBeenCalledWith('login');
  });
}); 