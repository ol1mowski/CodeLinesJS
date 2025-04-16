import { expect, vi, describe, beforeEach, afterEach, it } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProfileForm } from '../ProfileForm.component';
import { useAuth } from '../../../../../../hooks/useAuth';
import { useProfile } from '../../../hooks/useProfile';
import { toast } from 'react-hot-toast';

vi.mock('../../../../../../Hooks/useAuth');
vi.mock('../../../hooks/useProfile');
vi.mock('react-hot-toast', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

describe('ProfileForm', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  const mockProfile = {
    username: 'testuser',
    email: 'test@example.com',
    profile: {
      bio: 'Test bio'
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({
      token: 'test-token',
      isAuthenticated: true,
      isAuthChecking: false,
      resetPassword: vi.fn(),
      user: {
        id: '1',
        _id: '1',
        username: 'testuser',
        email: 'test@example.com'
      },
      loading: false,
      error: null,
      logout: vi.fn(),
      login: vi.fn(),
      forgotPassword: vi.fn(),
      register: vi.fn(),
      loginWithGoogle: vi.fn()
    });
    vi.mocked(useProfile).mockReturnValue({
      profile: mockProfile,
      isLoading: false,
      bio: 'Test bio',
      error: null,
      updateProfile: {
        mutateAsync: vi.fn(),
        isPending: false
      } as any
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  it('should render the form with user data', async () => {
    render(<ProfileForm />, { wrapper });
    
    await waitFor(() => {
      const usernameInput = screen.getByPlaceholderText('Wprowadź nazwę użytkownika');
      const emailInput = screen.getByPlaceholderText('Wprowadź adres email');
      const bioInput = screen.getByPlaceholderText('Test bio');
      
      expect(usernameInput).not.toBeNull();
      expect(emailInput).not.toBeNull();
      expect(bioInput).not.toBeNull();
    });
  });

  it('should display loader during loading', () => {
    vi.mocked(useProfile).mockReturnValue({
      profile: undefined,
      isLoading: true,
      bio: '',
      error: null,
      updateProfile: {
        mutateAsync: vi.fn(),
        isPending: false
      } as any
    });

    render(<ProfileForm />, { wrapper });
    const loader = screen.getByRole('status');
    expect(loader).not.toBeNull();
  });

  it('should handle cancellation of changes', async () => {
    const { container } = render(<ProfileForm />, { wrapper });
    
    await waitFor(() => {
      const cancelButtons = container.querySelectorAll('button[type="button"]');
      
      const cancelButton = Array.from(cancelButtons).find(button => 
        button.textContent?.toLowerCase().includes('anuluj')
      );
      
      expect(cancelButton).not.toBeNull();
      
      if (cancelButton) {
        fireEvent.click(cancelButton);
      }
      
      expect(toast.success).toHaveBeenCalledWith('Zmiany zostały anulowane');
    });
  });

  it('should display loading state during saving', async () => {
    vi.mocked(useProfile).mockReturnValue({
      profile: mockProfile,
      isLoading: false,
      bio: 'Test bio',
      error: null,
      updateProfile: {
        mutateAsync: vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100))),
        isPending: true
      } as any
    });

    render(<ProfileForm />, { wrapper });
    
    const saveButton = screen.getByRole('button', { name: /zapisywanie/i });
    expect(saveButton).not.toBeNull();
    
    expect(saveButton.hasAttribute('disabled')).toBe(true);
  });
}); 