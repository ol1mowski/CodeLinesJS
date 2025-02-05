import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from '../Avatar.component';

describe('Avatar', () => {
  const mockOnChangeAvatar = vi.fn();

  const defaultProps = {
    onChangeAvatar: mockOnChangeAvatar,
    src: 'test-avatar.jpg',
    alt: 'Test Avatar',
    preview: null,
    isUploading: false
  };

  it('powinien wyrenderować avatar', () => {
    render(<Avatar {...defaultProps} />);
    expect(screen.getByRole('img')).toBeDefined();
  });

  it('powinien obsłużyć zmianę pliku', () => {
    render(<Avatar {...defaultProps} />);
    
    const input = screen.getByRole('button');
    
    fireEvent.click(input);
    
    expect(mockOnChangeAvatar).not.toHaveBeenCalled();
  });

  it('powinien wyświetlić stan ładowania', () => {
    render(<Avatar {...defaultProps} isUploading={true} />);
    expect(screen.getByText('...')).toBeDefined();
  });
}); 