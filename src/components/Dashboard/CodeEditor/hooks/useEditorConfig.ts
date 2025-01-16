import { useCallback } from 'react';
import { editor } from 'monaco-editor';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';

export const useEditorConfig = () => {
  const formatCode = useCallback(async (code: string): Promise<string> => {
    try {
      return await prettier.format(code, {
        parser: 'babel',
        plugins: [parserBabel],
        semi: true,
        singleQuote: true,
      });
    } catch (error) {
      console.error('Błąd formatowania:', error);
      return code;
    }
  }, []);

  const editorOptions: editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: "on",
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    tabSize: 2,
    wordWrap: 'on',
    folding: true,
    contextmenu: true,
    mouseWheelZoom: true,
    theme: 'vs-dark',
  };

  return {
    formatCode,
    editorOptions,
  };
}; 