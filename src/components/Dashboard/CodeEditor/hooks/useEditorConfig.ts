import { useCallback } from 'react';
import { editor } from 'monaco-editor';
import prettier from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import { jsSnippets } from '../constants/snippets';

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
    quickSuggestions: {
      other: true,
      comments: true,
      strings: true,
    },
    tabSize: 2,
    wordWrap: 'on',
    folding: true,
    contextmenu: true,
    mouseWheelZoom: true,
    theme: 'vs-dark',
    snippetSuggestions: 'top',
    suggest: {
      snippetsPreventQuickSuggestions: false,
    },
  };

  const setupEditor = useCallback((monaco: any) => {
    monaco.languages.registerCompletionItemProvider('javascript', {
      provideCompletionItems: () => ({
        suggestions: jsSnippets.map(snippet => ({
          ...snippet,
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        })),
      }),
    });
  }, []);

  return {
    formatCode,
    editorOptions,
    setupEditor,
  };
}; 