import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthWelcomeContent } from './AuthWelcomeContent.component';

vi.mock('../FeaturesList/FeaturesList.component', () => ({
  FeaturesList: () => <div data-testid="features-list">Lista funkcji</div>,
}));

describe('AuthWelcomeContent', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders heading with JavaScript highlight', () => {
    const { container } = render(<AuthWelcomeContent />);

    const headings = container.querySelectorAll('h1');
    expect(headings.length).toBeGreaterThan(0);

    const heading = headings[0];
    expect(heading.textContent).toBe('Odkryj JavaScript w nowy sposób');

    const jsHighlight = heading.querySelector('span');
    expect(jsHighlight).not.toBeNull();
    expect(jsHighlight?.classList.contains('text-[#f7df1e]')).toBe(true);
  });

  it('renders introduction paragraph', () => {
    const { container } = render(<AuthWelcomeContent />);

    const paragraph = container.querySelector('p');
    expect(paragraph).not.toBeNull();
    expect(paragraph?.textContent).toContain('Ucz się, programuj i baw się jednocześnie');
    expect(paragraph?.classList.contains('text-gray-300')).toBe(true);
  });

  it('renders FeaturesList component', () => {
    const { container } = render(<AuthWelcomeContent />);

    const featuresList = container.querySelector('[data-testid="features-list"]');
    expect(featuresList).not.toBeNull();
    expect(featuresList?.textContent).toBe('Lista funkcji');
  });
});
