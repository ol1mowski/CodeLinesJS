import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoginForm from './LoginForm/LoginForm.component';


describe('LoginForm', () => {
  it('validates required fields', async () => {
    render(<LoginForm />);
    
    const submitButton = screen.getByRole('button', { name: /zaloguj/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email jest wymagany')).toBeInTheDocument();
      expect(screen.getByText('Hasło jest wymagane')).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const submitButton = screen.getByRole('button', { name: /zaloguj/i });
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorMessage = screen.getByText('Nieprawidłowy format email');
      expect(errorMessage).toBeInTheDocument();
    });
  });
}); 
