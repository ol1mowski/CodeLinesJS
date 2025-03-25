import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import EditorComponent from './EditorComponent';

vi.mock('react-icons/fa', () => ({
  FaSpinner: () => <div data-testid="editor-spinner" />
}));

vi.mock('@monaco-editor/react', () => ({
  Editor: ({ value, onChange, onMount }: { value: string; onChange: (value: string | undefined) => void; onMount: () => void }) => (
    <div data-testid="monaco-editor" onClick={() => onMount()}>
      <textarea
        data-testid="editor-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}));

describe('EditorComponent', () => {
  const mockProps = {
    code: 'console.log("test")',
    onChange: vi.fn(),
    onMount: vi.fn(),
    isEditorReady: true
  };

  it('should render the Monaco editor', () => {
    render(<EditorComponent {...mockProps} />);

    const editor = screen.getByTestId('monaco-editor');
    expect(editor).toBeInTheDocument();
  });

  it('should pass the code to the editor', () => {
    render(<EditorComponent {...mockProps} />);

    const textarea = screen.getByTestId('editor-textarea');
    expect(textarea).toHaveValue(mockProps.code);
  });

  it('should display the spinner during editor loading', () => {
    render(<EditorComponent {...mockProps} isEditorReady={false} />);

    const spinner = screen.getByTestId('editor-spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('should not display the spinner when the editor is ready', () => {
    render(<EditorComponent {...mockProps} isEditorReady={true} />);

    expect(screen.queryByTestId('editor-spinner')).not.toBeInTheDocument();
  });

  it('should call onMount after the editor is mounted', () => {
    render(<EditorComponent {...mockProps} />);

    screen.getByTestId('monaco-editor').click();
    expect(mockProps.onMount).toHaveBeenCalled();
  });
}); 