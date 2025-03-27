import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AuthPhone } from './AuthPhone.component';

vi.mock('../../../UI/PhonePreview/PhonePreview.component', () => ({
  PhonePreview: ({ title }: { title: string }) => <div data-testid="phone-preview">{title}</div>
}));

describe('AuthPhone', () => {
  it('renders PhonePreview component with correct props', () => {
    render(<AuthPhone />);
    
    const phonePreview = screen.getByTestId('phone-preview');
    expect(phonePreview).toBeInTheDocument();
    expect(phonePreview).toHaveTextContent('CodeLinesJS App');
  });
  
  it('is hidden on mobile devices', () => {
    const { container } = render(<AuthPhone />);
    
    const phoneContainer = container.firstChild;
    expect(phoneContainer).toHaveClass('hidden');
    expect(phoneContainer).toHaveClass('md:block');
  });
}); 