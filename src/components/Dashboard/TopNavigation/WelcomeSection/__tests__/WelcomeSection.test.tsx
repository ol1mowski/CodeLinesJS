import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WelcomeSection } from '../WelcomeSection.component';

describe('WelcomeSection', () => {
  it('wyświetla powitanie z nazwą użytkownika', () => {
    render(<WelcomeSection username="TestUser" />);
    
    expect(screen.getByText('Witaj, TestUser! 👋')).toBeInTheDocument();
    expect(screen.getByText('Miło Cię znów widzieć')).toBeInTheDocument();
  });

  it('zachowuje poprawną strukturę i style', () => {
    const { container } = render(<WelcomeSection username="TestUser" />);
    
    const heading = screen.getByRole('heading');
    expect(heading).toHaveClass('text-js', 'font-bold', 'text-xl');
    
    const paragraph = screen.getByText('Miło Cię znów widzieć');
    expect(paragraph).toHaveClass('text-gray-400', 'text-sm');
  });
}); 