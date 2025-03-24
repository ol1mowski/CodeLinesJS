import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CommunitySection } from '../CommunitySection.component';

const queryClient = new QueryClient();

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{component}</MemoryRouter>
    </QueryClientProvider>
  );
};

describe('CommunitySection', () => {
  it('renders correctly', () => {
    renderWithProviders(<CommunitySection />);
    expect(screen.getByText('Wkrótce')).toBeInTheDocument();
  });
}); 