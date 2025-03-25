import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CodeEditor } from './CodeEditor.component';

const mockExecuteCode = vi.fn().mockResolvedValue(undefined);
const mockClearConsole = vi.fn();
const mockAddToHistory = vi.fn();

vi.mock('./hooks/useCodeExecution.hook', () => ({
  useCodeExecution: () => ({
    output: ['Output log 1', 'Output log 2'],
    isExecuting: false,
    executeCode: mockExecuteCode,
    clearConsole: mockClearConsole
  })
}));

vi.mock('./hooks/useCodeHistory.hook', () => ({
  useCodeHistory: () => ({
    history: [
      { code: 'console.log("test1")', timestamp: Date.now() - 1000 },
      { code: 'console.log("test2")', timestamp: Date.now() - 2000 }
    ],
    addToHistory: mockAddToHistory,
    clearHistory: vi.fn()
  })
}));

vi.mock('./hooks/useEditor.hook', () => ({
  useEditor: () => ({
    code: 'console.log("test code")',
    isEditorReady: true,
    handleEditorDidMount: vi.fn(),
    handleEditorChange: vi.fn()
  })
}));

vi.mock('./components/EditorComponent', () => ({
  default: ({ code, onChange, onMount }: any) => (
    <div data-testid="editor-component">
      <div data-testid="editor-code">{code}</div>
      <button data-testid="editor-change-btn" onClick={() => onChange('changed code')}>Change</button>
      <button data-testid="editor-mount-btn" onClick={onMount}>Mount</button>
    </div>
  )
}));

describe('CodeEditor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the editor component', () => {
    render(<CodeEditor />);
    
    expect(screen.getByTestId('editor-component')).toBeInTheDocument();
  });

  it('should render the console output', () => {
    render(<CodeEditor />);
    
    const consoleOutput = screen.getByTestId('console-output');
    expect(consoleOutput).toBeInTheDocument();
    expect(consoleOutput.textContent).toContain('Output log 1');
    expect(consoleOutput.textContent).toContain('Output log 2');
  });

  it('should render the action buttons', () => {
    render(<CodeEditor />);
    
    expect(screen.getByTestId('run-code-btn')).toBeInTheDocument();
    expect(screen.getByTestId('clear-console-btn')).toBeInTheDocument();
    expect(screen.getByTestId('save-code-btn')).toBeInTheDocument();
    expect(screen.getByTestId('history-btn')).toBeInTheDocument();
  });

  it('should display the history after clicking the history button', () => {
    render(<CodeEditor />);
    
    const historyBtn = screen.getByTestId('history-btn');
    fireEvent.click(historyBtn);
    
    const historyPanel = screen.getByTestId('history-panel');
    expect(historyPanel).toBeInTheDocument();
    expect(historyPanel.textContent).toContain('console.log("test1")');
    expect(historyPanel.textContent).toContain('console.log("test2")');
  });

  it('should execute the code after clicking the run button', () => {
    render(<CodeEditor />);
    
    const runBtn = screen.getByTestId('run-code-btn');
    fireEvent.click(runBtn);
    
    expect(mockExecuteCode).toHaveBeenCalledWith('console.log("test code")');
  });

  it('should clear the console after clicking the clear button', () => {
    render(<CodeEditor />);
    
    const clearBtn = screen.getByTestId('clear-console-btn');
    fireEvent.click(clearBtn);
    
    expect(mockClearConsole).toHaveBeenCalled();
  });

  it('should add the code to history after clicking the save button', () => {
    render(<CodeEditor />);
    
    const saveBtn = screen.getByTestId('save-code-btn');
    fireEvent.click(saveBtn);
    
    expect(mockAddToHistory).toHaveBeenCalledWith('console.log("test code")');
  });
}); 