import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useEditor } from './useEditor.hook';
import { loader } from '@monaco-editor/react';

vi.mock('@monaco-editor/react', () => ({
  loader: {
    init: vi.fn().mockResolvedValue({
      languages: {
        typescript: {
          javascriptDefaults: {
            setDiagnosticsOptions: vi.fn()
          }
        }
      }
    }),
    config: vi.fn()
  }
}));

describe('useEditor', () => {
  let mockEditor: any;
  
  beforeEach(() => {
    mockEditor = {
      onDidChangeModelContent: vi.fn().mockImplementation(callback => {
        mockEditor.contentChangeCallback = callback;
        return { dispose: vi.fn() };
      }),
      getValue: vi.fn().mockReturnValue('console.log("test")'),
      layout: vi.fn()
    };
    
    vi.clearAllMocks();
  });

  it('should initialize with empty code and not ready status', () => {
    const { result } = renderHook(() => useEditor(''));
    
    expect(result.current.code).toBe('');
    expect(result.current.isEditorReady).toBe(false);
  });

  it('should initialize with default code', () => {
    const defaultCode = 'console.log("default");';
    const { result } = renderHook(() => useEditor(defaultCode));
    
    expect(result.current.code).toBe(defaultCode);
  });

    it('should update editorRef and isEditorReady when handleEditorDidMount is called', () => {
    const { result } = renderHook(() => useEditor(''));
    
    act(() => {
      result.current.handleEditorDidMount(mockEditor);
    });
    
    expect(result.current.isEditorReady).toBe(true);
  });

  it('should update code when handleEditorChange is called', () => {
    const { result } = renderHook(() => useEditor(''));
    const newCode = 'const x = 10;';
    
    act(() => {
      result.current.handleEditorChange(newCode);
    });
    
    expect(result.current.code).toBe(newCode);
  });

  it('should keep code when handleEditorChange is called with undefined', () => {
    const initialCode = 'const x = 5;';
    const { result } = renderHook(() => useEditor(initialCode));
    
    expect(result.current.code).toBe(initialCode);
    
    act(() => {
      result.current.handleEditorChange(undefined);
    });
    
    expect(result.current.code).toBe(initialCode);
  });

  it('should configure TypeScript diagnostics after mounting', () => {
    renderHook(() => useEditor(''));
    
    expect(loader.init).toHaveBeenCalled();
  });
}); 