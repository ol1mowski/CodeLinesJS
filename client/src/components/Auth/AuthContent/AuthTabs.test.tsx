import { render, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthTabs } from './AuthTabs.component';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('AuthTabs', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders all tabs correctly', () => {
    const mockOnTabChange = vi.fn();
    
    const { container } = render(
      <AuthTabs 
        activeTab="login" 
        onTabChange={mockOnTabChange} 
      />
    );
    
    const tabsContainer = container.firstChild as HTMLElement;
    
    expect(tabsContainer.textContent).toContain('Logowanie');
    expect(tabsContainer.textContent).toContain('Rejestracja');
    expect(tabsContainer.textContent).toContain('Reset hasła');
  });

  it('highlights the active tab correctly', () => {
    const mockOnTabChange = vi.fn();
    
    const { container } = render(
      <AuthTabs 
        activeTab="register" 
        onTabChange={mockOnTabChange} 
      />
    );
    
    const buttons = container.querySelectorAll('button');
    const loginButton = Array.from(buttons).find(b => b.textContent?.includes('Logowanie'));
    const registerButton = Array.from(buttons).find(b => b.textContent?.includes('Rejestracja'));
    const forgotButton = Array.from(buttons).find(b => b.textContent?.includes('Reset hasła'));
    
    expect(loginButton?.classList.contains('bg-js/20')).toBe(false);
    expect(registerButton?.classList.contains('bg-js/20')).toBe(true);
    expect(forgotButton?.classList.contains('bg-js/20')).toBe(false);
  });

  it('calls onTabChange with correct value when tab is clicked', () => {
    const mockOnTabChange = vi.fn();
    
    const { container } = render(
      <AuthTabs 
        activeTab="login" 
        onTabChange={mockOnTabChange} 
      />
    );
    
    const buttons = container.querySelectorAll('button');
    const registerButton = Array.from(buttons).find(b => b.textContent?.includes('Rejestracja'));
    const forgotButton = Array.from(buttons).find(b => b.textContent?.includes('Reset hasła'));
    const loginButton = Array.from(buttons).find(b => b.textContent?.includes('Logowanie'));
    
    if (registerButton) fireEvent.click(registerButton);
    expect(mockOnTabChange).toHaveBeenCalledWith('register');
    
    if (forgotButton) fireEvent.click(forgotButton);
    expect(mockOnTabChange).toHaveBeenCalledWith('forgot');
    
    if (loginButton) fireEvent.click(loginButton);
    expect(mockOnTabChange).toHaveBeenCalledWith('login');
  });
}); 