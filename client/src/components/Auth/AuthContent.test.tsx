import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AuthContent } from './AuthContent/AuthContent.component';

describe('AuthContent', () => {
  it('renders login form by default', () => {
    render(<AuthContent />);
    const loginTab = screen.getByRole('button', { name: /logowanie/i });
    expect(loginTab).toHaveClass('bg-js/20');
  });

  it('switches between forms when tabs are clicked', async () => {
    render(<AuthContent />);
    
    const registerTab = screen.getByRole('button', { name: /rejestracja/i });
    fireEvent.click(registerTab);
    expect(registerTab).toHaveClass('bg-js/20');
    
    const forgotTab = screen.getByRole('button', { name: /reset hasła/i });
    fireEvent.click(forgotTab);
    expect(forgotTab).toHaveClass('bg-js/20');
  });
}); 