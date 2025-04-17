import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthFormSection } from './AuthFormSection.component';

vi.mock('../../AuthContent/AuthContent.component', () => ({
  AuthContent: () => <div data-testid="auth-content">Auth Content</div>,
}));

describe('AuthFormSection', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders AuthContent when no children provided', () => {
    render(
      <MemoryRouter>
        <AuthFormSection />
      </MemoryRouter>
    );

    expect(screen.getByTestId('auth-content')).not.toBeNull();
    expect(screen.queryByText('CodeLinesJS')).toBeNull();
  });

  it('renders custom content when children are provided', () => {
    const childContent = 'Test Child Content';

    render(
      <MemoryRouter>
        <AuthFormSection>
          <div>{childContent}</div>
        </AuthFormSection>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('auth-content')).toBeNull();
    expect(screen.getByText('CodeLinesJS')).not.toBeNull();
    expect(screen.getByText(childContent)).not.toBeNull();
  });

  it('renders with title and subtitle', () => {
    const title = 'Test Title';
    const subtitle = 'Test Subtitle';

    render(
      <MemoryRouter>
        <AuthFormSection title={title} subtitle={subtitle}>
          <div>Test content</div>
        </AuthFormSection>
      </MemoryRouter>
    );

    expect(screen.getByText(title)).not.toBeNull();
    expect(screen.getByText(subtitle)).not.toBeNull();
  });

  it('applies correct styling to the container', () => {
    const { container } = render(
      <MemoryRouter>
        <AuthFormSection>
          <div>Test content</div>
        </AuthFormSection>
      </MemoryRouter>
    );

    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv.classList.contains('w-full')).toBe(true);
    expect(mainDiv.classList.contains('md:w-2/5')).toBe(true);

    const bgDiv = container.querySelector('.blur-3xl');
    expect(bgDiv).not.toBeNull();
  });
});
